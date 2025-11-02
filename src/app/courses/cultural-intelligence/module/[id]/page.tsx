'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { X, Play, Pause, Maximize2, Minimize2, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const modules: Record<string, { title: string; description: string; videoUrl?: string }> = {
  '1': {
    title: 'Introduction to Cultural Intelligence',
    description: 'Understand the fundamentals of cultural intelligence and why it matters in today\'s globalized world. Learn the core concepts and frameworks that will guide your learning journey.',
    videoUrl: '/videos/module-1.mp4' // Replace with actual video URLs
  },
  '2': {
    title: 'The Four Dimensions of CQ',
    description: 'Explore the four key dimensions: CQ Drive, CQ Knowledge, CQ Strategy, and CQ Action. Master each dimension and learn how they work together.',
    videoUrl: '/videos/module-2.mp4'
  },
  '3': {
    title: 'Cultural Awareness & Self-Reflection',
    description: 'Develop deep self-awareness about your own cultural background and biases. Learn to recognize how culture shapes your perspective.',
    videoUrl: '/videos/module-3.mp4'
  },
  '4': {
    title: 'Communication Across Cultures',
    description: 'Master verbal and non-verbal communication styles across different cultures. Understand high-context vs low-context communication.',
    videoUrl: '/videos/module-4.mp4'
  },
  '5': {
    title: 'Building Cross-Cultural Relationships',
    description: 'Learn strategies for building trust and meaningful relationships across cultural boundaries. Navigate cultural differences with grace.',
    videoUrl: '/videos/module-5.mp4'
  },
  '6': {
    title: 'Cultural Adaptation Strategies',
    description: 'Develop practical strategies for adapting to new cultural environments. Learn to be flexible while maintaining your core values.',
    videoUrl: '/videos/module-6.mp4'
  },
  '7': {
    title: 'Managing Cultural Conflicts',
    description: 'Handle misunderstandings and conflicts that arise from cultural differences. Turn challenges into opportunities for growth.',
    videoUrl: '/videos/module-7.mp4'
  },
  '8': {
    title: 'Cultural Intelligence in Business',
    description: 'Apply CQ principles to business contexts. Learn to lead diverse teams and negotiate across cultural boundaries.',
    videoUrl: '/videos/module-8.mp4'
  },
  '9': {
    title: 'Creating Inclusive Environments',
    description: 'Learn how to create spaces where people from all cultural backgrounds feel valued and included. Foster cultural sensitivity.',
    videoUrl: '/videos/module-9.mp4'
  },
  '10': {
    title: 'Mastering Your CQ Journey',
    description: 'Integrate everything you\'ve learned and create your personal action plan. Commit to continuous growth in cultural intelligence.',
    videoUrl: '/videos/module-10.mp4'
  }
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params?.id as string
  const module = modules[moduleId || '']

  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Check if module is completed
    const saved = localStorage.getItem('cultural-intelligence-progress')
    if (saved) {
      const progress = JSON.parse(saved)
      setIsCompleted(progress.completedModules?.includes(moduleId) || false)
    }

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [moduleId])

  useEffect(() => {
    // Disable right-click context menu on video
    const handleContextMenu = (e: MouseEvent) => {
      if (videoRef.current && videoRef.current.contains(e.target as Node)) {
        e.preventDefault()
        return false
      }
    }

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (videoRef.current && document.activeElement === videoRef.current) {
        // Disable download shortcuts
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault()
          return false
        }
        // Disable save page
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
          e.preventDefault()
          return false
        }
      }
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      if (videoRef.current && videoRef.current.contains(e.target as Node)) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('selectstart', handleSelectStart)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('selectstart', handleSelectStart)
    }
  }, [])

  useEffect(() => {
    // Detect screen recording attempts
    if (videoRef.current) {
      const video = videoRef.current
      
      // Disable picture-in-picture
      if (video.requestPictureInPicture) {
        video.disablePictureInPicture = true
      }

      // Detect if video is being captured
      const handleVisibilityChange = () => {
        if (document.hidden && isPlaying) {
          video.pause()
          setIsPlaying(false)
          alert('Video paused for security. Please stay on this page to continue watching.')
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen()
      } else if ((containerRef.current as any).msRequestFullscreen) {
        (containerRef.current as any).msRequestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleMarkComplete = () => {
    setIsCompleted(true)
    const saved = localStorage.getItem('cultural-intelligence-progress')
    const progress = saved ? JSON.parse(saved) : { completedModules: [], courseCompleted: false }
    
    if (!progress.completedModules) {
      progress.completedModules = []
    }
    
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId)
    }

    // Check if all modules are completed
    if (progress.completedModules.length === Object.keys(modules).length) {
      progress.courseCompleted = true
    }

    localStorage.setItem('cultural-intelligence-progress', JSON.stringify(progress))
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module not found</h1>
          <Link href="/courses/cultural-intelligence" className="text-azure-blue hover:underline">
            Return to Course
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/courses/cultural-intelligence">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Course</span>
            </motion.button>
          </Link>

          {/* Module Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              {module.title}
            </h1>
            <p className="text-lg text-white/80">
              {module.description}
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            ref={containerRef}
            className="relative glass-card p-0 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              if (isPlaying) {
                setTimeout(() => setShowControls(false), 1000)
              }
            }}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              src={module.videoUrl || '/videos/placeholder.mp4'}
              className="w-full h-auto video-container"
              controls={false}
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onClick={togglePlay}
              onDoubleClick={toggleFullscreen}
              style={{ 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'auto',
                cursor: 'pointer'
              }}
              preload="metadata"
            />

            {/* Custom Controls Overlay */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFullscreen}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-6 h-6 text-white" />
                      ) : (
                        <Maximize2 className="w-6 h-6 text-white" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/courses/cultural-intelligence')}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all z-20"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            {isCompleted ? (
              <div className="glass-card flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/40">
                <CheckCircle2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-1">Module Completed!</h3>
                  <p className="text-white/70">Great job! You've completed this module.</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="w-full glass-card p-6 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 group"
                style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
                <span className="text-white font-semibold text-lg">Mark Module as Complete</span>
              </button>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

