// components/GlobeScene.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Line,
  Points,
  PointMaterial,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef, Suspense, Component, ReactNode } from "react";
import * as THREE from "three";
import { gulfCities } from "./ConnectionsData";
import { ErrorBoundary } from "./ErrorBoundary";

// Error boundary for texture loading errors
class TextureErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GulfConnections() {
  const radius = 1.05;
  const lines = useMemo(() => {
    const pairs: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const dubai = gulfCities.find(c => c.name === "Dubai");
    if (!dubai) return pairs;
    const dubaiPos = latLonToVector3(dubai.lat, dubai.lon, radius);
    gulfCities.forEach(city => {
      if (city.name === "Dubai") return;
      const target = latLonToVector3(city.lat, city.lon, radius);
      pairs.push({ start: dubaiPos, end: target });
    });
    return pairs;
  }, []);

  return (
    <>
      {lines.map((line, index) => {
        const mid = line.start.clone().add(line.end).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(1.3);
        const curve = new THREE.QuadraticBezierCurve3(
          line.start,
          mid,
          line.end
        );
        const points = curve.getPoints(50);
        const positions: [number, number, number][] = points.map(p => [p.x, p.y, p.z]);
        return (
          <Line
            key={index}
            points={positions}
            lineWidth={2}
            color="#ff8a3c"
            transparent
            opacity={0.9}
          />
        );
      })}
    </>
  );
}

function GulfPoints() {
  const radius = 1.05;
  const positions = useMemo(() => {
    return gulfCities.map(city => latLonToVector3(city.lat, city.lon, radius));
  }, []);

  const ref = useRef<any>();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.size = 12 + Math.sin(t * 2) * 3;
  });

  const positionsArray = new Float32Array(positions.length * 3);
  positions.forEach((v, i) => {
    positionsArray[i * 3] = v.x;
    positionsArray[i * 3 + 1] = v.y;
    positionsArray[i * 3 + 2] = v.z;
  });

  return (
    <Points positions={positionsArray}>
      <PointMaterial
        ref={ref}
        color="#ffb469"
        size={10}
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </Points>
  );
}

function BackgroundParticles() {
  const count = 2000;
  const radius = 4;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * radius * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * radius * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
    }
    return arr;
  }, []);

  return (
    <Points positions={positions}>
      <PointMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </Points>
  );
}

// Fallback globe without texture
function FallbackGlobe() {
  const group = useRef<THREE.Group>(null);
  console.log('🔄 FallbackGlobe rendering...');

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
  });

  // Rotate so the Middle East / GCC is roughly facing the camera
  const baseRotation = new THREE.Euler(0.1, -1.3, 0);

  return (
    <group ref={group} rotation={baseRotation}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#1a3a5a"
          emissive="#2a5a8a"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.7}
        />
      </Sphere>
      <GulfConnections />
      <GulfPoints />
    </group>
  );
}

// Globe with Earth texture
function TexturedGlobe() {
  const group = useRef<THREE.Group>(null);
  
  // Load Earth night texture - will suspend if loading
  // If texture file doesn't exist, useTexture will throw and Suspense will catch it
  const earthMap = useTexture("/textures/earth-night.jpg");
  earthMap.flipY = false;

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
  });

  // Rotate so the Middle East / GCC is roughly facing the camera
  const baseRotation = new THREE.Euler(0.1, -1.3, 0);

  return (
    <group ref={group} rotation={baseRotation}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          map={earthMap}
          metalness={0.2}
          roughness={0.8}
          emissive={"#0b1528"}
          emissiveIntensity={0.6}
        />
      </Sphere>
      <GulfConnections />
      <GulfPoints />
    </group>
  );
}

export function GlobeScene() {
  console.log('🌍 GlobeScene component rendering...');
  
  return (
    <ErrorBoundary fallback={<div className="w-full h-full bg-red-500/20">GlobeScene Error</div>}>
      <div className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          style={{ width: "100%", height: "100%", display: "block", position: "absolute", top: 0, left: 0, zIndex: 0 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          onCreated={(state) => {
            console.log('✅ Canvas created successfully!', state);
            // Check if WebGL is available
            try {
              const gl = state.gl.getContext();
              if (!gl) {
                throw new Error('WebGL not supported');
              }
              console.log('✅ WebGL context available:', gl);
            } catch (error) {
              console.error('❌ WebGL context error:', error);
            }
          }}
          onError={(error) => {
            console.error('❌ Canvas error:', error);
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <pointLight position={[-5, 5, 5]} intensity={0.5} />
          <BackgroundParticles />
          <Suspense fallback={<FallbackGlobe />}>
            <TextureErrorBoundary fallback={<FallbackGlobe />}>
              <TexturedGlobe />
            </TextureErrorBoundary>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}

