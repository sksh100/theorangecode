'use client'

import { useEffect, useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface CulturalIntelligenceSceneProps {
  mousePosition: { x: number, y: number }
  scrollProgress?: number
}

interface Node {
  position: THREE.Vector3
  color: THREE.Color
  target: THREE.Vector3
  speed: number
}

function NodeSphere({ node, index, nodesRef }: { node: Node, index: number, nodesRef: React.MutableRefObject<Node[]> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current && nodesRef.current[index]) {
      meshRef.current.position.copy(nodesRef.current[index].position)
    }
  })
  
  return (
    <mesh ref={meshRef} position={node.position}>
      <sphereGeometry args={[0.25, 16, 16]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={1.2}
        toneMapped={false}
      />
    </mesh>
  )
}

export function CulturalIntelligenceScene({ mousePosition, scrollProgress = 0 }: CulturalIntelligenceSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const nodes = useRef<Node[]>([])
  const connections = useRef<number[][]>([])
  const nodeCount = 60

  // Brand colors
  const colors = useMemo(() => [
    new THREE.Color('#ff914d'), // Orange
    new THREE.Color('#00d4ff'), // Azure
    new THREE.Color('#0099ff'), // Bright Blue
  ], [])

  // Initialize nodes - representing different cultures
  const initialNodes = useMemo(() => {
    const nodeArray: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 8 + Math.random() * 6
      const height = (Math.random() - 0.5) * 10
      
      nodeArray.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        color: colors[Math.floor(Math.random() * colors.length)].clone(),
        target: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        speed: 0.3 + Math.random() * 0.4
      })
    }
    nodes.current = nodeArray
    return nodeArray
  }, [colors])

  useEffect(() => {

    // Create connections between nearby nodes
    connections.current = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodes.current[i].position.distanceTo(nodes.current[j].position)
        if (distance < 8 && Math.random() > 0.7) {
          connections.current.push([i, j])
        }
      }
    }


    // Update line geometry
    if (linesRef.current && connections.current.length > 0) {
      const positions = new Float32Array(connections.current.length * 2 * 3)
      const lineColors = new Float32Array(connections.current.length * 2 * 3)
      
      connections.current.forEach(([i, j], idx) => {
        const node1 = nodes.current[i]
        const node2 = nodes.current[j]
        const baseIdx = idx * 6
        
        // Start point
        positions[baseIdx] = node1.position.x
        positions[baseIdx + 1] = node1.position.y
        positions[baseIdx + 2] = node1.position.z
        
        // End point
        positions[baseIdx + 3] = node2.position.x
        positions[baseIdx + 4] = node2.position.y
        positions[baseIdx + 5] = node2.position.z
        
        // Interpolate colors for the line
        const color1 = node1.color
        const color2 = node2.color
        const midColor = new THREE.Color().lerpColors(color1, color2, 0.5)
        
        // Start color
        lineColors[baseIdx] = color1.r
        lineColors[baseIdx + 1] = color1.g
        lineColors[baseIdx + 2] = color1.b
        
        // End color
        lineColors[baseIdx + 3] = color2.r
        lineColors[baseIdx + 4] = color2.g
        lineColors[baseIdx + 5] = color2.b
      })
      
      linesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      linesRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    }
  }, [])

  useFrame((state) => {
    if (!linesRef.current || !groupRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Rotate the entire scene slowly
    groupRef.current.rotation.y = time * 0.05 + scrollProgress * Math.PI * 2
    
    // Animate nodes - gentle floating motion
    nodes.current.forEach((node, i) => {
      // Update target position with organic motion
      node.target.x = node.position.x + Math.sin(time * node.speed + i) * 0.5
      node.target.y = node.position.y + Math.cos(time * node.speed * 0.7 + i) * 0.5
      node.target.z = node.position.z + Math.sin(time * node.speed * 0.5 + i * 0.3) * 0.5
      
      // Mouse influence
      node.target.x += mousePosition.x * 2
      node.target.y -= mousePosition.y * 2
      
      // Smooth interpolation
      node.position.lerp(node.target, 0.05)
    })

    // Update line positions
    if (connections.current.length > 0 && linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array as Float32Array
      connections.current.forEach(([i, j], idx) => {
        const node1 = nodes.current[i]
        const node2 = nodes.current[j]
        const baseIdx = idx * 6
        
        positions[baseIdx] = node1.position.x
        positions[baseIdx + 1] = node1.position.y
        positions[baseIdx + 2] = node1.position.z
        positions[baseIdx + 3] = node2.position.x
        positions[baseIdx + 4] = node2.position.y
        positions[baseIdx + 5] = node2.position.z
      })
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          linewidth={2}
        />
      </lineSegments>
      
      {/* Nodes - individual spheres for better color control */}
      {initialNodes.map((node, i) => (
        <NodeSphere key={i} node={node} index={i} nodesRef={nodes} />
      ))}
    </group>
  )
}

export function CulturalIntelligenceCanvas({ mousePosition, scrollProgress }: { mousePosition: { x: number, y: number }, scrollProgress: number }) {
  return (
    <Suspense fallback={null}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        camera={{ position: [0, 0, 25], fov: 60 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#00d4ff" distance={50} />
        <pointLight position={[-15, -15, 15]} intensity={2} color="#ff914d" distance={50} />
        <pointLight position={[0, 15, -15]} intensity={1.5} color="#0099ff" distance={50} />
        <CulturalIntelligenceScene mousePosition={mousePosition} scrollProgress={scrollProgress} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </Suspense>
  )
}

