'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, GradientTexture, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

export const MarmitaModel = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Mesh>(null);

  // Rotate group based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    
    // Animate lid - "popping out"
    if (lidRef.current) {
      const lidLift = Math.min(scrollProgress * 2, 0.8);
      lidRef.current.position.y = 0.5 + lidLift;
      lidRef.current.rotation.x = -scrollProgress * 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      {/* Pan Body */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1, 0.8, 0.8, 32]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Pan Inner Lining (Glow) */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
        <meshStandardMaterial emissive="#FF8C00" emissiveIntensity={2} color="#FF8C00" />
      </mesh>

      {/* Code Symbol Inside </> */}
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.8} />
      </mesh>

      {/* Lid */}
      <mesh ref={lidRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.15, 32]} />
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
        
        {/* Lid Handle */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshStandardMaterial color="#555" />
        </mesh>
      </mesh>

      {/* Steam Particles (Static for now, moving via scroll) */}
      {[...Array(5)].map((_, i) => (
        <SteamParticle key={i} index={i} scrollProgress={scrollProgress} />
      ))}
    </group>
  );
};

const SteamParticle = ({ index, scrollProgress }: { index: number, scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomX = useMemo(() => (Math.random() - 0.5) * 0.5, []);
  const randomZ = useMemo(() => (Math.random() - 0.5) * 0.5, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + index;
      meshRef.current.position.y = 0.5 + ((time % 2) / 2) + (scrollProgress * 2);
      meshRef.current.scale.setScalar(1 - (time % 2) / 2);
      meshRef.current.material.opacity = (1 - (time % 2) / 2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[randomX, 0.5, randomZ]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
    </mesh>
  );
};
