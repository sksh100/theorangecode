'use client'

import { useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CulturalIntelligenceBackgroundProps {
  mousePosition: { x: number, y: number }
}

interface NodeData {
  mesh: THREE.Mesh
  basePosition: THREE.Vector3
  speed: number
  color: THREE.Color
}

function CulturalNetwork({ mousePosition }: { mousePosition: { x: number, y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodesRef = useRef<NodeData[]>([])
  const linesRef = useRef<THREE.Line[]>([])

  // Cultural intelligence colors - representing diversity and connection
  const colors = [
    new THREE.Color('#ff914d'), // Orange - warmth
    new THREE.Color('#00d4ff'), // Azure - clarity
    new THREE.Color('#0099ff'), // Bright Blue - trust
  ]

  useEffect(() => {
    if (!groupRef.current) return

    // Create 12 interconnected nodes representing different cultures/people
    const nodeCount = 12
    const nodes: NodeData[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      // Distribute nodes in a circular pattern with some randomness
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 15 + Math.random() * 8
      const basePosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 12,
        Math.sin(angle) * radius - 20
      )

      const color = colors[i % colors.length]
      const geometry = new THREE.SphereGeometry(1.5 + Math.random() * 0.5, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      })

      const node = new THREE.Mesh(geometry, material)
      node.position.copy(basePosition)
      
      nodes.push({
        mesh: node,
        basePosition: basePosition.clone(),
        speed: 0.2 + Math.random() * 0.3,
        color: color
      })

      groupRef.current.add(node)
    }

    // Create connections between nodes - representing cultural bridges
    const connections: number[] = []
    const connectionColors: number[] = []

    // Connect each node to 2-3 other nodes (network effect)
    nodes.forEach((nodeData, i) => {
      const connectionsPerNode = 2 + Math.floor(Math.random() * 2)
      const connectedIndices = new Set<number>()
      
      for (let j = 0; j < connectionsPerNode; j++) {
        let targetIndex
        do {
          targetIndex = Math.floor(Math.random() * nodeCount)
        } while (targetIndex === i || connectedIndices.has(targetIndex))
        
        connectedIndices.add(targetIndex)
        const targetNode = nodes[targetIndex]
        
        // Add connection line positions
        connections.push(
          nodeData.basePosition.x, nodeData.basePosition.y, nodeData.basePosition.z,
          targetNode.basePosition.x, targetNode.basePosition.y, targetNode.basePosition.z
        )

        // Add colors for each vertex (start and end)
        const color1 = nodeData.color
        const color2 = targetNode.color
        connectionColors.push(color1.r, color1.g, color1.b)
        connectionColors.push(color2.r, color2.g, color2.b)
      }
    })

    const connectionGeometry = new THREE.BufferGeometry()
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
    connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3))
    
    // Create line material with colors
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    })

    const lines = new THREE.LineSegments(connectionGeometry, lineMaterial)
    groupRef.current.add(lines)
    linesRef.current.push(lines)
    nodesRef.current = nodes
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Gentle rotation of the entire network
    groupRef.current.rotation.y = time * 0.015
    
    // Animate nodes - floating and pulsing
    nodesRef.current.forEach((nodeData, i) => {
      const { mesh, basePosition, speed } = nodeData
      
      // Floating animation
      mesh.position.y = basePosition.y + Math.sin(time * speed + i) * 1.5
      mesh.position.x = basePosition.x + Math.cos(time * speed * 0.7 + i) * 0.8
      
      // Mouse parallax effect
      mesh.position.x += mousePosition.x * 1.5
      mesh.position.z += mousePosition.y * 1.5
      
      // Pulsing opacity and scale
      const material = mesh.material as THREE.MeshBasicMaterial
      const pulse = 0.3 + Math.sin(time * 0.5 + i) * 0.2
      material.opacity = pulse
      mesh.scale.setScalar(0.8 + Math.sin(time * 0.4 + i) * 0.3)
    })

    // Animate connection lines - subtle pulse
    linesRef.current.forEach((line) => {
      const material = line.material as THREE.LineBasicMaterial
      material.opacity = 0.2 + Math.sin(time * 0.3) * 0.15
    })
  })

  return <group ref={groupRef} />
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

