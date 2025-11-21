"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useRef, Suspense } from "react";

function TexturedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const earthTexture = useTexture("/textures/earth-night.jpg");
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.03;
  });

  return (
    <Sphere args={[1.2, 64, 64]} ref={meshRef} position={[0.9, 0.1, 0]}>
      <meshStandardMaterial
        map={earthTexture}
        metalness={0.4}
        roughness={0.9}
        emissive="#02040a"
        emissiveIntensity={0.25}
      />
    </Sphere>
  );
}

export function WebglBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#02040c"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1} />
      <Suspense fallback={null}>
        <TexturedGlobe />
      </Suspense>
    </Canvas>
  );
}
