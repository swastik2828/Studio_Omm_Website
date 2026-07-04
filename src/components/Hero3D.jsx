import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';

// Safe, math-driven pulsing orb (No external shaders required)
function PulsingNeonOrb() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Math-based heartbeat pulse (replaces the heavy Distort material)
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1.2;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef}>
        {/* Icosahedron provides a beautiful geometric wireframe */}
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial 
          color="#B026FF" 
          emissive="#B026FF" 
          emissiveIntensity={0.8} 
          wireframe={true}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

// Lightweight floating geometric accents
function FloatingGeometry() {
  return (
    <>
      <Float speed={1.5} floatIntensity={3} position={[-3, 2, -2]}>
        <mesh>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#FF007F" emissive="#FF007F" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>
      <Float speed={3} floatIntensity={2} position={[3, -2, -1]}>
        <mesh>
          <torusGeometry args={[0.4, 0.1, 8, 24]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Optimized Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#B026FF" />
          
          <PulsingNeonOrb />
          <FloatingGeometry />
          
          {/* Optimized Particle System */}
          <Sparkles count={200} scale={10} size={4} speed={0.5} color="#00F0FF" opacity={0.6} />
        </Suspense>
      </Canvas>
      {/* Blend overlay so the canvas seamlessly melts into the background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none"></div>
    </div>
  );
}