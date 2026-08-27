'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CulturalIntelligenceBackgroundProps {
  mousePosition: { x: number, y: number }
}

interface NodeData {
  basePosition: THREE.Vector3
  speed: number
  color: THREE.Color
  size: number
  connections: number[]
}

interface ConnectionData {
  start: THREE.Vector3
  end: THREE.Vector3
  color1: THREE.Color
  color2: THREE.Color
}

function NetworkNode({ nodeData, mousePosition, index }: { nodeData: NodeData, mousePosition: { x: number, y: number }, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    const time = state.clock.getElapsedTime()
    const { basePosition, speed } = nodeData
    
    // Floating animation
    meshRef.current.position.y = basePosition.y + Math.sin(time * speed + index) * 1.5
    meshRef.current.position.x = basePosition.x + Math.cos(time * speed * 0.7 + index) * 0.8
    
    // Mouse parallax effect
    meshRef.current.position.x += mousePosition.x * 1.5
    meshRef.current.position.z += mousePosition.y * 1.5
    
    // Pulsing opacity and scale
    const pulse = 0.3 + Math.sin(time * 0.5 + index) * 0.2
    materialRef.current.opacity = pulse
    meshRef.current.scale.setScalar(0.8 + Math.sin(time * 0.4 + index) * 0.3)
  })

  return (
    <mesh ref={meshRef} position={nodeData.basePosition}>
      <sphereGeometry args={[nodeData.size, 16, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color={nodeData.color}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ConnectionLine({ connectionData }: { connectionData: ConnectionData }) {
  const materialRef = useRef<THREE.LineBasicMaterial>(null)

  const points = useMemo(() => [
    connectionData.start,
    connectionData.end
  ], [connectionData])

  useFrame((state) => {
    if (!materialRef.current) return
    const time = state.clock.getElapsedTime()
    materialRef.current.opacity = 0.2 + Math.sin(time * 0.3) * 0.15
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color="#00d4ff"
        transparent
        opacity={0.3}
      />
    </line>
  )
}

function CulturalNetwork({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)

  // Cultural intelligence colors - representing diversity and connection
  const colors = useMemo(() => [
    new THREE.Color('#ff914d'), // Orange - warmth
    new THREE.Color('#00d4ff'), // Azure - clarity
    new THREE.Color('#0099ff'), // Bright Blue - trust
  ], [])

  // Create node data
  const nodes = useMemo(() => {
    const nodeCount = 12
    const nodeData: NodeData[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 15 + Math.random() * 8
      const basePosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 12,
        Math.sin(angle) * radius - 20
      )

      nodeData.push({
        basePosition,
        speed: 0.2 + Math.random() * 0.3,
        color: colors[i % colors.length].clone(),
        size: 1.5 + Math.random() * 0.5,
        connections: []
      })
    }

    // Create connections
    nodeData.forEach((nodeData, i) => {
      const connectionsPerNode = 2 + Math.floor(Math.random() * 2)
      const connectedIndices = new Set<number>()
      
      for (let j = 0; j < connectionsPerNode; j++) {
        let targetIndex
        do {
          targetIndex = Math.floor(Math.random() * nodeCount)
        } while (targetIndex === i || connectedIndices.has(targetIndex))
        
        connectedIndices.add(targetIndex)
        nodeData.connections.push(targetIndex)
      }
    })

    return nodeData
  }, [colors])

  // Create connection data
  const connections = useMemo(() => {
    const connectionData: ConnectionData[] = []
    nodes.forEach((nodeData, i) => {
      nodeData.connections.forEach(targetIndex => {
        const targetNode = nodes[targetIndex]
        connectionData.push({
          start: nodeData.basePosition.clone(),
          end: targetNode.basePosition.clone(),
          color1: nodeData.color.clone(),
          color2: targetNode.color.clone()
        })
      })
    })
    return connectionData
  }, [nodes])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle rotation of the entire network
    groupRef.current.rotation.y = time * 0.015
  })

  return (
    <group ref={groupRef}>
      {nodes.map((nodeData, i) => (
        <NetworkNode key={i} nodeData={nodeData} mousePosition={mousePosition} index={i} />
      ))}
      {connections.map((connectionData, i) => (
        <ConnectionLine key={i} connectionData={connectionData} />
      ))}
    </group>
  )
}

export function CulturalIntelligenceBackground({ mousePosition }: CulturalIntelligenceBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        camera={{ position: [0, 0, 30], fov: 75 }}
      >
        <CulturalNetwork mousePosition={mousePosition} />
        <ambientLight intensity={0.4} />
      </Canvas>
    </Suspense>
  )
}

