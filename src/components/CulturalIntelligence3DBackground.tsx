'use client'

import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CulturalIntelligence3DBackgroundProps {
  scrollY?: number
}

interface ShapeData {
  basePosition: THREE.Vector3
  rotation: THREE.Euler
  color: THREE.Color
  scale: number
  speed: number
}

function FloatingShape({ shape, scrollY = 0 }: { shape: ShapeData, scrollY?: number }) {
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

    // Smooth rotation
    meshRef.current.rotation.x = initialRotation.current.x + time * shape.speed * 0.08
    meshRef.current.rotation.y = initialRotation.current.y + time * shape.speed * 0.12
    meshRef.current.rotation.z = initialRotation.current.z + time * shape.speed * 0.06

    // Calculate target position with scroll effect
    const floatOffset = Math.sin(time * shape.speed * 0.4 + shape.basePosition.x) * 0.3
    const scrollOffset = scrollY * 0.1
    targetPosition.current.set(
      shape.basePosition.x,
      shape.basePosition.y + floatOffset + scrollOffset,
      shape.basePosition.z
    )

    // Smooth interpolation
    currentPosition.current.lerp(targetPosition.current, 0.08)
    meshRef.current.position.copy(currentPosition.current)
  })

  const clampedScale = Math.min(shape.scale * 0.5, 0.25)
  const geometry = <sphereGeometry args={[clampedScale, 24, 24]} />

  return (
    <mesh ref={meshRef} position={shape.basePosition} rotation={initialRotation.current}>
      {geometry}
      <meshStandardMaterial
        color={shape.color}
        emissive={shape.color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        transparent={true}
        opacity={0.6}
      />
    </mesh>
  )
}

function CulturalIntelligence3DScene({ scrollY }: CulturalIntelligence3DBackgroundProps) {
  const groupRef = useRef<THREE.Group>(null)
  const shapes = useRef<ShapeData[]>([])

  // Brand colors - more subtle for background
  const colors = [
    new THREE.Color('#ff914d'), // Orange
    new THREE.Color('#00d4ff'), // Azure
    new THREE.Color('#0099ff'), // Bright Blue
  ]

  // Initialize shapes - more spread out and subtle
  useEffect(() => {
    shapes.current = []
    const shapeCount = 8

    for (let i = 0; i < shapeCount; i++) {
      const angle = (i / shapeCount) * Math.PI * 2
      const radius = 6 + Math.random() * 4
      const height = (Math.random() - 0.5) * 8

      const colorIndex = i % 3
      const color = colors[colorIndex].clone()

      shapes.current.push({
        basePosition: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius - 10
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        color,
        scale: 0.2 + Math.random() * 0.15,
        speed: 0.08 + Math.random() * 0.12
      })
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.02
  })

  return (
    <group ref={groupRef}>
      {shapes.current.map((shape, i) => (
        <FloatingShape key={i} shape={shape} scrollY={scrollY} />
      ))}

      {/* Subtle lighting for background */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" distance={40} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff914d" distance={40} />
    </group>
  )
}

export function CulturalIntelligence3DBackground({ scrollY }: CulturalIntelligence3DBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
      <Suspense fallback={null}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [0, 0, 15], fov: 50 }}
        >
          <CulturalIntelligence3DScene scrollY={scrollY} />
        </Canvas>
      </Suspense>
    </div>
  )
}

