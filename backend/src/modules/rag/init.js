const chromaDB = require('./services/ChromaDBService')
const DocumentIngestionService = require('./services/DocumentIngestionService')
const fs = require('fs').promises
const path = require('path')

/**
 * RAG Module Initializer
 * Called on server startup to initialize ChromaDB and load knowledge base
 */

async function initializeRAGModule() {
  try {
    console.log('\n🚀 Initializing RAG Module...')
    
    // Initialize ChromaDB
    await chromaDB.initialize()
    
    // Get stats
    const stats = chromaDB.getStats()
    console.log('📊 Knowledge Base Stats:', stats)
    
    // Load sample data if empty (always load for development)
    if ((stats.total_documents === 0 || stats.total_documents === undefined) && process.env.NODE_ENV !== 'production') {
      console.log('📚 Loading sample elderly care and family knowledge base documents...')
      const result = await DocumentIngestionService.initializeSampleData()
      console.log(`✅ Loaded ${result.chunksAdded} sample document chunks into knowledge base`)
    }
    
    // Load documents from knowledge-base folder if they exist
    const knowledgeBasePath = path.join(process.cwd(), 'data', 'knowledge-base')
    try {
      await fs.access(knowledgeBasePath)
      console.log('📂 Checking knowledge-base directory...')
      const files = await fs.readdir(knowledgeBasePath)
      console.log(`📄 Found ${files.length} files in knowledge-base directory`)
    } catch (err) {
      // Directory doesn't exist yet, which is fine
      console.log('📂 Knowledge-base directory not found (will be created on first use)')
    }
    
    console.log('✅ RAG Module initialized successfully\n')
  } catch (error) {
    console.error('❌ Failed to initialize RAG Module:', error.message)
    process.exit(1)
  }
}

module.exports = initializeRAGModule
