import { FiHome, FiMessageCircle, FiActivity, FiUsers, FiLogOut } from 'react-icons/fi'
import { BiHeartCircle } from 'react-icons/bi'

function Sidebar({ isOpen, userType, onClose }) {
  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/elderly', active: true },
    { icon: FiMessageCircle, label: 'Chatbot', path: '/elderly/chat' },
    { icon: FiActivity, label: 'Activities', path: '/activities' },
    ...(userType === 'elderly' ? [
      { icon: FiUsers, label: 'Caregivers', path: '/caregivers' },
    ] : []),
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative z-50 w-64 h-screen bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <BiHeartCircle className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MindBridge</h1>
              <p className="text-xs text-gray-500">Care Companion</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  item.active
                    ? 'bg-primary-100 text-primary-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-xl flex-shrink-0" />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
