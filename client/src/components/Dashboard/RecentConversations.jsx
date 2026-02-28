import { FiArrowRight, FiSmile, FiInfo, FiAlertCircle } from 'react-icons/fi'

function RecentConversations() {
  const conversations = [
    {
      id: 1,
      title: "Good morning chat",
      preview: "How are you feeling today? Did you sleep well?",
      time: "2 hours ago",
      sentiment: "positive",
      unread: true,
    },
    {
      id: 2,
      title: "Memory games feedback",
      preview: "Great job on the pattern recognition game!",
      time: "Yesterday",
      sentiment: "positive",
      unread: false,
    },
    {
      id: 3,
      title: "Health reminder",
      preview: "Don't forget to take your medication...",
      time: "2 days ago",
      sentiment: "neutral",
      unread: false,
    },
  ]

  const sentimentIcons = {
    positive: <FiSmile className="text-green-500" />,
    neutral: <FiInfo className="text-gray-500" />,
    negative: <FiAlertCircle className="text-red-500" />,
  }

  return (
    <div className="card">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
          <p className="text-sm text-gray-500">Your chat history</p>
        </div>
        <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1">
          View all <FiArrowRight size={16} />
        </a>
      </div>

      <div className="space-y-3">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              conv.unread
                ? 'border-primary-200 bg-primary-50 hover:bg-primary-100'
                : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {sentimentIcons[conv.sentiment]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{conv.title}</h3>
                    {conv.unread && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.preview}</p>
                  <p className="text-xs text-gray-500 mt-2">{conv.time}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentConversations
