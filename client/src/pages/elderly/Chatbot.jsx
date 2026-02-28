import { useState, useEffect, useRef } from 'react'
import {
  FiSend,
} from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import useChatStore from '../../store/chatStore'
import chatService from '../../services/chatService'
import ChatMessage from '../../components/Chatbot/ChatMessage'
import VoiceRecorder from '../../components/Chatbot/VoiceRecorder'

function ChatbotPage() {
  const {
    messages,
    isLoading,
    error,
    conversationId,
    addMessage,
    setLoading,
    setError,
    clearError,
    clearMessages,
    setConversationId,
  } = useChatStore()

  const [inputText, setInputText] = useState('')
  const [useVoice, setUseVoice] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize conversation
  useEffect(() => {
    if (!conversationId) {
      initializeConversation()
    }
  }, [conversationId])

  const initializeConversation = async () => {
    try {
      const response = await chatService.createConversation()
      setConversationId(response.conversationId)
      
      // Welcome message
      if (response.model) {
        addMessage({
          sender: 'bot',
          text: `👋 Hello! I'm MindBridge, your AI companion. I'm here to chat, answer questions, and keep you company. What's on your mind today?`,
          timestamp: new Date(),
        })
      }
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle sending text message
  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return

    const messageText = text.trim()
    setInputText('')

    // Add user message
    addMessage({
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
      status: 'sending',
    })

    setLoading(true)
    clearError()

    try {
      const response = await chatService.sendMessage(messageText, conversationId)

      // Add AI response
      addMessage({
        sender: 'bot',
        text: response.reply,
        timestamp: new Date(),
        model: response.model,
      })

      // Update user message status
      const lastMsg = messages[messages.length - 1]
      if (lastMsg) {
        lastMsg.status = 'sent'
      }
    } catch (err) {
      setError(err.message)
      addMessage({
        sender: 'bot',
        text: `Sorry, I encountered an error: ${err.message}. Please try again in a moment.`,
        timestamp: new Date(),
        isError: true,
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  // Handle voice input
  const handleVoiceTranscript = (transcript) => {
    setInputText(transcript)
    setUseVoice(false)
  }

  // Handle voice message sent directly
  const handleVoiceSend = (transcript) => {
    handleSendMessage(transcript)
    setUseVoice(false)
  }

  const handleVoiceAudio = async (audioBase64) => {
    addMessage({
      sender: 'user',
      text: '🎤 Voice message...',
      timestamp: new Date(),
      isVoice: true,
    })

    setLoading(true)
    setUseVoice(false)

    try {
      const response = await chatService.sendVoiceMessage(
        audioBase64,
        conversationId
      )

      // Update user message with transcription
      const lastMsg = messages[messages.length - 1]
      if (lastMsg) {
        lastMsg.text = response.transcription
      }

      // Add AI response
      addMessage({
        sender: 'bot',
        text: response.reply,
        timestamp: new Date(),
        model: response.model,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chatbot Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">MindBridge Chat</h1>
            <p className="text-sm text-gray-500">
               {messages.length} messages
            </p>
          </div>
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-xl"
                title="Clear conversation"
              >
                🗑
              </button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Start a conversation
                </h2>
                <p className="text-gray-600 mb-6 max-w-sm">
                  Type a message or use the microphone to speak. I'm here to help with any
                  questions!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full">
                  <button
                    onClick={() => handleSendMessage('How are you?')}
                    className="p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                  >
                    How are you?
                  </button>
                  <button
                    onClick={() =>
                      handleSendMessage('Tell me a story about elderly care.')
                    }
                    className="p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                  >
                    Story about care
                  </button>
                  <button
                    onClick={() =>
                      handleSendMessage('What health tips do you have for me?')
                    }
                    className="p-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                  >
                    Health tips
                  </button>
                </div>
              </motion.div>
            ) : (
              messages.map((msg) => (
                <motion.div key={msg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <ChatMessage
                    message={msg}
                    onReaction={(id, reaction) => {
                      console.log('Reaction:', id, reaction)
                    }}
                  />
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mx-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between"
            >
              <p className="text-sm text-red-700">{error}</p>
              <button onClick={clearError} className="text-red-700 hover:text-red-900 text-xl font-bold">
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-6">
          {useVoice ? (
            <VoiceRecorder
              onTranscript={handleVoiceTranscript}
              onAudioData={handleVoiceAudio}
              onSendMessage={handleVoiceSend}
              disabled={isLoading}
            />
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setUseVoice(true)}
                className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center gap-2"
                disabled={isLoading}
              >
                🎤
              </button>
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
              >
                <FiSend size={18} />
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage
