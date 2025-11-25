'use client'

// WebGL 3D network visualization for cultural intelligence theme
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface Node {
  position: [number, number, number]
  id: number
}

interface Connection {
  from: Node
  to: Node
}

// Generate nodes in a network pattern - smaller radius
function generateNetworkNodes(count: number, radius: number): Node[] {
  const nodes: Node[] = []
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2
    const phi = Math.acos((2 * i) / count - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    nodes.push({ position: [x, y, z], id: i })
  }
  return nodes
}

// Generate connections between nearby nodes
function generateConnections(nodes: Node[], maxDistance: number): Connection[] {
  const connections: Connection[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const [x1, y1, z1] = nodes[i].position
      const [x2, y2, z2] = nodes[j].position
      const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
      )
      if (distance < maxDistance) {
        connections.push({ from: nodes[i], to: nodes[j] })
      }
    }
  }
  return connections
}

// Animated sphere component - smaller spheres
function AnimatedSphere({ position, color, index }: { position: [number, number, number]; color: string; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const basePosition = useRef(new THREE.Vector3(...position))
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      // Subtle floating animation
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.08
      meshRef.current.position.y = basePosition.current.y + floatOffset
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.03, 10, 10]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={0.7}
      />
    </Sphere>
  )
}

// Connection line component
function ConnectionLine({ from, to, color }: { from: Node; to: Node; color: string }) {
  const points = useMemo(
    () => [
      new THREE.Vector3(...from.position),
      new THREE.Vector3(...to.position),
    ],
    [from, to]
  )

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2.5}
      opacity={0.5}
      transparent
    />
  )
}

// Main network component
function CulturalNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => generateNetworkNodes(6, 0.3), [])
  const connections = useMemo(() => generateConnections(nodes, 0.6), [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Orange spheres */}
      {nodes.slice(0, Math.floor(nodes.length / 2)).map((node) => (
        <AnimatedSphere
          key={`orange-${node.id}`}
          position={node.position}
          color="#ff914d"
          index={node.id}
        />
      ))}
      
      {/* Azure blue spheres */}
      {nodes.slice(Math.floor(nodes.length / 2)).map((node) => (
        <AnimatedSphere
          key={`azure-${node.id}`}
          position={node.position}
          color="#00d4ff"
          index={node.id}
        />
      ))}
      
      {/* Connection lines */}
      {connections.map((conn, index) => {
        const isOrangeConnection = conn.from.id < nodes.length / 2 || conn.to.id < nodes.length / 2
        return (
          <ConnectionLine
            key={`conn-${index}`}
            from={conn.from}
            to={conn.to}
            color={isOrangeConnection ? '#ff914d' : '#00d4ff'}
          />
        )
      })}
    </group>
  )
}

export function CulturalIntelligenceNetwork() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
      <div className="absolute inset-0 w-full h-full">
        {isMounted ? (
          <Canvas
            camera={{ position: [0, 0, 2.5], fov: 30 }}
            gl={{ 
              alpha: true, 
              antialias: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: true
            }}
            style={{ background: 'transparent' }}
            dpr={[1, 1]}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[4, 4, 4]} intensity={0.5} />
            <pointLight position={[-4, -4, -4]} intensity={0.3} color="#00d4ff" />
            <pointLight position={[4, -4, 4]} intensity={0.3} color="#ff914d" />
            <CulturalNetwork />
          </Canvas>
        ) : (
          <div className="absolute inset-0 w-full h-full" />
        )}
      </div>
    </div>
  )
}

