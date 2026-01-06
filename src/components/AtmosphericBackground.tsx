'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AtmosphericBackgroundProps {
  mousePosition: { x: number, y: number }
  scrollProgress?: number
}

interface OrbData {
  basePosition: THREE.Vector3
  speed: number
  color: THREE.Color
  size: number
}

function FloatingOrb({ orbData, mousePosition, index }: { orbData: OrbData, mousePosition: { x: number, y: number }, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    const time = state.clock.getElapsedTime()
    const { basePosition, speed } = orbData
    
    // Floating animation from base position
    meshRef.current.position.y = basePosition.y + Math.sin(time * speed + index) * 0.5
    
    // Mouse influence - subtle parallax effect (relative to base)
    meshRef.current.position.x = basePosition.x + mousePosition.x * 2
    meshRef.current.position.z = basePosition.z + mousePosition.y * 2
    
    // Gentle pulsing opacity
    materialRef.current.opacity = 0.15 + Math.sin(time * 0.4 + index * 0.5) * 0.08
  })

  return (
    <mesh ref={meshRef} position={orbData.basePosition}>
      <sphereGeometry args={[orbData.size, 32, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        color={orbData.color}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FlowingOrbs({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)

  // Brand colors
  const colors = useMemo(() => [
    new THREE.Color('#ff914d'), // Orange
    new THREE.Color('#00d4ff'), // Azure
    new THREE.Color('#0099ff'), // Bright Blue
  ], [])

  // Create orb data
  const orbs = useMemo(() => {
    const orbData: OrbData[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 20 + Math.random() * 15
      const basePosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 20,
        Math.sin(angle) * radius - 25
      )
      
      orbData.push({
        basePosition,
        speed: 0.3 + Math.random() * 0.3,
        color: colors[i % colors.length].clone(),
        size: 6 + Math.random() * 5
      })
    }
    return orbData
  }, [colors])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.02
  })

  return (
    <group ref={groupRef}>
      {orbs.map((orbData, i) => (
        <FloatingOrb key={i} orbData={orbData} mousePosition={mousePosition} index={i} />
      ))}
    </group>
  )
}


export function AtmosphericBackground({ mousePosition, scrollProgress = 0 }: AtmosphericBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        camera={{ position: [0, 0, 30], fov: 75 }}
      >
        <FlowingOrbs mousePosition={mousePosition} />
        <ambientLight intensity={0.3} />
      </Canvas>
    </Suspense>
  )
}

