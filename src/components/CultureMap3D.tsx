'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface Country {
  name: string
  x: number
  y: number
  region: 'western' | 'mediterranean' | 'asia'
}

export default function CultureMap3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    nodes: THREE.Mesh[]
    labels: HTMLElement[]
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Brand colors from tailwind.config.js
    const COLORS = {
      primaryDark: 0x01011e,
      orange: 0xff914d,
      azureBlue: 0x00d4ff,
      brightBlue: 0x0099ff,
      orangeLuminous: 0xffaa00,
      azureLuminous: 0x00ffff,
      white: 0xffffff
    }

    // Country data with regional grouping
    const COUNTRIES: Country[] = [
      // Western Europe and North America (orange cluster)
      { name: "Netherlands", x: -4.5, y: 1.5, region: 'western' },
      { name: "Germany", x: -4.0, y: 1.0, region: 'western' },
      { name: "Denmark", x: -3.5, y: 0.5, region: 'western' },
      { name: "US", x: 2.0, y: 1.5, region: 'western' },
      { name: "Canada", x: 2.0, y: 1.0, region: 'western' },
      { name: "UK", x: 1.5, y: 0.2, region: 'western' },
      
      // Mediterranean and Latin (bright blue cluster)
      { name: "Israel", x: -4.2, y: -0.3, region: 'mediterranean' },
      { name: "Russia", x: -3.8, y: -0.8, region: 'mediterranean' },
      { name: "Spain", x: -3.0, y: -1.4, region: 'mediterranean' },
      { name: "France", x: -2.5, y: -1.5, region: 'mediterranean' },
      { name: "Italy", x: -1.5, y: -2.0, region: 'mediterranean' },
      { name: "Brazil", x: 1.2, y: -0.5, region: 'mediterranean' },
      { name: "Argentina", x: 1.4, y: -0.7, region: 'mediterranean' },
      { name: "Mexico", x: 1.6, y: -0.9, region: 'mediterranean' },
      
      // Middle East and Asia (azure blue cluster)
      { name: "India", x: 3.5, y: -1.5, region: 'asia' },
      { name: "Saudi Arabia", x: 4.0, y: -1.3, region: 'asia' },
      { name: "Kenya", x: 3.0, y: -1.7, region: 'asia' },
      { name: "China", x: 3.5, y: -2.0, region: 'asia' },
      { name: "Thailand", x: 4.2, y: -2.2, region: 'asia' },
      { name: "Japan", x: 4.5, y: -2.5, region: 'asia' }
    ]

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(COLORS.primaryDark)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 15)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(COLORS.azureBlue, 1, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(COLORS.orange, 0.8, 100)
    pointLight2.position.set(-10, -10, 10)
    scene.add(pointLight2)

    // Create axes
    const axisLineMaterial = new THREE.LineBasicMaterial({ 
      color: COLORS.azureBlue, 
      transparent: true, 
      opacity: 0.3 
    })

    // Horizontal axis (Direct to Indirect)
    const horizontalPoints = [
      new THREE.Vector3(-5.5, 0, 0),
      new THREE.Vector3(5.5, 0, 0)
    ]
    const horizontalGeometry = new THREE.BufferGeometry().setFromPoints(horizontalPoints)
    const horizontalAxis = new THREE.Line(horizontalGeometry, axisLineMaterial)
    scene.add(horizontalAxis)

    // Vertical axis (Low-context to High-context)
    const verticalPoints = [
      new THREE.Vector3(0, -3, 0),
      new THREE.Vector3(0, 2.5, 0)
    ]
    const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints)
    const verticalAxis = new THREE.Line(verticalGeometry, axisLineMaterial)
    scene.add(verticalAxis)

    // Add subtle grid lines
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: COLORS.azureBlue, 
      transparent: true, 
      opacity: 0.08 
    })

    for (let i = -5; i <= 5; i++) {
      if (i !== 0) {
        // Vertical grid lines
        const vGridPoints = [
          new THREE.Vector3(i, -3, 0),
          new THREE.Vector3(i, 2.5, 0)
        ]
        const vGridGeometry = new THREE.BufferGeometry().setFromPoints(vGridPoints)
        const vGridLine = new THREE.Line(vGridGeometry, gridMaterial)
        scene.add(vGridLine)

        // Horizontal grid lines
        if (i >= -3 && i <= 2) {
          const hGridPoints = [
            new THREE.Vector3(-5.5, i, 0),
            new THREE.Vector3(5.5, i, 0)
          ]
          const hGridGeometry = new THREE.BufferGeometry().setFromPoints(hGridPoints)
          const hGridLine = new THREE.Line(hGridGeometry, gridMaterial)
          scene.add(hGridLine)
        }
      }
    }

    // Create country nodes
    const nodes: THREE.Mesh[] = []
    const nodeGeometry = new THREE.SphereGeometry(0.25, 32, 32)

    COUNTRIES.forEach((country) => {
      // Assign color based on region
      let nodeColor: number
      let emissiveColor: number
      
      if (country.region === 'western') {
        nodeColor = COLORS.orange
        emissiveColor = COLORS.orangeLuminous
      } else if (country.region === 'mediterranean') {
        nodeColor = COLORS.brightBlue
        emissiveColor = COLORS.azureLuminous
      } else {
        nodeColor = COLORS.azureBlue
        emissiveColor = COLORS.azureLuminous
      }

      const nodeMaterial = new THREE.MeshPhysicalMaterial({
        color: nodeColor,
        emissive: emissiveColor,
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9
      })

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      // Set initial position (baseline)
      node.position.set(country.x, -4.5, 4)
      node.scale.set(0.1, 0.1, 0.1)
      
      // Store target position in userData
      node.userData = {
        targetX: country.x,
        targetY: country.y,
        targetZ: 0,
        country: country.name,
        region: country.region
      }

      scene.add(node)
      nodes.push(node)
    })

    sceneRef.current = { scene, camera, renderer, nodes, labels: [] }

    // Animate nodes flying into position
    nodes.forEach((node, index) => {
      // Stagger animation
      gsap.to(node.position, {
        x: node.userData.targetX,
        y: node.userData.targetY,
        z: node.userData.targetZ,
        duration: 1.2,
        delay: index * 0.15,
        ease: 'power3.out'
      })

      gsap.to(node.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.0,
        delay: index * 0.15,
        ease: 'back.out(1.7)'
      })

      // Subtle pulse animation after settling
      gsap.to(node.material as THREE.MeshPhysicalMaterial, {
        emissiveIntensity: 0.4,
        duration: 1.5,
        delay: index * 0.15 + 1.2,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut'
      })
    })

    // Subtle camera breathing animation
    gsap.to(camera.position, {
      z: 14,
      duration: 8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })

    gsap.to(camera.position, {
      y: 0.3,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 2
    })

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Raycaster for hover interactions
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredNode: THREE.Mesh | null = null

    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(nodes)

      if (intersects.length > 0) {
        const intersectedNode = intersects[0].object as THREE.Mesh
        
        if (hoveredNode !== intersectedNode) {
          // Reset previous node
          if (hoveredNode) {
            gsap.to(hoveredNode.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
            gsap.to((hoveredNode.material as THREE.MeshPhysicalMaterial), {
              emissiveIntensity: 0.2,
              duration: 0.3
            })
          }

          // Highlight new node
          hoveredNode = intersectedNode
          gsap.to(hoveredNode.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, ease: 'back.out(2)' })
          gsap.to((hoveredNode.material as THREE.MeshPhysicalMaterial), {
            emissiveIntensity: 0.8,
            duration: 0.3
          })
          
          // Update cursor
          containerRef.current.style.cursor = 'pointer'
        }
      } else {
        if (hoveredNode) {
          gsap.to(hoveredNode.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
          gsap.to((hoveredNode.material as THREE.MeshPhysicalMaterial), {
            emissiveIntensity: 0.2,
            duration: 0.3
          })
          hoveredNode = null
          if (containerRef.current) {
            containerRef.current.style.cursor = 'default'
          }
        }
      }
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      nodeGeometry.dispose()
      nodes.forEach(node => {
        (node.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <div className="relative w-full">
      {/* Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden"
        style={{ touchAction: 'none' }}
      />

      {/* Axis Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal axis labels */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-azure-blue/60 text-xs md:text-sm font-semibold">
          Direct<br />Feedback
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right text-azure-blue/60 text-xs md:text-sm font-semibold">
          Indirect<br />Feedback
        </div>
        
        {/* Vertical axis labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-azure-blue/60 text-xs md:text-sm font-semibold">
          Low-Context<br />Explicit
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-azure-blue/60 text-xs md:text-sm font-semibold">
          High-Context<br />Implicit
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-primary-dark/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 pointer-events-auto">
        <div className="space-y-2 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange" />
            <span className="text-white/80">Western / North America</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-bright-blue" />
            <span className="text-white/80">Mediterranean / Latin</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-azure-blue" />
            <span className="text-white/80">Middle East / Asia</span>
          </div>
        </div>
      </div>
    </div>
  )
}

