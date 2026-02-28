const fs = require('fs').promises
const path = require('path')

/**
 * Simple In-Memory Vector Store
 * Stores documents and provides text-based similarity search
 */
class SimpleVectorStore {
  constructor(filePath) {
    this.filePath = filePath
    this.documents = []
    this.collections = {}
  }

  /**
   * Initialize store from file
   */
  async initialize() {
    try {
      const dir = path.dirname(this.filePath)
      await fs.mkdir(dir, { recursive: true })

      if (await this.fileExists(this.filePath)) {
        const data = await fs.readFile(this.filePath, 'utf-8')
        this.documents = JSON.parse(data)
      }
    } catch (error) {
      console.error('Error initializing vector store:', error.message)
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(filePath) {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  /**
   * Save store to file
   */
  async save() {
    try {
      const dir = path.dirname(this.filePath)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(this.filePath, JSON.stringify(this.documents, null, 2))
    } catch (error) {
      console.error('Error saving vector store:', error.message)
    }
  }

  /**
   * Add documents to store
   */
  async add(ids, documents, metadatas) {
    for (let i = 0; i < ids.length; i++) {
      this.documents.push({
        id: ids[i],
        content: documents[i],
        metadata: metadatas[i],
      })
    }
    await this.save()
  }

  /**
   * Query documents by text similarity
   * Uses simple token overlap for relevance scoring
   */
  async query(queryTexts, nResults = 5) {
    const query = queryTexts[0] || ''
    const queryTokens = this.tokenize(query)

    const scored = this.documents.map((doc) => {
      const docTokens = this.tokenize(doc.content)
      const overlap = queryTokens.filter((token) => docTokens.includes(token)).length
      const similarity = overlap / Math.max(queryTokens.length, 1)

      return {
        ...doc,
        similarity,
        distance: 1 - similarity,
      }
    })

    const results = scored
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, nResults)

    return {
      ids: [results.map((r) => r.id)],
      documents: [results.map((r) => r.content)],
      distances: [results.map((r) => r.distance)],
      metadatas: [results.map((r) => r.metadata)],
    }
  }

  /**
   * Simple tokenization
   */
  tokenize(text) {
    return text
      .toLowerCase()
      .split(/\\W+/)
      .filter((token) => token.length > 2)
  }

  /**
   * Get all documents
   */
  async getAll() {
    return this.documents
  }

  /**
   * Delete by ID
   */
  async deleteById(id) {
    this.documents = this.documents.filter((doc) => doc.id !== id)
    await this.save()
  }

  /**
   * Clear all documents
   */
  async clear() {
    this.documents = []
    await this.save()
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      total_documents: this.documents.length,
    }
  }
}

module.exports = SimpleVectorStore
