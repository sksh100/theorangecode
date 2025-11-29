'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Globe, Network, Users, Sparkles, Layers, GitBranch, Link2 } from 'lucide-react'
import * as THREE from 'three'

// OPTION 1: Cultural Networks - Connected nodes representing people and connections
function CulturalNetworksEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodeCount = 30
  const nodesRef = useRef<THREE.Mesh[]>([])
  const linesRef = useRef<THREE.Line[]>([])

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      color: Math.random() < 0.5 ? '#ff914d' : Math.random() < 0.75 ? '#00d4ff' : '#0099ff'
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.1
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.2
    
    // Subtle mouse influence
    nodesRef.current.forEach((node, i) => {
      if (!node) return
      const nodeData = nodes[i]
      const basePos = nodeData.position
      
      node.position.x = basePos[0] + mousePosition.x * 0.5
      node.position.y = basePos[1] - mousePosition.y * 0.5
      node.position.z = basePos[2] + Math.sin(time * 0.3 + i) * 0.5
    })
  })

  // Connect nearby nodes
  const connections = useMemo(() => {
    const conns: Array<{ from: number, to: number }> = []
    nodes.forEach((nodeA, i) => {
      nodes.forEach((nodeB, j) => {
        if (i >= j) return
        const distance = Math.sqrt(
          Math.pow(nodeA.position[0] - nodeB.position[0], 2) +
          Math.pow(nodeA.position[1] - nodeB.position[1], 2) +
          Math.pow(nodeA.position[2] - nodeB.position[2], 2)
        )
        if (distance < 8) {
          conns.push({ from: i, to: j })
        }
      })
    })
    return conns
  }, [nodes])

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} ref={(el) => { if (el) nodesRef.current[i] = el }} position={node.position}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* Connections */}
      {connections.map((conn, i) => {
        const from = nodes[conn.from]
        const to = nodes[conn.to]
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  from.position[0], from.position[1], from.position[2],
                  to.position[0], to.position[1], to.position[2]
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.2}
            />
          </line>
        )
      })}
    </group>
  )
}

// OPTION 2: Converging Cultures - Flowing particles that merge and separate
function ConvergingCulturesEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const count = 2000

  useEffect(() => {
    if (!particlesRef.current) return

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    const color1 = new THREE.Color('#ff914d') // Orange
    const color2 = new THREE.Color('#00d4ff') // Azure
    const color3 = new THREE.Color('#0099ff') // Bright Blue

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Start from clusters
      const cluster = Math.floor(i / (count / 3))
      const angle = (i % (count / 3)) / (count / 3) * Math.PI * 2
      const radius = 5 + Math.random() * 5
      
      positions[i3] = Math.cos(angle + cluster * Math.PI * 2 / 3) * radius + (Math.random() - 0.5) * 3
      positions[i3 + 1] = Math.sin(angle + cluster * Math.PI * 2 / 3) * radius + (Math.random() - 0.5) * 3
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Colors based on cluster
      const color = cluster === 0 ? color1 : cluster === 1 ? color2 : color3
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Velocities towards center
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01
    }

    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    velocitiesRef.current = velocities
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !groupRef.current || !velocitiesRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.rotation.y = time * 0.1
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Flow towards center, then back out
      const flowSpeed = Math.sin(time * 0.3) * 0.02
      positions[i3] += velocities[i3] + (positions[i3] * -flowSpeed)
      positions[i3 + 1] += velocities[i3 + 1] + (positions[i3 + 1] * -flowSpeed)
      positions[i3 + 2] += velocities[i3 + 2] + (positions[i3 + 2] * -flowSpeed)
      
      // Mouse influence
      positions[i3] += mousePosition.x * 0.05
      positions[i3 + 1] -= mousePosition.y * 0.05
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// OPTION 3: Harmonic Orbits - Spheres orbiting in harmony
function HarmonicOrbitsEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const orbitCount = 12

  const orbits = useMemo(() => {
    return Array.from({ length: orbitCount }).map((_, i) => ({
      radius: 2 + (i * 0.8),
      speed: 0.3 + (i * 0.05),
      phase: (i / orbitCount) * Math.PI * 2,
      color: i % 3 === 0 ? '#ff914d' : i % 3 === 1 ? '#00d4ff' : '#0099ff',
      tilt: (i / orbitCount) * Math.PI * 0.5
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.05
    groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.1 + mousePosition.y * 0.1
    groupRef.current.rotation.z = mousePosition.x * 0.1
  })

  return (
    <group ref={groupRef}>
      {orbits.map((orbit, i) => (
        <OrbitRing
          key={i}
          radius={orbit.radius}
          speed={orbit.speed}
          phase={orbit.phase}
          color={orbit.color}
          tilt={orbit.tilt}
          mousePosition={mousePosition}
        />
      ))}
    </group>
  )
}

function OrbitRing({ 
  radius, 
  speed, 
  phase, 
  color, 
  tilt,
  mousePosition 
}: { 
  radius: number
  speed: number
  phase: number
  color: string
  tilt: number
  mousePosition: { x: number, y: number }
}) {
  const ringRef = useRef<THREE.Group>(null)
  const spheresRef = useRef<THREE.Mesh[]>([])
  const sphereCount = 8

  useFrame((state) => {
    if (!ringRef.current) return
    const time = state.clock.getElapsedTime()
    
    ringRef.current.rotation.y = time * speed + phase
    ringRef.current.rotation.x = tilt
    
    spheresRef.current.forEach((sphere, i) => {
      if (!sphere) return
      const angle = (i / sphereCount) * Math.PI * 2
      const x = Math.cos(angle + time * speed + phase) * radius
      const y = Math.sin(angle + time * speed + phase) * radius * Math.cos(tilt)
      const z = Math.sin(angle + time * speed + phase) * radius * Math.sin(tilt)
      
      sphere.position.x = x + mousePosition.x * 0.3
      sphere.position.y = y - mousePosition.y * 0.3
      sphere.position.z = z
    })
  })

  return (
    <group ref={ringRef}>
      {Array.from({ length: sphereCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) spheresRef.current[i] = el }}
        >
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

// OPTION 4: Cultural Bridges - Arches connecting different cultural spaces
function CulturalBridgesEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const bridgeCount = 8

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.rotation.y = time * 0.08
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const angle = (i / bridgeCount) * Math.PI * 2
        const radius = 6
        child.position.x = Math.cos(angle + time * 0.1) * radius + mousePosition.x * 0.3
        child.position.y = Math.sin(angle + time * 0.1) * radius * 0.5 - mousePosition.y * 0.3
        child.rotation.z = angle + time * 0.1
      }
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: bridgeCount }).map((_, i) => {
        const angle = (i / bridgeCount) * Math.PI * 2
        const color = i % 3 === 0 ? '#ff914d' : i % 3 === 1 ? '#00d4ff' : '#0099ff'
        
        return (
          <mesh key={i} position={[Math.cos(angle) * 6, Math.sin(angle) * 3, -8]}>
            <torusGeometry args={[2, 0.15, 16, 50]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// OPTION 5: Interwoven Threads - Threads weaving together different cultures
function InterwovenThreadsEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const threadCount = 12

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.rotation.y = time * 0.1
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const wave = Math.sin(time * 0.5 + i * 0.5) * 0.3
        child.position.y = wave + mousePosition.y * 0.2
        child.rotation.z = Math.sin(time * 0.3 + i) * 0.2
      }
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: threadCount }).map((_, i) => {
        const angle = (i / threadCount) * Math.PI * 2
        const color = i % 3 === 0 ? '#ff914d' : i % 3 === 1 ? '#00d4ff' : '#0099ff'
        
        return (
          <mesh key={i} position={[0, (i - threadCount / 2) * 1.5, -8]}>
            <cylinderGeometry args={[0.1, 0.1, 15, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.9}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// OPTION 6: Layered Understanding - Transparent layers representing depth of cultural understanding
function LayeredUnderstandingEffect({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const layerCount = 10

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    groupRef.current.rotation.y = time * 0.05
    
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const depth = -5 - (i * 1.2)
        child.position.z = depth + Math.sin(time * 0.2 + i) * 0.5
        child.rotation.z = (time * 0.1 + i) * 0.1 + mousePosition.x * 0.1
      }
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: layerCount }).map((_, i) => {
        const colorIndex = i % 3
        const color = colorIndex === 0 ? '#ff914d' : colorIndex === 1 ? '#00d4ff' : '#0099ff'
        const opacity = 0.15 + (i / layerCount) * 0.2
        
        return (
          <mesh key={i} position={[0, 0, -5 - (i * 1.2)]}>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              transparent
              opacity={opacity}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Scene wrapper
function Scene({ 
  effectType, 
  mousePosition 
}: { 
  effectType: 'networks' | 'converging' | 'harmonic' | 'bridges' | 'threads' | 'layers'
  mousePosition: { x: number, y: number }
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.0002
  })

  const renderEffect = () => {
    switch (effectType) {
      case 'networks':
        return <CulturalNetworksEffect mousePosition={mousePosition} />
      case 'converging':
        return <ConvergingCulturesEffect mousePosition={mousePosition} />
      case 'harmonic':
        return <HarmonicOrbitsEffect mousePosition={mousePosition} />
      case 'bridges':
        return <CulturalBridgesEffect mousePosition={mousePosition} />
      case 'threads':
        return <InterwovenThreadsEffect mousePosition={mousePosition} />
      case 'layers':
        return <LayeredUnderstandingEffect mousePosition={mousePosition} />
      default:
        return <CulturalNetworksEffect mousePosition={mousePosition} />
    }
  }

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" distance={50} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff914d" distance={50} />
      <pointLight position={[0, 10, -10]} intensity={1.5} color="#0099ff" distance={50} />
      <hemisphereLight args={['#00d4ff', '#01011e', 0.7]} />
      {renderEffect()}
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

interface EffectOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  concept: string
  whyItWorks: string
}

const effectOptions: EffectOption[] = [
  {
    id: 'networks',
    name: 'Cultural Networks',
    description: 'Connected nodes representing people and cross-cultural connections',
    icon: <Network className="w-6 h-6" />,
    concept: 'Visualizes the interconnected web of relationships, showing how individuals from different cultures connect and form meaningful bonds. Each node represents a person, and the lines show cultural bridges being built.',
    whyItWorks: 'Perfect for representing cultural intelligence as it emphasizes connection, networking, and the beautiful complexity of intercultural relationships.'
  },
  {
    id: 'converging',
    name: 'Converging Cultures',
    description: 'Flowing particles that merge, separate, and blend together',
    icon: <Globe className="w-6 h-6" />,
    concept: 'Represents different cultures flowing together, merging, and creating something new. Particles start from distinct clusters (representing different cultures) and converge in harmony, then flow outward again.',
    whyItWorks: 'Metaphorically shows how understanding cultures means seeing them blend and merge while maintaining their unique identity - core to cultural intelligence.'
  },
  {
    id: 'harmonic',
    name: 'Harmonic Orbits',
    description: 'Spheres orbiting in perfect harmony, each in their own rhythm',
    icon: <Users className="w-6 h-6" />,
    concept: 'Multiple orbital rings with spheres moving in synchronized harmony. Each ring represents a different cultural perspective, all coexisting peacefully and beautifully together.',
    whyItWorks: 'Shows how different cultures can coexist harmoniously while maintaining their own rhythm and identity - essential concept in cultural intelligence training.'
  },
  {
    id: 'bridges',
    name: 'Cultural Bridges',
    description: 'Arches connecting different cultural spaces and communities',
    icon: <Link2 className="w-6 h-6" />,
    concept: 'Torus arches forming bridges between distinct spaces. Each bridge represents a connection point where cultures meet, exchange ideas, and build understanding. The arches span gaps, creating pathways for communication.',
    whyItWorks: 'Bridges are powerful symbols of connection and understanding. This effect visually represents how cultural intelligence helps build bridges between different communities, enabling meaningful exchange and collaboration.'
  },
  {
    id: 'threads',
    name: 'Interwoven Threads',
    description: 'Threads weaving together to create a unified cultural fabric',
    icon: <GitBranch className="w-6 h-6" />,
    concept: 'Vertical threads representing different cultural elements that weave together, creating a beautiful tapestry. Each thread maintains its color and identity while contributing to a larger, unified pattern.',
    whyItWorks: 'Represents how individual cultural elements can be woven together to create something greater. This metaphor emphasizes that cultural intelligence involves understanding how different threads contribute to the whole fabric of society.'
  },
  {
    id: 'layers',
    name: 'Layered Understanding',
    description: 'Transparent layers representing depth of cultural understanding',
    icon: <Layers className="w-6 h-6" />,
    concept: 'Multiple transparent planes stacked to create depth. Each layer represents a different level of cultural understanding - from surface awareness to deep comprehension. As layers accumulate, understanding becomes richer and more nuanced.',
    whyItWorks: 'Shows that cultural intelligence is not a single skill but a layered understanding that deepens over time. Each layer adds complexity and richness, representing the journey from basic awareness to profound cultural mastery.'
  }
]

export function WebGLEffectSelector() {
  const [selectedEffect, setSelectedEffect] = useState<'networks' | 'converging' | 'harmonic' | 'bridges' | 'threads' | 'layers'>('networks')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 4, damping: 100 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 4, damping: 100 })

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

  const currentOption = effectOptions.find(opt => opt.id === selectedEffect)

  return (
    <div className="relative w-full min-h-[200vh] bg-primary-dark">
      {/* WebGL Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          camera={{ position: [0, 0, 20], fov: 75 }}
        >
          <Scene effectType={selectedEffect} mousePosition={mousePosition} />
          <fog attach="fog" args={['#01011e', 30, 60]} />
        </Canvas>
      </div>

      {/* Effect Selector UI - Expanded with more vertical space */}
      <div className="relative z-10 flex flex-col items-start justify-start px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-96">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto w-full"
          style={{ minHeight: '100vh', paddingBottom: '400px' }}
        >
          <div className="glass-card p-6 md:p-8 backdrop-blur-[20px] mb-8 bg-white/5 border border-white/10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-azure-blue/10 to-orange/10 border border-azure-blue/30 rounded-full mb-1.5 backdrop-blur-sm"
            >
              <Sparkles className="w-2 h-2 text-azure-blue" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest">Choose Your Effect</span>
              <Sparkles className="w-2 h-2 text-orange" />
            </motion.div>

            <h1 className="text-lg md:text-xl font-black mb-1 text-gradient-primary text-center">
              WebGL Effect Options
            </h1>
            <p className="text-[10px] md:text-xs text-white/80 mb-2 text-center max-w-md mx-auto">
              Select the perfect visual metaphor for cultural intelligence
            </p>

            {/* Effect Cards - 6 options in 2 rows */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {effectOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedEffect(option.id as any)}
                  className={`glass-card p-2 backdrop-blur-[15px] border-2 transition-all duration-300 text-left relative bg-white/5 ${
                    selectedEffect === option.id
                      ? 'border-azure-blue bg-azure-blue/15 shadow-glow-azure'
                      : 'border-glass-border bg-white/3 hover:border-azure-blue/50 hover:bg-white/8'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-azure-blue/20 to-orange/20 flex items-center justify-center mb-1 ${
                    selectedEffect === option.id ? 'ring-2 ring-azure-blue' : ''
                  }`}>
                    <div className="scale-[0.6]">{option.icon}</div>
                  </div>
                  <h3 className={`text-xs font-bold mb-0.5 ${
                    selectedEffect === option.id ? 'text-azure-blue' : 'text-white'
                  }`}>
                    {option.name}
                  </h3>
                  <p className="text-[10px] text-white/70 mb-1 leading-tight">
                    {option.description}
                  </p>
                  {selectedEffect === option.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-1.5 pt-1.5 border-t border-white/10"
                    >
                      <p className="text-[9px] text-white/60 mb-0.5 font-semibold uppercase">Concept:</p>
                      <p className="text-[9px] text-white/80 leading-tight mb-1.5">{option.concept}</p>
                      <p className="text-[9px] text-white/60 mb-0.5 font-semibold uppercase">Why It Works:</p>
                      <p className="text-[9px] text-white/80 leading-tight">{option.whyItWorks}</p>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Preview Info */}
            {currentOption && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-2 backdrop-blur-[15px] border border-azure-blue/30 bg-white/5"
              >
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-azure-blue/20 to-orange/20 flex items-center justify-center">
                    <div className="scale-[0.6]">{currentOption.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-white mb-0.5">{currentOption.name}</h3>
                    <p className="text-[9px] text-white/60">Currently Previewing</p>
                  </div>
                </div>
                <p className="text-[9px] text-white/80 leading-tight">
                  {currentOption.concept}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

