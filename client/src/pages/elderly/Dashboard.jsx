import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiMessageCircle,
  FiActivity,
  FiSmile,
  FiCloudDrizzle,
  FiSettings,
} from 'react-icons/fi'
import { BiHeartCircle } from 'react-icons/bi'
import { AiOutlineAppstore } from 'react-icons/ai'
import Sidebar from '../../components/Layout/Sidebar'
import Navbar from '../../components/Layout/Navbar'
import ChatWidget from '../../components/Chatbot/ChatWidget'
import PanicButton from '../../components/Dashboard/PanicButton'
import MoodTrend from '../../components/Dashboard/MoodTrend'
import CognitiveGraph from '../../components/Dashboard/CognitiveGraph'
import HealthMetrics from '../../components/Dashboard/HealthMetrics'
import RecentConversations from '../../components/Dashboard/RecentConversations'

function ElderlyDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState({
    name: 'Sarah Jenkins',
    age: 72,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0ea5e9&color=fff',
    lastLogin: new Date().toLocaleDateString(),
  })
  
  const [metrics, setMetrics] = useState({
    moodScore: 7.5,
    cognitiveScore: 82,
    sleepHours: 6.5,
    activityLevel: 'Moderate',
    heartRate: 72,
    bloodPressure: '120/80',
  })

  useEffect(() => {
    // In a real app, fetch user data from API
    console.log('Dashboard loaded')
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        userType="elderly"
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar 
          user={user}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            
            {/* Welcome Header */}
            <div className="card-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
                  <p className="text-primary-100">Let's check in on your health today</p>
                </div>
                <div className="hidden md:block">
                  <BiHeartCircle className="text-6xl opacity-20" />
                </div>
              </div>
            </div>

            {/* Emergency SOS Section */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-red-700 mb-2">Emergency SOS Alert</h2>
                  <p className="text-gray-700">If you need immediate help, press the button below to alert your caregiver</p>
                </div>
                <PanicButton elderlyName={user.name} />
              </div>
            </div>

            {/* Health Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Mood Card */}
              <div className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <FiSmile className="text-2xl text-pink-500" />
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Today</span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">Mood Score</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.moodScore}/10</p>
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-300"
                    style={{ width: `${metrics.moodScore * 10}%` }}
                  />
                </div>
              </div>

              {/* Cognitive Card */}
              <div className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <AiOutlineAppstore className="text-2xl text-primary-500" />
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">This Week</span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">Cognitive Health</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.cognitiveScore}%</p>
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-500 transition-all duration-300"
                    style={{ width: `${metrics.cognitiveScore}%` }}
                  />
                </div>
              </div>

              {/* Sleep Card */}
              <div className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <FiCloudDrizzle className="text-2xl text-blue-500" />
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Last Night</span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">Sleep Duration</h3>
                <p className="text-3xl font-bold text-gray-900">{metrics.sleepHours}h</p>
                <p className="text-xs text-gray-500 mt-4">Good sleep pattern</p>
              </div>

              {/* Activity Card */}
              <div className="card hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <FiActivity className="text-2xl text-green-500" />
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">Activity Level</h3>
                <p className="text-lg font-bold text-gray-900">{metrics.activityLevel}</p>
                <p className="text-xs text-gray-500 mt-4">Keep moving!</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mood Trend Chart */}
              <MoodTrend />
              
              {/* Cognitive Trend Chart */}
              <CognitiveGraph />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Conversations */}
              <div className="lg:col-span-2">
                <RecentConversations />
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="card">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FiMessageCircle className="text-primary-500" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full btn-primary flex items-center justify-center gap-2 py-3">
                      <FiMessageCircle /> Start Chat
                    </button>
                    <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
                      <AiOutlineAppstore /> Play Games
                    </button>
                    <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
                      <FiActivity /> View Schedule
                    </button>
                    <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
                      <FiSettings /> Settings
                    </button>
                  </div>
                </div>

                {/* Tips Widget */}
                <div className="card bg-gradient-to-br from-secondary-50 to-secondary-100">
                  <h3 className="font-semibold text-gray-900 mb-3">💡 Daily Tip</h3>
                  <p className="text-sm text-gray-700">
                    "Try to get 7-8 hours of sleep each night for better cognitive health. Your brain needs rest to consolidate memories!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Chat Button (if chat is minimized) */}
      <ChatWidget />
    </div>
  )
}

export default ElderlyDashboard
