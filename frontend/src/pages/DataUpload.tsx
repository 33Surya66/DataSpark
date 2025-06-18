import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface UploadResult {
  dataset_id: string
  filename: string
  shape: [number, number]
  insights: any
}

const DataUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      setUploadResult(result)
      toast.success('File uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file. Please try again.')
    } finally {
      setUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json'],
    },
    multiple: false,
  })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Data</h1>
        <p className="text-lg text-gray-600">
          Upload CSV, Excel, or JSON files to get started with AutoGenAI
        </p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-lg text-gray-600">Uploading your file...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-16 w-16 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
              </p>
              <p className="text-gray-600 mt-2">
                or click to browse files
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Supports CSV, Excel (.xlsx, .xls), and JSON files up to 100MB
            </p>
          </div>
        )}
      </div>

      {/* Upload Result */}
      {uploadResult && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Upload Successful!</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">File Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Filename:</span>
                  <span className="font-medium">{uploadResult.filename}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset ID:</span>
                  <span className="font-medium">{uploadResult.dataset_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">
                    {uploadResult.shape[0]} rows × {uploadResult.shape[1]} columns
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Data Insights</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Types:</span>
                  <span className="font-medium">
                    {Object.keys(uploadResult.insights.data_types).length} detected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Missing Values:</span>
                  <span className="font-medium">
                    {Object.keys(uploadResult.insights.missing_values).length} columns
                  </span>
                </div>
                {Object.keys(uploadResult.insights.correlations).length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correlations:</span>
                    <span className="font-medium">Available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="btn-primary">
              View Analysis
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Train Models
            </button>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Supported File Formats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">CSV Files</p>
              <p className="text-sm text-gray-600">Comma-separated values</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Excel Files</p>
              <p className="text-sm text-gray-600">.xlsx and .xls formats</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <FileText className="h-6 w-6 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">JSON Files</p>
              <p className="text-sm text-gray-600">JavaScript Object Notation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataUpload 