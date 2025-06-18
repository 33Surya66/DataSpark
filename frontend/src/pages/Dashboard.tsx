import { useState, useEffect } from 'react'
import { Upload, BarChart3, Zap, Brain, TrendingUp, Database } from 'lucide-react'
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
    { label: 'Total Datasets', value: datasets.length, icon: Database, color: 'text-primary-600 dark:text-primary-300' },
    { label: 'Active Models', value: 0, icon: Zap, color: 'text-accent-500 dark:text-accent-300' },
    { label: 'Analyses Run', value: 0, icon: BarChart3, color: 'text-info dark:text-info' },
    { label: 'Predictions Made', value: 0, icon: TrendingUp, color: 'text-success dark:text-success' },
  ]

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl dataspark-title mb-4">
          DataSpark Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your data, models, and insights at a glance.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/upload" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
              <Upload className="h-8 w-8 text-primary-600 dark:text-primary-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dataspark-title">Upload Data</h3>
              <p className="text-gray-600 dark:text-gray-300">Import CSV, Excel, or JSON files</p>
            </div>
          </div>
        </Link>

        <Link to="/analysis" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent-100 dark:bg-accent-900 rounded-lg group-hover:bg-accent-200 dark:group-hover:bg-accent-800 transition-colors">
              <BarChart3 className="h-8 w-8 text-accent-500 dark:text-accent-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dataspark-accent">Auto Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300">Get instant insights and visualizations</p>
            </div>
          </div>
        </Link>

        <Link to="/models" className="card hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-info/20 dark:bg-info/30 rounded-lg group-hover:bg-info/40 dark:group-hover:bg-info/50 transition-colors">
              <Brain className="h-8 w-8 text-info dark:text-info" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-info dark:text-info">Train Models</h3>
              <p className="text-gray-600 dark:text-gray-300">Build ML models with one click</p>
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
              <div className={`inline-flex p-3 rounded-lg bg-gray-100 dark:bg-dark-700 mb-4`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold dataspark-title">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Datasets */}
      <div className="card">
        <h2 className="text-xl font-semibold dataspark-title mb-4">Recent Datasets</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-300 mx-auto"></div>
          </div>
        ) : datasets.length === 0 ? (
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">No datasets uploaded yet</p>
            <Link to="/upload" className="btn-primary">
              Upload Your First Dataset
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {datasets.slice(0, 5).map((dataset) => (
              <div key={dataset.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <h3 className="font-medium dataspark-title">{dataset.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {dataset.rows} rows × {dataset.columns} columns
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
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