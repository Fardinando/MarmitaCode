'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshWobbleMaterial, MeshDistortMaterial, GradientTexture, PresentationControls, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Marmita3D = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const panRef = useRef<THREE.Mesh>(null);

  // Smooth rotation and position based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate more dynamically
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollProgress * Math.PI * 4,
        0.1
      );
      
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      
      // Perspective shift
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + (scrollProgress * 0.2);
    }
    
    // Lid opening animation
    if (lidRef.current) {
      const targetY = 0.5 + (scrollProgress > 0.1 ? Math.min((scrollProgress - 0.1) * 3, 1.2) : 0);
      const targetRotX = scrollProgress > 0.1 ? -(scrollProgress - 0.1) * 1.5 : 0;
      
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, targetY, 0.1);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetRotX, 0.1);
    }
  });

  return (
    <group ref={groupRef} scale={[1.8, 1.8, 1.8]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Pan Body - Detailed geometry */}
        <mesh ref={panRef} position={[0, -0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.85, 0.8, 64]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            metalness={0.4} 
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Pan Rim */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[1, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#EEEEEE" metalness={0.8} roughness={0.1} />
        </mesh>

        {/* Interior Glow (Orange Energy) */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.92, 0.85, 0.1, 32]} />
          <meshStandardMaterial 
            emissive="#FF4500" 
            emissiveIntensity={4 * scrollProgress} 
            color="#FF8C00" 
          />
        </mesh>

        {/* Code Symbol (Floating inside - Simplified 3D shape for stability) */}
        <group position={[0, 0.4, 0]} scale={[0.4, 0.4, 0.4]}>
          {/* < */}
          <group position={[-0.5, 0, 0]}>
            <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#FF8C00" />
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#FF8C00" />
            </mesh>
          </group>
          {/* / */}
          <mesh rotation={[0, 0, -Math.PI / 8]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshBasicMaterial color="#FF8C00" />
          </mesh>
          {/* > */}
          <group position={[0.5, 0, 0]}>
            <mesh position={[0, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#FF8C00" />
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.4, 0.08, 0.08]} />
              <meshBasicMaterial color="#FF8C00" />
            </mesh>
          </group>
        </group>

        {/* Lid Assembly */}
        <group ref={lidRef} position={[0, 0.25, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[1.05, 1.05, 0.12, 64]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.4} roughness={0.2} />
          </mesh>
          
          {/* Lid Handle */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.35, 0.08, 0.1]} />
            <meshStandardMaterial color="#CCCCCC" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.08, 0.15, 0.08]} />
            <meshStandardMaterial color="#DDDDDD" metalness={0.8} />
          </mesh>
        </group>

        {/* Realistic Steam (Sparkles + Planes) */}
        <Sparkles 
          count={40} 
          scale={2 * scrollProgress} 
          size={2} 
          speed={0.5} 
          opacity={scrollProgress} 
          color="#FF8C00" 
          position={[0, 0.5, 0]}
        />
        
        {[...Array(3)].map((_, i) => (
          <SteamPlane key={i} index={i} scrollProgress={scrollProgress} />
        ))}
      </Float>
    </group>
  );
};

const SteamPlane = ({ index, scrollProgress }: { index: number, scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = index * (Math.PI * 2 / 3);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.5 + index;
      meshRef.current.position.y = 0.4 + ((time % 1.5)) + (scrollProgress * 0.5);
      meshRef.current.position.x = Math.sin(time * 2 + offset) * 0.2;
      meshRef.current.position.z = Math.cos(time * 2 + offset) * 0.2;
      meshRef.current.rotation.y = time;
      meshRef.current.scale.setScalar(Math.max(0, 1 - (time % 1.5) / 1.5) * scrollProgress);
      if (meshRef.current.material instanceof THREE.MeshBasicMaterial) {
        meshRef.current.material.opacity = Math.max(0, (1 - (time % 1.5) / 1.5) * 0.4);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshBasicMaterial color="#FFA500" transparent opacity={0} />
    </mesh>
  );
};
