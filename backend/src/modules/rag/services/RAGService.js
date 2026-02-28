const chromaDB = require('./ChromaDBService')
const chromaConfig = require('../config/chromadb')

/**
 * RAG Retrieval Service
 * Retrieves relevant documents from knowledge base for chatbot context
 */

class RAGService {
  /**
   * Search for relevant documents
   * @param {string} query - Search query
   * @param {Number} topK - Number of results to return
   * @returns {Promise<Array>} Array of relevant documents
   */
  static async search(query, topK = chromaConfig.searchSettings.topK) {
    try {
      const collection = chromaDB.getCollection()

      if (!query || query.trim().length === 0) {
        return []
      }

      // Query ChromaDB
      const results = await collection.query({
        query_texts: [query],
        n_results: topK,
      })

      if (!results || results.documents.length === 0) {
        return []
      }

      // Format results
      const documents = results.documents[0] || []
      const distances = results.distances[0] || []
      const metadatas = results.metadatas[0] || []

      return documents.map((doc, index) => ({
        content: doc,
        similarity: 1 - distances[index], // Convert distance to similarity score
        metadata: metadatas[index],
      }))
    } catch (error) {
      console.error('❌ RAG search failed:', error.message)
      return []
    }
  }

  /**
   * Build context from retrieved documents
   * @param {string} query - User query
   * @param {Number} topK - Number of documents to retrieve
   * @returns {Promise<string>} Context string for chatbot
   */
  static async buildContext(query, topK = chromaConfig.searchSettings.topK) {
    try {
      const documents = await this.search(query, topK)

      if (documents.length === 0) {
        return null
      }

      // Filter by similarity threshold
      const relevantDocs = documents.filter(
        doc => doc.similarity >= chromaConfig.searchSettings.similarityThreshold
      )

      if (relevantDocs.length === 0) {
        return null
      }

      // Build context string
      let context = 'Based on the following knowledge base information:\n\n'

      relevantDocs.forEach((doc, index) => {
        context += `[Document ${index + 1} - Confidence: ${(doc.similarity * 100).toFixed(1)}%]\n`
        context += `${doc.content}\n`
        if (doc.metadata.source) {
          context += `(Source: ${doc.metadata.source})\n`
        }
        context += '\n'
      })

      return context
    } catch (error) {
      console.error('❌ Build context failed:', error.message)
      return null
    }
  }

  /**
   * Search by category
   * @param {string} category - Category filter
   * @param {Number} topK - Number of results
   */
  static async searchByCategory(category, topK = chromaConfig.searchSettings.topK) {
    try {
      const collection = chromaDB.getCollection()

      const results = await collection.get({
        where: { category: category },
        limit: topK,
      })

      return (results.documents || []).map((doc, index) => ({
        content: doc,
        metadata: results.metadatas[index],
      }))
    } catch (error) {
      console.error('❌ Category search failed:', error.message)
      return []
    }
  }

  /**
   * Search by tags
   * @param {Array} tags - Array of tags to search
   * @param {Number} topK - Number of results
   */
  static async searchByTags(tags, topK = chromaConfig.searchSettings.topK) {
    try {
      const collection = chromaDB.getCollection()

      const allResults = []

      for (const tag of tags) {
        const results = await collection.get({
          where: { tags: { $contains: tag } },
          limit: topK,
        })

        allResults.push(...(results.documents || []))
      }

      // Remove duplicates
      const uniqueDocs = [...new Set(allResults)]

      return uniqueDocs.slice(0, topK).map(doc => ({
        content: doc,
      }))
    } catch (error) {
      console.error('❌ Tag search failed:', error.message)
      return []
    }
  }

  /**
   * Get document statistics
   */
  static async getStats() {
    try {
      return await chromaDB.getStats()
    } catch (error) {
      console.error('❌ Failed to get stats:', error.message)
      return null
    }
  }

  /**
   * Delete document by source
   * @param {string} source - Document source to delete
   */
  static async deleteDocument(source) {
    try {
      const collection = chromaDB.getCollection()

      const results = await collection.get({
        where: { source: source },
      })

      if (results.ids && results.ids.length > 0) {
        await collection.delete({
          ids: results.ids,
        })

        console.log(`✅ Deleted ${results.ids.length} documents from source: ${source}`)
        return { success: true, deletedCount: results.ids.length }
      }

      return { success: true, deletedCount: 0 }
    } catch (error) {
      console.error('❌ Failed to delete document:', error.message)
      throw error
    }
  }
}

module.exports = RAGService
