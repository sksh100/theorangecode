'use client'

import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AtmosphericBackgroundProps {
  mousePosition: { x: number, y: number }
  scrollProgress?: number
}

interface OrbData {
  mesh: THREE.Mesh
  basePosition: THREE.Vector3
  speed: number
}

function FlowingOrbs({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const orbs = useRef<OrbData[]>([])

  // Brand colors
  const colors = [
    new THREE.Color('#ff914d'), // Orange
    new THREE.Color('#00d4ff'), // Azure
    new THREE.Color('#0099ff'), // Bright Blue
  ]

  useEffect(() => {
    // Create 8 large glowing orbs for atmospheric background
    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(6 + Math.random() * 5, 32, 32),
        new THREE.MeshBasicMaterial({
          color: colors[i % colors.length],
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide
        })
      )
      
      const angle = (i / 8) * Math.PI * 2
      const radius = 20 + Math.random() * 15
      const basePosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 20,
        Math.sin(angle) * radius - 25
      )
      
      orb.position.copy(basePosition)
      
      orbs.current.push({
        mesh: orb,
        basePosition: basePosition.clone(),
        speed: 0.3 + Math.random() * 0.3
      })
      
      if (groupRef.current) {
        groupRef.current.add(orb)
      }
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.02
    
    // Animate orbs - floating motion
    orbs.current.forEach((orbData, i) => {
      const { mesh, basePosition, speed } = orbData
      
      // Floating animation from base position
      mesh.position.y = basePosition.y + Math.sin(time * speed + i) * 0.5
      
      // Mouse influence - subtle parallax effect (relative to base)
      mesh.position.x = basePosition.x + mousePosition.x * 2
      mesh.position.z = basePosition.z + mousePosition.y * 2
      
      // Gentle pulsing opacity
      const material = mesh.material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 0.4 + i * 0.5) * 0.08
    })
  })

  return <group ref={groupRef} />
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

