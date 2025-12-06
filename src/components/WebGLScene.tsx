'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated particles in brand colors
function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 2000

  useEffect(() => {
    if (!pointsRef.current) return

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Brand colors: azure-blue #00d4ff, bright-blue #0099ff, orange #ff914d
    const color1 = new THREE.Color(0x00d4ff) // azure-blue
    const color2 = new THREE.Color(0x0099ff) // bright-blue
    const color3 = new THREE.Color(0xff914d) // orange

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Random positions in a large sphere
      const radius = 15 + Math.random() * 35
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Random colors from brand palette
      const colorChoice = Math.random()
      let color
      if (colorChoice < 0.33) color = color1
      else if (colorChoice < 0.66) color = color2
      else color = color3

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.1
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Floating geometric shapes with brand colors
function FloatingGeometry({ position, color, shape = 'box' }: { position: [number, number, number], color: string, shape?: 'box' | 'sphere' | 'torus' }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.5
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.8
  })

  const geometry = {
    box: <boxGeometry args={[1.2, 1.2, 1.2]} />,
    sphere: <sphereGeometry args={[0.8, 32, 32]} />,
    torus: <torusGeometry args={[0.7, 0.25, 16, 100]} />
  }

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry[shape]}
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

// Parallax-aware scene
function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    // Parallax rotation based on scroll
    const parallax = scrollRef.current * 0.0001
    groupRef.current.rotation.y += parallax * 0.1 + 0.002
  })

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main lights in brand colors */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" distance={50} />
      <pointLight position={[-10, -10, 10]} intensity={2} color="#ff914d" distance={50} />
      <pointLight position={[0, 10, -10]} intensity={1.8} color="#0099ff" distance={50} />
      
      {/* Hemisphere light for ambient glow */}
      <hemisphereLight args={['#00d4ff', '#01011e', 0.7]} />

      {/* Particles */}
      <Particles />

      {/* Floating geometries in brand colors */}
      <FloatingGeometry position={[-6, 3, -6]} color="#00d4ff" shape="sphere" />
      <FloatingGeometry position={[6, -3, -6]} color="#ff914d" shape="box" />
      <FloatingGeometry position={[0, 5, -9]} color="#0099ff" shape="torus" />
      <FloatingGeometry position={[-9, -4, -7]} color="#00d4ff" shape="sphere" />
      <FloatingGeometry position={[9, 4, -8]} color="#ff914d" shape="torus" />
      <FloatingGeometry position={[-4, -5, -5]} color="#0099ff" shape="box" />

      {/* Camera controls - interactive with mouse movement */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        enableRotate={true}
      />
    </group>
  )
}

export function WebGLScene() {
  return (
    <Canvas
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 0 }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <Scene />
      <Environment preset="night" />
      <fog attach="fog" args={['#01011e', 30, 60]} />
    </Canvas>
  )
}
