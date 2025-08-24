'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Astronaut } from '@/components/Astronaut';
import { OrbitControls } from '@react-three/drei';

const StarScene = () => {
  return (
    <div className="fixed inset-0 z-[0]">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <OrbitControls enablePan={false} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Astronaut />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarScene;
