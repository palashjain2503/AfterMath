import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function CognitiveGraph() {
  const data = [
    { week: 'W1', score: 78 },
    { week: 'W2', score: 80 },
    { week: 'W3', score: 79 },
    { week: 'W4', score: 82 },
  ]

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Cognitive Health</h2>
        <p className="text-sm text-gray-500">Monthly cognitive assessment scores</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="cognitiveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="week" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" domain={[70, 90]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#0ea5e9"
            strokeWidth={3}
            fill="url(#cognitiveGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CognitiveGraph
