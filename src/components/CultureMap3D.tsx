'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

interface Country {
  name: string
  x: number
  y: number
  region: 'westernNorthAmerica' | 'mediterraneanLatin' | 'middleEastAsia'
  baselineY: number
  baselineZ: number
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

    // Country data with regional grouping - precision-tuned positions to match Culture Map figure
    const COUNTRIES: Country[] = [
      // Top left: very direct, low-context
      { name: "Netherlands", x: -3.9, y: 2.1, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      { name: "Germany", x: -3.6, y: 1.8, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      { name: "Denmark", x: -3.3, y: 1.3, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      
      // Slightly left of center, top
      { name: "Australia", x: -0.7, y: 1.7, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      
      // Around the vertical axis, top right
      { name: "US", x: 0.3, y: 2.2, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      { name: "Canada", x: 0.3, y: 1.8, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      { name: "UK", x: 0.9, y: 1.0, region: 'westernNorthAmerica', baselineY: 0, baselineZ: 8 },
      
      // Bottom left: more high-context but still direct
      { name: "Israel", x: -3.4, y: -0.3, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "Russia", x: -3.6, y: -0.8, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "Spain", x: -2.6, y: -0.9, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "France", x: -2.2, y: -1.25, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "Italy", x: -0.4, y: -1.9, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      
      // Middle right: Latin America, just to the right of the vertical axis
      { name: "Brazil", x: 1.1, y: 0.2, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "Argentina", x: 1.3, y: -0.05, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      { name: "Mexico", x: 1.5, y: -0.3, region: 'mediterraneanLatin', baselineY: 0, baselineZ: 8 },
      
      // Bottom-right arc: Middle East / Asia
      { name: "India", x: 2.2, y: -0.8, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 },
      { name: "Saudi Arabia", x: 2.7, y: -0.9, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 },
      { name: "Kenya", x: 1.9, y: -1.3, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 },
      { name: "China", x: 2.3, y: -1.8, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 },
      { name: "Thailand", x: 2.9, y: -1.9, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 },
      { name: "Japan", x: 3.3, y: -2.0, region: 'middleEastAsia', baselineY: 0, baselineZ: 8 }
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

    // Create axes (more visible than grid)
    const axisLineMaterial = new THREE.LineBasicMaterial({ 
      color: COLORS.azureBlue, 
      transparent: true, 
      opacity: 0.25 
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

    // Add subtle grid lines (fainter for better dot visibility)
    const gridMaterial = new THREE.LineBasicMaterial({ 
      color: COLORS.azureBlue, 
      transparent: true, 
      opacity: 0.05 
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
    const nodeGeometry = new THREE.SphereGeometry(0.17, 32, 32) // Reduced by ~30% for lighter feel

    COUNTRIES.forEach((country) => {
      // Assign color based on region
      let nodeColor: number
      let emissiveColor: number
      
      if (country.region === 'westernNorthAmerica') {
        nodeColor = COLORS.orange
        emissiveColor = COLORS.orangeLuminous
      } else if (country.region === 'mediterraneanLatin') {
        nodeColor = COLORS.brightBlue
        emissiveColor = COLORS.azureLuminous
      } else {
        nodeColor = COLORS.azureBlue
        emissiveColor = COLORS.azureLuminous
      }

      const nodeMaterial = new THREE.MeshPhysicalMaterial({
        color: nodeColor,
        emissive: emissiveColor,
        emissiveIntensity: 0.3,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.95
      })

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
      
      // Set initial position at baseline (horizontal axis)
      node.position.set(country.x, country.baselineY, country.baselineZ)
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

    // Create label elements for each country
    const labels: HTMLElement[] = []
    const labelsContainer = document.createElement('div')
    labelsContainer.style.position = 'absolute'
    labelsContainer.style.top = '0'
    labelsContainer.style.left = '0'
    labelsContainer.style.width = '100%'
    labelsContainer.style.height = '100%'
    labelsContainer.style.pointerEvents = 'none'
    containerRef.current.appendChild(labelsContainer)

    COUNTRIES.forEach((country, index) => {
      const label = document.createElement('div')
      label.textContent = country.name
      label.style.position = 'absolute'
      label.style.color = '#ffffff'
      label.style.fontSize = '10px'
      label.style.fontWeight = '500'
      label.style.opacity = '0'
      label.style.transition = 'opacity 0.5s'
      label.style.textShadow = '0 0 4px rgba(0, 0, 0, 0.8)'
      label.style.whiteSpace = 'nowrap'
      labelsContainer.appendChild(label)
      labels.push(label)
    })

    sceneRef.current = { scene, camera, renderer, nodes, labels }

    // Animate nodes flying into position from baseline
    nodes.forEach((node, index) => {
      // Position animation - from baseline to target
      gsap.fromTo(node.position, 
        { 
          x: node.userData.targetX,
          y: COUNTRIES[index].baselineY, 
          z: COUNTRIES[index].baselineZ 
        },
        {
          x: node.userData.targetX,
          y: node.userData.targetY,
          z: node.userData.targetZ,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'power3.out'
        }
      )

      // Scale animation
      gsap.to(node.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.0,
        delay: index * 0.15,
        ease: 'back.out(1.7)'
      })

      // Fade in label after node arrives
      gsap.to(labels[index], {
        opacity: 0.8,
        duration: 0.5,
        delay: index * 0.15 + 1.0,
        ease: 'power2.out'
      })

      // Subtle pulse animation after settling
      gsap.to(node.material as THREE.MeshPhysicalMaterial, {
        emissiveIntensity: 0.5,
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

    // Label tweaks for fine-tuning positions to avoid overlaps
    const LABEL_TWEAKS: Record<string, { dx?: number; dy?: number }> = {
      'Netherlands': { dy: -4 },
      'US': { dx: -40 },
      'Canada': { dx: -45 },
      'Saudi Arabia': { dy: 4 },
      'Germany': { dy: -2 },
      'Denmark': { dy: 2 },
      'Russia': { dy: 2 },
      'Spain': { dy: 2 },
      'Brazil': { dx: 2 },
      'Argentina': { dy: 2 },
      'Mexico': { dy: 2 }
    }

    // Animation loop with label position updates
    function animate() {
      requestAnimationFrame(animate)
      
      // Update label positions based on node positions
      nodes.forEach((node, index) => {
        const vector = new THREE.Vector3()
        node.getWorldPosition(vector)
        vector.project(camera)
        
        // Convert to screen coordinates
        const x = (vector.x * 0.5 + 0.5) * containerRef.current!.clientWidth
        const y = (-(vector.y * 0.5) + 0.5) * containerRef.current!.clientHeight
        
        // Smart label positioning to avoid overlaps
        const country = COUNTRIES[index]
        
        // Basic offset logic based on position
        const isLeftSide = country.x < 0
        const isTopSide = country.y > 0
        
        let offsetX = isLeftSide ? 10 : -10  // left cluster: label to right, right cluster: label to left
        let offsetY = isTopSide ? -8 : 12    // top: label above, bottom: label below
        
        // Apply fine-tuning tweaks
        const tweak = LABEL_TWEAKS[country.name] ?? {}
        const finalOffsetX = offsetX + (tweak.dx ?? 0)
        const finalOffsetY = offsetY + (tweak.dy ?? 0)
        
        // Apply positioning
        if (isLeftSide) {
          // Left side: label to the right
          labels[index].style.left = `${x + finalOffsetX}px`
          labels[index].style.textAlign = 'left'
        } else {
          // Right side: label to the left
          labels[index].style.left = `${x + finalOffsetX}px`
          labels[index].style.textAlign = 'right'
        }
        
        labels[index].style.top = `${y + finalOffsetY}px`
      })
      
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
        if (labelsContainer.parentNode) {
          containerRef.current.removeChild(labelsContainer)
        }
        if (renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement)
        }
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

