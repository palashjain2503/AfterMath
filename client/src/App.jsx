import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ElderlyDashboard from './pages/elderly/Dashboard'
import ChatbotPage from './pages/elderly/Chatbot'
import CaregiverDashboard from './pages/caregiver/Dashboard'
import DoctorDashboard from './pages/doctor/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/elderly" element={<ElderlyDashboard />} />
        <Route path="/elderly/chat" element={<ChatbotPage />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/" element={<Navigate to="/elderly" replace />} />
      </Routes>
    </Router>
  )
}

export default App
