import { useState } from 'react'
import { Zap, Brain, TrendingUp, Target, Settings } from 'lucide-react'

const Models = () => {
  const [selectedDataset, setSelectedDataset] = useState<string>('')
  const [taskType, setTaskType] = useState<string>('')
  const [targetColumn, setTargetColumn] = useState<string>('')
  const [training, setTraining] = useState(false)
  const [models, setModels] = useState<any[]>([])

  const taskTypes = [
    { value: 'classification', label: 'Classification', icon: Target },
    { value: 'regression', label: 'Regression', icon: TrendingUp },
    { value: 'clustering', label: 'Clustering', icon: Brain },
  ]

  const handleTrainModels = async () => {
    if (!selectedDataset || !taskType || !targetColumn) return

    setTraining(true)
    try {
      // TODO: Call API to train models
      await new Promise(resolve => setTimeout(resolve, 3000)) // Simulate training
      
      // Mock results
      setModels([
        {
          name: 'Random Forest',
          accuracy: 0.89,
          f1_score: 0.87,
          training_time: '2.3s',
          status: 'completed'
        },
        {
          name: 'XGBoost',
          accuracy: 0.91,
          f1_score: 0.89,
          training_time: '1.8s',
          status: 'completed'
        },
        {
          name: 'SVM',
          accuracy: 0.85,
          f1_score: 0.83,
          training_time: '4.2s',
          status: 'completed'
        }
      ])
    } catch (error) {
      console.error('Training error:', error)
    } finally {
      setTraining(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AutoML Models</h1>
        <p className="text-lg text-gray-600">
          Train machine learning models with one click - no coding required
        </p>
      </div>

      {/* Model Configuration */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Model Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dataset Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Dataset
            </label>
            <select
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
              className="input-field"
            >
              <option value="">Choose a dataset...</option>
              <option value="sample">Sample Dataset</option>
            </select>
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {taskTypes.map((task) => {
                const Icon = task.icon
                return (
                  <button
                    key={task.value}
                    onClick={() => setTaskType(task.value)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      taskType === task.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-xs font-medium">{task.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Target Column */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Column
            </label>
            <select
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value)}
              className="input-field"
              disabled={!selectedDataset}
            >
              <option value="">Select target column...</option>
              <option value="target">Target</option>
              <option value="label">Label</option>
            </select>
          </div>

          {/* Training Button */}
          <div className="flex items-end">
            <button
              onClick={handleTrainModels}
              disabled={!selectedDataset || !taskType || !targetColumn || training}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {training ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Training Models...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Train Models</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Model Results */}
      {models.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Training Results</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Settings className="h-4 w-4" />
              <span>Auto-optimized hyperparameters</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{model.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-semibold text-green-600">
                      {(model.accuracy * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">F1 Score:</span>
                    <span className="font-semibold text-blue-600">
                      {(model.f1_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Training Time:</span>
                    <span className="font-medium text-gray-900">{model.training_time}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
                      Deploy
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder */}
      {!models.length && !training && (
        <div className="card text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Models Trained Yet</h3>
          <p className="text-gray-600">
            Configure your model settings and start training to see results
          </p>
        </div>
      )}
    </div>
  )
}

export default Models 