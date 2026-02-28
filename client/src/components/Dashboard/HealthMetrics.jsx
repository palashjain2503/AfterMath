function HealthMetrics() {
  const metrics = [
    { label: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal' },
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal' },
    { label: 'Temperature', value: '98.6', unit: '°F', status: 'normal' },
    { label: 'Oxygen Level', value: '98', unit: '%', status: 'normal' },
  ]

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
            </p>
            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full capitalize">
              {metric.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthMetrics
