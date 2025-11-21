'use client'

import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Hero3DEffectProps {
  mousePosition: { x: number, y: number }
}

interface ShapeData {
  type: 'sphere'
  basePosition: THREE.Vector3
  rotation: THREE.Euler
  color: THREE.Color
  scale: number
  speed: number
}

function FloatingShape({ shape, mousePosition }: { shape: ShapeData, mousePosition: { x: number, y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialRotation = useRef(new THREE.Euler(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  ))
  const currentPosition = useRef(new THREE.Vector3(
    shape.basePosition.x,
    shape.basePosition.y,
    shape.basePosition.z
  ))
  const targetPosition = useRef(new THREE.Vector3(
    shape.basePosition.x,
    shape.basePosition.y,
    shape.basePosition.z
  ))

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const delta = state.clock.getDelta()
    
    // Smooth rotation - slower
    meshRef.current.rotation.x = initialRotation.current.x + time * shape.speed * 0.1 + mousePosition.y * 0.1
    meshRef.current.rotation.y = initialRotation.current.y + time * shape.speed * 0.15 + mousePosition.x * 0.1
    meshRef.current.rotation.z = initialRotation.current.z + time * shape.speed * 0.08
    
    // Calculate target position smoothly
    const floatOffset = Math.sin(time * shape.speed * 0.5 + shape.basePosition.x) * 0.2
    targetPosition.current.set(
      shape.basePosition.x + mousePosition.x * 1,
      shape.basePosition.y + floatOffset,
      shape.basePosition.z + mousePosition.y * 1
    )
    
    // Smooth interpolation to target position (lerp factor of 0.1 for smooth movement)
    currentPosition.current.lerp(targetPosition.current, 0.1)
    meshRef.current.position.copy(currentPosition.current)
  })

  // Clamp scale to prevent spheres from becoming too large
  const clampedScale = Math.min(shape.scale * 0.6, 0.35)
  const geometry = <sphereGeometry args={[clampedScale, 32, 32]} />

  return (
    <mesh ref={meshRef} position={shape.basePosition} rotation={initialRotation.current} castShadow receiveShadow>
      {geometry}
      <meshStandardMaterial
        color={shape.color}
        emissive={shape.color}
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
        transparent={false}
        opacity={1}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function Hero3DScene({ mousePosition }: Hero3DEffectProps) {
  const groupRef = useRef<THREE.Group>(null)
  const shapes = useRef<ShapeData[]>([])

  // Brand colors
  const colors = [
    new THREE.Color('#ff914d'), // Orange
    new THREE.Color('#00d4ff'), // Azure
    new THREE.Color('#0099ff'), // Bright Blue
  ]

  // Initialize shapes
  useEffect(() => {
    shapes.current = []
    const shapeCount = 12
    
    for (let i = 0; i < shapeCount; i++) {
      const angle = (i / shapeCount) * Math.PI * 2
      const radius = 4 + Math.random() * 3
      const height = (Math.random() - 0.5) * 4
      
      // All shapes are spheres now
      const type = 'sphere'
      // Better color mixing - distribute colors evenly
      // Use modulo to ensure even distribution: orange ~33%, azure ~33%, blue ~33%
      const colorIndex = i % 3
      const color = colors[colorIndex].clone()
      
      shapes.current.push({
        type,
        basePosition: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius - 8
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        color,
        scale: 0.25 + Math.random() * 0.15, // Smaller scale range: 0.25-0.4 (max size reduced)
        speed: 0.2 + Math.random() * 0.2 // Slower speed
      })
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle rotation of the entire group - slower
    groupRef.current.rotation.y = time * 0.03
  })

  return (
    <group ref={groupRef}>
      {shapes.current.map((shape, i) => (
        <FloatingShape key={i} shape={shape} mousePosition={mousePosition} />
      ))}
      
      {/* Enhanced lighting for better 3D depth and highlights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[8, 8, 8]} intensity={3} color="#00d4ff" distance={30} />
      <pointLight position={[-8, -8, 8]} intensity={3} color="#ff914d" distance={30} />
      <pointLight position={[0, 10, -8]} intensity={2.5} color="#0099ff" distance={30} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
    </group>
  )
}

export function Hero3DEffect({ mousePosition }: Hero3DEffectProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 12], fov: 45 }}
          shadows
        >
          <Hero3DScene mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
    </div>
  )
}

