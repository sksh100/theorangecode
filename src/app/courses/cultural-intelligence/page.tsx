'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ModernNavbar } from '@/components/ModernNavbar'
import { Background } from '@/components/Background'
import { ModernFooter } from '@/components/ModernFooter'
import { BookOpen, CheckCircle2, Clock, Play, Lock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Module {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  locked: boolean
}

const modules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Cultural Intelligence',
    description: 'Understand the fundamentals of cultural intelligence and why it matters in today\'s globalized world. Learn the core concepts and frameworks that will guide your learning journey.',
    duration: '15 min',
    completed: false,
    locked: false
  },
  {
    id: '2',
    title: 'The Four Dimensions of CQ',
    description: 'Explore the four key dimensions: CQ Drive, CQ Knowledge, CQ Strategy, and CQ Action. Master each dimension and learn how they work together.',
    duration: '20 min',
    completed: false,
    locked: false
  },
  {
    id: '3',
    title: 'Cultural Awareness & Self-Reflection',
    description: 'Develop deep self-awareness about your own cultural background and biases. Learn to recognize how culture shapes your perspective.',
    duration: '18 min',
    completed: false,
    locked: false
  },
  {
    id: '4',
    title: 'Communication Across Cultures',
    description: 'Master verbal and non-verbal communication styles across different cultures. Understand high-context vs low-context communication.',
    duration: '22 min',
    completed: false,
    locked: false
  },
  {
    id: '5',
    title: 'Building Cross-Cultural Relationships',
    description: 'Learn strategies for building trust and meaningful relationships across cultural boundaries. Navigate cultural differences with grace.',
    duration: '25 min',
    completed: false,
    locked: false
  },
  {
    id: '6',
    title: 'Cultural Adaptation Strategies',
    description: 'Develop practical strategies for adapting to new cultural environments. Learn to be flexible while maintaining your core values.',
    duration: '20 min',
    completed: false,
    locked: false
  },
  {
    id: '7',
    title: 'Managing Cultural Conflicts',
    description: 'Handle misunderstandings and conflicts that arise from cultural differences. Turn challenges into opportunities for growth.',
    duration: '24 min',
    completed: false,
    locked: false
  },
  {
    id: '8',
    title: 'Cultural Intelligence in Business',
    description: 'Apply CQ principles to business contexts. Learn to lead diverse teams and negotiate across cultural boundaries.',
    duration: '28 min',
    completed: false,
    locked: false
  },
  {
    id: '9',
    title: 'Creating Inclusive Environments',
    description: 'Learn how to create spaces where people from all cultural backgrounds feel valued and included. Foster cultural sensitivity.',
    duration: '26 min',
    completed: false,
    locked: false
  },
  {
    id: '10',
    title: 'Mastering Your CQ Journey',
    description: 'Integrate everything you\'ve learned and create your personal action plan. Commit to continuous growth in cultural intelligence.',
    duration: '30 min',
    completed: false,
    locked: false
  }
]

export default function CulturalIntelligenceCourse() {
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const [courseCompleted, setCourseCompleted] = useState(false)

  useEffect(() => {
    // Load completion status from localStorage
    const saved = localStorage.getItem('cultural-intelligence-progress')
    if (saved) {
      const progress = JSON.parse(saved)
      setCompletedModules(new Set(progress.completedModules || []))
      setCourseCompleted(progress.courseCompleted || false)
    }
  }, [])

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules)
    newCompleted.add(moduleId)
    setCompletedModules(newCompleted)
    
    // Check if all modules are completed
    if (newCompleted.size === modules.length) {
      setCourseCompleted(true)
    }

    // Save to localStorage
    localStorage.setItem('cultural-intelligence-progress', JSON.stringify({
      completedModules: Array.from(newCompleted),
      courseCompleted: newCompleted.size === modules.length
    }))
  }

  const handleMarkCourseComplete = () => {
    setCourseCompleted(true)
    const allModuleIds = modules.map(m => m.id)
    setCompletedModules(new Set(allModuleIds))
    
    localStorage.setItem('cultural-intelligence-progress', JSON.stringify({
      completedModules: allModuleIds,
      courseCompleted: true
    }))
  }

  const completedCount = completedModules.size
  const progressPercentage = (completedCount / modules.length) * 100

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <Background />
      <ModernNavbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="glass-card mb-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient-primary">
                    Cultural Intelligence
                  </h1>
                  <p className="text-lg text-white/80 mb-4">
                    Transform your ability to work effectively across cultures. This comprehensive course will guide you through mastering cultural intelligence and applying it in real-world situations.
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70">Course Progress</span>
                      <span className="text-sm font-semibold text-white">{completedCount} / {modules.length} Modules</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Course Completion */}
                  {courseCompleted && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/20 border border-green-500/40 rounded-xl backdrop-blur-sm">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <span className="text-green-400 font-semibold">Course Completed! Congratulations!</span>
                    </div>
                  )}

                  {!courseCompleted && (
                    <button
                      onClick={handleMarkCourseComplete}
                      className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 hover:shadow-glow"
                      style={{ background: 'linear-gradient(to right, #E89F6B 0%, #A7A7A7 50%, #50A0F0 100%)' }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Mark Course as Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {modules.map((module, index) => (
              <Link key={module.id} href={`/courses/cultural-intelligence/module/${module.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card h-full cursor-pointer group hover:scale-[1.02] transition-all duration-300 !py-16 !px-10"
                >
                  <div className="flex items-start gap-5">
                    {/* Module Number Badge */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      completedModules.has(module.id)
                        ? 'bg-green-500/20 border border-green-500/40'
                        : 'bg-azure-blue/20 border border-azure-blue/40'
                    }`}>
                      {completedModules.has(module.id) ? (
                        <CheckCircle2 className="w-7 h-7 text-green-400" />
                      ) : (
                        <span className="text-white font-bold text-xl">{module.id}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-azure-blue transition-colors">
                          {module.title}
                        </h3>
                        <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-azure-blue group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <p className="text-white/70 text-base mb-4 line-clamp-4">
                        {module.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white/60 text-base">
                          <Clock className="w-5 h-5" />
                          <span>{module.duration}</span>
                        </div>
                        {completedModules.has(module.id) && (
                          <div className="flex items-center gap-2 text-green-400 text-base">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  )
}

