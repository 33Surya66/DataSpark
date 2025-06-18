import { useState, useEffect } from 'react'
import { Upload, BarChart3, Zap, Brain, TrendingUp, Users, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Dataset {
  id: string
  name: string
  rows: number
  columns: number
  uploaded_at: string
}

const Dashboard = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch datasets from API
    setLoading(false)
  }, [])

  const stats = [
    { label: 'Total Datasets', value: datasets.length, icon: Database, color: 'text-blue-600' },
    { label: 'Active Models', value: 0, icon: Zap, color: 'text-green-600' },
    { label: 'Analyses Run', value: 0, icon: BarChart3, color: 'text-purple-600' },
    { label: 'Predictions Made', value: 0, icon: TrendingUp, color: 'text-orange-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to AutoGenAI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Build, Analyze, Predict – No Code Needed. Upload your data and let AI do the heavy lifting.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/upload" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Upload Data</h3>
              <p className="text-gray-600">Import CSV, Excel, or JSON files</p>
            </div>
          </div>
        </Link>

        <Link to="/analysis" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Auto Analysis</h3>
              <p className="text-gray-600">Get instant insights and visualizations</p>
            </div>
          </div>
        </Link>

        <Link to="/models" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Train Models</h3>
              <p className="text-gray-600">Build ML models with one click</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card text-center">
              <div className={`inline-flex p-3 rounded-lg bg-gray-100 mb-4`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Datasets */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Datasets</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No datasets uploaded yet</p>
            <Link to="/upload" className="btn-primary">
              Upload Your First Dataset
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {datasets.slice(0, 5).map((dataset) => (
              <div key={dataset.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{dataset.name}</h3>
                  <p className="text-sm text-gray-600">
                    {dataset.rows} rows × {dataset.columns} columns
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(dataset.uploaded_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard 