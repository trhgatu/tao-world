'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Leva } from 'leva'

const Experience = dynamic(() => import('@/components/three/Experience'), { ssr: false })

export default function Page() {
  return (
    <div className="h-dvh w-full bg-black">
      <Canvas camera={{ position: [4, 3, 6], fov: 50 }} shadows>
        <OrbitControls makeDefault />
        <Experience />
      </Canvas>
      <Leva collapsed />
    </div>
  )
}
