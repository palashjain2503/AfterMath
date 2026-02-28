import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function MoodTrend() {
  const data = [
    { day: 'Mon', mood: 6.5 },
    { day: 'Tue', mood: 7.2 },
    { day: 'Wed', mood: 6.8 },
    { day: 'Thu', mood: 8.1 },
    { day: 'Fri', mood: 7.9 },
    { day: 'Sat', mood: 8.5 },
    { day: 'Sun', mood: 7.5 },
  ]

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Mood Trend</h2>
        <p className="text-sm text-gray-500">Weekly mood progression</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={[0, 10]} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ fill: '#ec4899', r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MoodTrend
