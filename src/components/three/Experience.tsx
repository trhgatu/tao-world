'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Float } from '@react-three/drei'
import Lights from './Lights'

export default function Experience() {
    const island = useRef<Group>(null)

    useFrame((_, dt) => {
        if (!island.current) return
        island.current.rotation.y += dt * 0.3
        island.current.position.y = Math.sin(performance.now() * 0.001) * 0.05
    })

    return (
        <>
            <Lights />
            <Float floatIntensity={0.6} rotationIntensity={0.3}>
                <group ref={island} position={[0, 0.5, 0]}>
                    <mesh castShadow>
                        <icosahedronGeometry args={[1.2, 1]} />
                        <meshStandardMaterial color="#7dd3fc" roughness={0.5} metalness={0.1} />
                    </mesh>
                </group>
            </Float>
        </>
    )
}
