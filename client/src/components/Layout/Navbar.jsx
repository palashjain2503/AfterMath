import { FiBell, FiSearch, FiSettings } from 'react-icons/fi'
import { useState } from 'react'

function Navbar({ user, onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
          >
            ☰
          </button>

          {/* Search Bar */}
          <div className="hidden md:block relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiBell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 p-4 space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-3 h-3 bg-primary-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Regular health check-in</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Medication reminder</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-semibold block pt-2">
                  View all notifications →
                </a>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiSettings size={20} className="text-gray-600" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.age} years old</p>
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-primary-500"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
