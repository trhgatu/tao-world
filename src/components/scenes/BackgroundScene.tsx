'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StarBackground from '@/components/StarBackground';

const BackgroundScene = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight />
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
