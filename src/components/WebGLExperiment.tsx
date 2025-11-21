'use client'

import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { X, Atom, Stars, Brain, Heart, Infinity } from 'lucide-react'
import * as THREE from 'three'

interface TopicConfig {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

const topics: TopicConfig[] = [
  {
    id: 'quantum',
    name: 'Quantum Realm',
    description: 'Explore subatomic dimensions',
    icon: <Atom className="w-6 h-6" />,
    color: '#00d4ff'
  },
  {
    id: 'stellar',
    name: 'Stellar Formation',
    description: 'Witness the birth of stars',
    icon: <Stars className="w-6 h-6" />,
    color: '#ff914d'
  },
  {
    id: 'consciousness',
    name: 'Consciousness',
    description: 'Dive into the depths of mind',
    icon: <Brain className="w-6 h-6" />,
    color: '#0099ff'
  },
  {
    id: 'infinity',
    name: 'Infinity',
    description: 'Experience the endless',
    icon: <Infinity className="w-6 h-6" />,
    color: '#00d4ff'
  }
]

// Interactive Nebula Clouds
function InteractiveNebulaEffect({ 
  mousePosition,
  topicDepth 
}: { 
  mousePosition: { x: number, y: number }
  topicDepth: number 
}) {
  const clouds = useRef<THREE.Group>(null)
  const count = 15

  const cloudMeshes = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!clouds.current) return
    cloudMeshes.current = Array.from(clouds.current.children) as THREE.Mesh[]
  }, [])

  useFrame((state) => {
    if (!clouds.current) return
    const time = state.clock.getElapsedTime()
    
    cloudMeshes.current.forEach((cloud, i) => {
      if (!cloud) return
      
      const baseX = Math.sin(time * 0.08 + i) * 3
      const baseY = Math.cos(time * 0.1 + i) * 2
      const baseZ = -5 - (i * 1.5) - (topicDepth * 3)
      
      // Extremely slow, barely noticeable mouse interaction
      const mouseInfluence = 0.15
      const dampingFactor = 0.015 // Almost imperceptible mouse response
      cloud.position.x = baseX + mousePosition.x * mouseInfluence * dampingFactor
      cloud.position.y = baseY - mousePosition.y * mouseInfluence * dampingFactor
      cloud.position.z = baseZ
      
      cloud.rotation.z = Math.sin(time * 0.1 + i) * 0.2 + mousePosition.x * 0.003
      cloud.rotation.x = Math.cos(time * 0.12 + i) * 0.15 + mousePosition.y * 0.003
      
      const scale = 1 + Math.sin(time * 0.15 + i) * 0.15 + topicDepth * 0.3
      cloud.scale.setScalar(scale)
    })
  })

  return (
    <group ref={clouds}>
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 4
        // More orange clouds - 50% orange, 25% azure-blue, 25% bright-blue
        const colorChoice = Math.random()
        const color = colorChoice < 0.5 ? '#ff914d' : colorChoice < 0.75 ? '#00d4ff' : '#0099ff'
        
        return (
          <Cloud key={i} size={size} color={color} index={i} />
        )
      })}
    </group>
  )
}

function Cloud({ size, color, index }: { size: number, color: string, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Very slow, smooth opacity pulsing - no flickering
    const opacity = 0.35 + Math.sin(time * 0.2 + index * 0.5) * 0.05
    
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.opacity = opacity
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.35}
        emissive={color}
        emissiveIntensity={0.5}
        fog={false}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Main Scene Component
function Scene({ 
  mousePosition,
  topicDepth 
}: { 
  mousePosition: { x: number, y: number }
  topicDepth: number 
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.0002 - (topicDepth * 0.0001)
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" distance={50} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff914d" distance={50} />
      <pointLight position={[0, 10, -10]} intensity={1.5} color="#0099ff" distance={50} />
      <hemisphereLight args={['#00d4ff', '#01011e', 0.7]} />
      <InteractiveNebulaEffect mousePosition={mousePosition} topicDepth={topicDepth} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        enableDamping
        dampingFactor={0.05}
      />
    </group>
  )
}

// Drag Into Transition Effect
function DragIntoTransition({ 
  isActive, 
  topic,
  progress 
}: { 
  isActive: boolean
  topic: TopicConfig | null
  progress: number
}) {
  return (
    <AnimatePresence>
      {isActive && topic && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${topic.color}15 ${progress * 30}%, transparent ${50 + progress * 20}%)`,
          }}
          animate={{
            opacity: [0, 0.4, 0.2, 0],
          }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  )
}

// Topic Content Component
function TopicContent({ topic, isVisible }: { topic: TopicConfig | null, isVisible: boolean }) {
  if (!topic) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.9
      }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center px-4"
    >
      <div className="glass-card p-6 md:p-8 backdrop-blur-[20px] max-w-2xl mx-auto text-center bg-white/5 border border-white/10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{
            background: `linear-gradient(135deg, ${topic.color}30, ${topic.color}10)`,
            border: `2px solid ${topic.color}50`,
          }}
        >
          <div style={{ color: topic.color }}>
            {topic.icon}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-black mb-4"
          style={{
            background: `linear-gradient(135deg, ${topic.color}, #ffffff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {topic.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-white/80 leading-relaxed"
        >
          {topic.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Main Component
export function WebGLExperiment() {
  const [activeTopic, setActiveTopic] = useState<TopicConfig | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)

  // Smooth, damped mouse position tracking - extremely slow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 4, damping: 100 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 4, damping: 100 })
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position with smoothing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Update mouse position from smooth values
  useEffect(() => {
    const unsubscribeX = smoothMouseX.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, x: latest }))
    })
    const unsubscribeY = smoothMouseY.on('change', (latest) => {
      setMousePosition(prev => ({ ...prev, y: latest }))
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [smoothMouseX, smoothMouseY])

  const handleTopicClick = (topic: TopicConfig) => {
    setIsDragging(true)
    setDragProgress(0)

    const duration = 1200
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setDragProgress(progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setActiveTopic(topic)
        setIsDragging(false)
        setDragProgress(0)
      }
    }
    animate()
  }

  const closeTopic = () => {
    setActiveTopic(null)
  }

  const topicDepth = activeTopic ? 1 : 0

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fixed WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          camera={{ position: [0, 0, 20], fov: 75 }}
        >
          <Scene 
            mousePosition={mousePosition}
            topicDepth={topicDepth}
          />
          <fog attach="fog" args={['#01011e', 30, 60]} />
        </Canvas>
      </div>

      {/* Drag Into Transition */}
      <DragIntoTransition 
        isActive={isDragging} 
        topic={activeTopic || (hoveredTopic ? topics.find(t => t.id === hoveredTopic) || null : null)}
        progress={dragProgress}
      />

      {/* Topic Content Overlay */}
      {activeTopic && (
        <>
          <TopicContent topic={activeTopic} isVisible={true} />
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={closeTopic}
            className="fixed top-8 right-8 z-50 glass-card p-3 backdrop-blur-[20px] border border-glass-border hover:border-azure-blue/50 transition-all cursor-pointer rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}

      {/* Topic Navigation - Clean Grid */}
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto px-4">
          {topics.map((topic) => (
            <motion.button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
              className="pointer-events-auto cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeTopic && activeTopic.id !== topic.id ? 0.3 : 1,
                y: 0
              }}
              transition={{ 
                opacity: { duration: 0.3 },
                y: { type: "spring", stiffness: 200 }
              }}
            >
              <div className="glass-card p-4 backdrop-blur-[15px] border transition-all duration-300 text-center bg-white/5"
                style={{
                  borderColor: `${topic.color}${hoveredTopic === topic.id ? '80' : '30'}`,
                  background: hoveredTopic === topic.id 
                    ? `linear-gradient(135deg, ${topic.color}15, transparent)`
                    : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <motion.div
                  animate={{ 
                    rotate: hoveredTopic === topic.id ? 360 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ color: topic.color }}
                  className="mb-3 flex justify-center"
                >
                  {topic.icon}
                </motion.div>
                <h3 className={`text-lg font-bold mb-2 transition-colors ${
                  hoveredTopic === topic.id ? 'text-white' : 'text-white/80'
                }`}>
                  {topic.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: activeTopic ? 0.2 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
      >
        <h1 className="text-5xl md:text-7xl font-black mb-2 text-gradient-primary">
          Nebula Clouds
        </h1>
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity as any }}
          className="text-base text-white/50"
        >
          Move your mouse to interact
        </motion.p>
      </motion.div>

      {/* Subtle hint */}
      {!activeTopic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity as any, delay: 3 }}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <p className="text-white/40 text-sm">
            Click a topic to explore
          </p>
        </motion.div>
      )}
    </div>
  )
}
