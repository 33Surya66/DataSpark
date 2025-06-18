import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'

const AnimatedBlobs = () => (
  <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0">
    {/* Blue Blob */}
    <svg className="absolute left-[-10vw] top-[-10vh] w-[60vw] h-[60vw] opacity-40 animate-blob1 hidden dark:block" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(300,300)">
        <path d="M120,-180C160,-140,200,-100,200,-60C200,-20,160,20,120,60C80,100,40,140,0,180C-40,220,-80,260,-120,260C-160,260,-200,220,-200,180C-200,140,-160,100,-120,60C-80,20,-40,-20,0,-60C40,-100,80,-140,120,-180Z" fill="#0284c7" />
      </g>
    </svg>
    {/* Green Blob */}
    <svg className="absolute right-[-15vw] bottom-[-10vh] w-[50vw] h-[50vw] opacity-30 animate-blob2 hidden dark:block" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(300,300)">
        <path d="M120,-120C180,-80,220,-20,200,40C180,100,100,160,40,200C-20,240,-80,260,-120,220C-160,180,-180,100,-180,40C-180,-20,-160,-80,-120,-120C-80,-160,-20,-180,40,-180C100,-180,160,-160,120,-120Z" fill="#10b981" />
      </g>
    </svg>
  </div>
)

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:dark-gradient-bg transition-colors duration-300 relative overflow-hidden">
      <AnimatedBlobs />
      <div className="relative z-10 text-center space-y-10 py-24">
        <div className="flex flex-col items-center space-y-6 fade-up">
          <span className="inline-flex items-center justify-center rounded-full bg-primary-100 dark:bg-transparent p-6 shadow-2xl">
            <Brain className="h-20 w-20 dataspark-title animate-pulse" />
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold dataspark-title drop-shadow-2xl tracking-tight">
            DataSpark
          </h1>
        </div>
        <p className="text-3xl md:text-4xl dataspark-accent font-semibold max-w-3xl mx-auto drop-shadow-lg fade-up" style={{ animationDelay: '0.2s' }}>
          Build, Analyze, Predict – <span className="underline decoration-green-400">No Code Needed</span>.
        </p>
        <p className="text-lg md:text-2xl text-primary-700 dark:text-green-200 max-w-2xl mx-auto mt-6 fade-up" style={{ animationDelay: '0.4s' }}>
          The next-gen no-code ML & Data Science platform. Upload your data, ask questions in plain English, and let AI do the magic.<br />
          <span className="font-bold dataspark-title">For business, for students, for everyone.</span>
        </p>
        <div className="mt-12 flex justify-center fade-up" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/dashboard"
            className="btn-primary text-xl px-10 py-5 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-transform"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing 