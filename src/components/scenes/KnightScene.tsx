'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Knight } from '@/components/Knight';

const KnightScene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        shadows
        camera={{
          position: [2.1, 6, 5],
          fov: 40,
        }}
        gl={{ antialias: true }}
      >
        {/* <color attach="background" args={['#f8f8f8']} /> */}

        <OrbitControls
          target={[-0.8, 4.6, 1.2]}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI - 0.2}
          enableDamping
          dampingFactor={0.05}
        />

        <ambientLight intensity={1.0} color="#ffffff" />

        <directionalLight
          position={[5, 8, 3]}
          intensity={2.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <pointLight position={[3, 4, 2]} intensity={1.6} color="#ffffff" distance={12} />
        <pointLight position={[-2, 3, 3]} intensity={1.2} color="#f8f8ff" distance={10} />
        <pointLight position={[0, 2, -4]} intensity={1.0} color="#e6e6ff" distance={8} />
        <pointLight position={[4, 2, 0]} intensity={1.2} color="#fff8f0" distance={6} />
        <pointLight position={[-3, 2, 1]} intensity={1.0} color="#f0f8ff" distance={6} />
        <hemisphereLight color={'#ffffff'} groundColor={'#cccccc'} intensity={0.6} />

        <Suspense fallback={null}>
          <Knight />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default KnightScene;
