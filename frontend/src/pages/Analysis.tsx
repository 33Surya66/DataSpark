import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react'

const Analysis = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('')
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!selectedDataset) return

    setLoading(true)
    try {
      const response = await fetch(`/api/dataset/${selectedDataset}/eda`)
      if (response.ok) {
        const data = await response.json()
        setAnalysisData(data)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Analysis</h1>
        <p className="text-lg text-gray-600">
          Get instant insights and visualizations from your data
        </p>
      </div>

      {/* Dataset Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Dataset</h2>
        <div className="flex space-x-4">
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="">Choose a dataset...</option>
            <option value="sample">Sample Dataset</option>
          </select>
          <button
            onClick={handleAnalyze}
            disabled={!selectedDataset || loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisData && (
        <div className="space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {analysisData.summary.total_rows}
              </h3>
              <p className="text-gray-600">Total Rows</p>
            </div>
            <div className="card text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {analysisData.summary.total_columns}
              </h3>
              <p className="text-gray-600">Total Columns</p>
            </div>
            <div className="card text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {analysisData.summary.missing_values}
              </h3>
              <p className="text-gray-600">Missing Values</p>
            </div>
            <div className="card text-center">
              <PieChart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">
                {analysisData.summary.duplicate_rows}
              </h3>
              <p className="text-gray-600">Duplicates</p>
            </div>
          </div>

          {/* Data Distributions */}
          {Object.keys(analysisData.distributions).length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Distributions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(analysisData.distributions).map(([column, stats]: [string, any]) => (
                  <div key={column} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">{column}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mean:</span>
                        <span className="font-medium">{stats.mean.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Median:</span>
                        <span className="font-medium">{stats.median.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Std Dev:</span>
                        <span className="font-medium">{stats.std.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Skewness:</span>
                        <span className="font-medium">{stats.skewness.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysisData.recommendations.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {analysisData.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High Correlations */}
          {analysisData.correlations.high_correlations && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">High Correlations</h2>
              <div className="space-y-3">
                {analysisData.correlations.high_correlations.map((corr: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-gray-700">
                      {corr.col1} ↔ {corr.col2}
                    </span>
                    <span className="font-medium text-yellow-800">
                      {corr.correlation.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Placeholder for no data */}
      {!analysisData && !loading && (
        <div className="card text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Yet</h3>
          <p className="text-gray-600">
            Select a dataset and run analysis to see insights and visualizations
          </p>
        </div>
      )}
    </div>
  )
}

export default Analysis 