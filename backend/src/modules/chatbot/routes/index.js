const express = require('express')
const ChatbotController = require('../controllers/ChatbotController')

const router = express.Router()

/**
 * POST /api/chatbot/send
 * Send a text message to the chatbot
 */
router.post('/send', ChatbotController.sendMessage)

/**
 * POST /api/chatbot/voice
 * Send a voice message (audio) to the chatbot
 */
router.post('/voice', ChatbotController.sendVoiceMessage)

/**
 * POST /api/chatbot/conversation
 * Create a new conversation
 */
router.post('/conversation', ChatbotController.createConversation)

/**
 * GET /api/chatbot/conversation/:conversationId
 * Get conversation history
 */
router.get('/conversation/:conversationId', ChatbotController.getConversation)

module.exports = router
