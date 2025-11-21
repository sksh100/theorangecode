'use client'

import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface ConvergingCulturesSceneProps {
  mousePosition: { x: number, y: number }
  scrollProgress?: number
}

export function ConvergingCulturesScene({ mousePosition, scrollProgress = 0 }: ConvergingCulturesSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const count = 3000

  useEffect(() => {
    if (!particlesRef.current) return

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    // Use vibrant, saturated colors - convert to HSL, increase saturation, convert back
    const color1 = new THREE.Color('#ff914d') // Orange
    const color2 = new THREE.Color('#00d4ff') // Azure
    const color3 = new THREE.Color('#0099ff') // Bright Blue
    
    // Increase saturation by converting to HSL and adjusting
    const hsl1 = { h: 0, s: 0, l: 0 }
    const hsl2 = { h: 0, s: 0, l: 0 }
    const hsl3 = { h: 0, s: 0, l: 0 }
    
    color1.getHSL(hsl1)
    color2.getHSL(hsl2)
    color3.getHSL(hsl3)
    
    hsl1.s = Math.min(1, hsl1.s * 1.3)
    hsl2.s = Math.min(1, hsl2.s * 1.3)
    hsl3.s = Math.min(1, hsl3.s * 1.3)
    
    color1.setHSL(hsl1.h, hsl1.s, hsl1.l)
    color2.setHSL(hsl2.h, hsl2.s, hsl2.l)
    color3.setHSL(hsl3.h, hsl3.s, hsl3.l)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Distribute particles more evenly in a sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 3 + Math.random() * 12
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Randomly assign colors for better mixing - ensure even distribution
      const colorChoice = Math.floor(Math.random() * 3)
      const color = colorChoice === 0 ? color1 : colorChoice === 1 ? color2 : color3
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
    
    groupRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI * 2
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Flow towards center, then back out - affected by scroll
      const flowSpeed = Math.sin(time * 0.25 + scrollProgress * 2) * 0.015
      positions[i3] += velocities[i3] + (positions[i3] * -flowSpeed)
      positions[i3 + 1] += velocities[i3 + 1] + (positions[i3 + 1] * -flowSpeed)
      positions[i3 + 2] += velocities[i3 + 2] + (positions[i3 + 2] * -flowSpeed)
      
      // Mouse influence - subtle
      positions[i3] += mousePosition.x * 0.08
      positions[i3 + 1] -= mousePosition.y * 0.08
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.8}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export function ConvergingCulturesCanvas({ mousePosition, scrollProgress }: { mousePosition: { x: number, y: number }, scrollProgress: number }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        camera={{ position: [0, 0, 20], fov: 75 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" distance={50} />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#ff914d" distance={50} />
        <pointLight position={[0, 10, -10]} intensity={1} color="#0099ff" distance={50} />
        <hemisphereLight args={['#01011e', '#01011e', 0.1]} />
        <ConvergingCulturesScene mousePosition={mousePosition} scrollProgress={scrollProgress} />
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
      </Canvas>
    </Suspense>
  )
}

