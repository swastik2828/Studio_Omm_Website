import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// -----------------------------------------------------
// 1. The Particle Swarm Component
// -----------------------------------------------------
const ParticleSwarm = () => {
  const pointsRef = useRef();

  // Generate 2000 particles spread across a wide area
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Create a cylindrical/spherical spread
      const radius = Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const y = (Math.random() - 0.5) * 20;
      
      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = radius * Math.sin(theta);
    }
    return pos;
  }, [particleCount]);

  // Rotate the entire particle field slowly
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      {/* Using the Hyper Orange (#FF5E00) for the particles. 
        Setting size to 0.08 gives it a fine, premium dust look.
      */}
      <PointMaterial 
        transparent 
        color="#FF5E00" 
        size={0.08} 
        sizeAttenuation={true} 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// -----------------------------------------------------
// 2. Floating Abstract Geometry Component
// -----------------------------------------------------
const FloatingGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[3, 0, -5]} scale={2.5}>
        <icosahedronGeometry args={[1, 0]} />
        {/* Wireframe Canary Gold (#FFE600) geometry */}
        <meshStandardMaterial 
          color="#FFE600" 
          wireframe={true} 
          emissive="#FFE600" 
          emissiveIntensity={0.5} 
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
};

// -----------------------------------------------------
// 3. The Main Canvas Export
// -----------------------------------------------------
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      {/* We use camera fov to ensure it looks cinematic */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        
        {/* Ambient light prevents complete darkness */}
        <ambientLight intensity={0.2} color="#ffffff" />
        
        {/* Directional light hitting the geometry with Hyper Orange */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#FF5E00" />
        
        {/* Second light hitting from the bottom with Canary Gold */}
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#FFE600" />
        
        <ParticleSwarm />
        <FloatingGeometry />
        
        {/* Adds fog to the background to blend perfectly with Matte Obsidian (#121212) */}
        <fog attach="fog" args={['#121212', 5, 25]} />
      </Canvas>
    </div>
  );
}