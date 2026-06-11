"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/** Liquid-metal centerpiece — picks up the pink/violet/amber rig lights. */
function Blob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.12;
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={mesh} scale={1.85}>
        <icosahedronGeometry args={[1, 48]} />
        <MeshDistortMaterial
          distort={0.42}
          speed={1.8}
          color="#14101e"
          roughness={0.12}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
}

/** Thin wireframe halo orbiting the blob, like a camera gimbal. */
function Halo() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ring.current) return;
    const t = state.clock.elapsedTime;
    ring.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.2;
    ring.current.rotation.z = t * 0.18;
  });

  return (
    <mesh ref={ring} scale={2.9}>
      <torusGeometry args={[1, 0.0035, 16, 140]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
    </mesh>
  );
}

/** Deterministic PRNG so particle layout is stable across renders. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Galaxy shell of drifting points surrounding the scene. */
function ParticleField({ count = 1600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(2026);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random point in a spherical shell, radius 3.5 – 6.5
      const r = 3.5 + rand() * 3;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#a78bfa"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Eases the camera toward the pointer for a parallax feel. */
function Rig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.7, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.45, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 4]} intensity={60} color="#ff4d8d" />
      <pointLight position={[-5, -2, 3]} intensity={45} color="#8b5cf6" />
      <pointLight position={[0, 5, -4]} intensity={30} color="#ffb347" />
      <Blob />
      <Halo />
      <ParticleField />
      <Sparkles count={70} scale={7} size={1.6} speed={0.35} color="#ffb347" opacity={0.6} />
      <Rig />
    </Canvas>
  );
}
