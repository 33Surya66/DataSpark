import { Link, useLocation } from 'react-router-dom'
import { Brain, Upload, BarChart3, Zap, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navItems = [
    { path: '/', label: 'DataSpark Home', icon: Brain },
    { path: '/upload', label: 'Upload Data', icon: Upload },
    { path: '/analysis', label: 'Analysis', icon: BarChart3 },
    { path: '/models', label: 'Models', icon: Zap },
  ]

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-sm border-b border-gray-200 dark:border-dark-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 dataspark-title" />
              <span className="text-xl dataspark-title">DataSpark</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                      : 'text-gray-600 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="ml-4 p-2 rounded-lg bg-primary-50 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-dark-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-primary-700" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 