import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api'

const chatService = {
  /**
   * Send a message to the chatbot
   * @param {string} message - User message
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<Object>} - Response from AI
   */
  sendMessage: async (message, conversationId) => {
    try {
      const payload = {
        message,
        conversationId,
      }

      const response = await axios.post(`${API_URL}/chatbot/send`, payload, {
        timeout: 30000,
      })

      return response.data
    } catch (error) {
      throw {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
        details: error.response?.data,
      }
    }
  },

  /**
   * Send voice input (audio)
   * @param {string} audioBase64 - Base64 encoded audio
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<Object>} - Response with transcription and AI reply
   */
  sendVoiceMessage: async (audioBase64, conversationId) => {
    try {
      const response = await axios.post(
        `${API_URL}/chatbot/voice`,
        {
          audio: audioBase64,
          conversationId,
        },
        { timeout: 30000 }
      )

      return response.data
    } catch (error) {
      throw {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
        details: error.response?.data,
      }
    }
  },

  /**
   * Get conversation history
   * @param {string} conversationId - Conversation ID
   * @returns {Promise<Array>} - Array of messages
   */
  getConversation: async (conversationId) => {
    try {
      const response = await axios.get(
        `${API_URL}/chatbot/conversation/${conversationId}`
      )
      return response.data.messages
    } catch (error) {
      throw {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      }
    }
  },

  /**
   * Create new conversation
   * @returns {Promise<string>} - New conversation ID
   */
  createConversation: async () => {
    try {
      const response = await axios.post(`${API_URL}/chatbot/conversation`)
      return response.data
    } catch (error) {
      throw {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      }
    }
  },
}

export default chatService
