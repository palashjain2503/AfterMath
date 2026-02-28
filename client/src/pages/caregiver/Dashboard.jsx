function CaregiverDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="card-lg text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Caregiver Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">
          Monitor and manage the care of your elderly companions. This interface is coming soon!
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="text-4xl mb-2">👥</div>
            <p className="font-semibold text-gray-900">Manage Clients</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-semibold text-gray-900">View Analytics</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-2">🔔</div>
            <p className="font-semibold text-gray-900">Alerts</p>
          </div>
          <div className="card">
            <div className="text-4xl mb-2">📝</div>
            <p className="font-semibold text-gray-900">Reports</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaregiverDashboard
