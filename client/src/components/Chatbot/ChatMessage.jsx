import { FiCheckCircle, FiAlertCircle, FiCopy, FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { useState } from 'react'

function ChatMessage({ message, onReaction }) {
  const [copied, setCopied] = useState(false)
  const [reaction, setReaction] = useState(null)

  const isUser = message.sender === 'user'
  const timestamp = new Date(message.timestamp)
  const timeString = timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReaction = (type) => {
    setReaction(type === reaction ? null : type)
    onReaction?.(message.id, type === reaction ? null : type)
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none border border-gray-200'
        }`}
      >
        {/* Message Status */}
        {isUser && message.status && (
          <div className="flex items-center gap-1 mb-2 text-xs text-primary-100">
            {message.status === 'sending' && (
              <>
                <div className="w-2 h-2 bg-primary-300 rounded-full animate-pulse" />
                Sending...
              </>
            )}
            {message.status === 'sent' && (
              <>
                <FiCheckCircle size={12} />
                Sent
              </>
            )}
            {message.status === 'error' && (
              <>
                <FiAlertCircle size={12} className="text-red-300" />
                Error sending
              </>
            )}
          </div>
        )}

        {/* Message Text */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>

        {/* Timestamp */}
        <p
          className={`text-xs mt-2 ${
            isUser ? 'text-primary-100' : 'text-gray-500'
          }`}
        >
          {timeString}
        </p>

        {/* Actions */}
        <div
          className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? 'justify-end' : 'justify-start'
          }`}
        >
          {!isUser && (
            <>
              <button
                onClick={handleCopy}
                title="Copy message"
                className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                  copied ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                <FiCopy size={14} />
              </button>
              <button
                onClick={() => handleReaction('thumbs-up')}
                title="Good response"
                className={`p-1 rounded transition-colors ${
                  reaction === 'thumbs-up'
                    ? 'text-green-600 bg-gray-200'
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <FiThumbsUp size={14} />
              </button>
              <button
                onClick={() => handleReaction('thumbs-down')}
                title="Bad response"
                className={`p-1 rounded transition-colors ${
                  reaction === 'thumbs-down'
                    ? 'text-red-600 bg-gray-200'
                    : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <FiThumbsDown size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
