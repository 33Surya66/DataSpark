import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import DataUpload from './pages/DataUpload'
import Analysis from './pages/Analysis'
import Models from './pages/Models'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-transparent">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<DataUpload />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/models" element={<Models />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
