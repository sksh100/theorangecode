'use client'

import { useEffect, useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSceneProps {
  mousePosition: { x: number, y: number }
}

function ParticleScene({ mousePosition }: ParticleSceneProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const count = 2500 // Optimized particle count

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
      
      // Create clusters for more interesting distribution
      const cluster = Math.floor(i / (count / 3))
      const angle = (i % (count / 3)) / (count / 3) * Math.PI * 2
      const radius = 8 + Math.random() * 12
      
      positions[i3] = Math.cos(angle + cluster * Math.PI * 2 / 3) * radius + (Math.random() - 0.5) * 5
      positions[i3 + 1] = Math.sin(angle + cluster * Math.PI * 2 / 3) * radius + (Math.random() - 0.5) * 5
      positions[i3 + 2] = (Math.random() - 0.5) * 40

      // Colors based on cluster
      const color = cluster === 0 ? color1 : cluster === 1 ? color2 : color3
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Velocities with slight drift
      velocities[i3] = (Math.random() - 0.5) * 0.015
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.015
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015
    }

    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    velocitiesRef.current = velocities
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !velocitiesRef.current) return
    const time = state.clock.getElapsedTime()
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Flow motion - particles drift and flow
      const flowSpeed = Math.sin(time * 0.3) * 0.01
      positions[i3] += velocities[i3] + (positions[i3] * -flowSpeed * 0.1)
      positions[i3 + 1] += velocities[i3 + 1] + (positions[i3 + 1] * -flowSpeed * 0.1)
      positions[i3 + 2] += velocities[i3 + 2] + (positions[i3 + 2] * -flowSpeed * 0.1)
      
      // Boundary check - wrap around smoothly
      if (Math.abs(positions[i3]) > 30) {
        positions[i3] = -Math.sign(positions[i3]) * 30
      }
      if (Math.abs(positions[i3 + 1]) > 30) {
        positions[i3 + 1] = -Math.sign(positions[i3 + 1]) * 30
      }
      if (Math.abs(positions[i3 + 2]) > 30) {
        positions[i3 + 2] = -Math.sign(positions[i3 + 2]) * 30
      }
      
      // Mouse influence - interactive response
      const mouseInfluence = 0.08
      positions[i3] += mousePosition.x * mouseInfluence
      positions[i3 + 1] -= mousePosition.y * mouseInfluence
      
      // Subtle wave motion for organic feel
      positions[i3 + 1] += Math.sin(time * 0.4 + positions[i3] * 0.15) * 0.008
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.2}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
  )
}

export function ParticleBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 20], fov: 75 }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" distance={50} />
          <pointLight position={[-10, -10, 10]} intensity={1.5} color="#ff914d" distance={50} />
          <pointLight position={[0, 10, -10]} intensity={1} color="#0099ff" distance={50} />
          <ParticleScene mousePosition={mousePosition} />
          <fog attach="fog" args={['#01011e', 25, 50]} />
        </Canvas>
      </Suspense>
    </div>
  )
}

