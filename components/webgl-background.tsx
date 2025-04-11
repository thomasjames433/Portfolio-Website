"use client"

import { useRef } from "react"
import { useThree, Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        <Scene />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration
            offset={[0.0005, 0.0005]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={true}
            modulationOffset={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function Scene() {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  // Create particles
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    // Position
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Color
    const color = new THREE.Color()
    if (Math.random() < 0.3) {
      color.setHSL(0.85, 1, 0.5) // Purple
    } else if (Math.random() < 0.6) {
      color.setHSL(0.6, 1, 0.5) // Blue
    } else {
      color.setHSL(0.7, 1, 0.5) // Indigo
    }

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    // Size
    sizes[i] = Math.random() * 0.1 + 0.05
  }

  // Animation
  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1

    // Update particle positions
    const positions = groupRef.current.children[0].geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.5 + i * 0.1) * 0.002
    }
    groupRef.current.children[0].geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <GridPlane />
      <FogLayer />
    </group>
  )
}

function GridPlane() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.5
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 20, new THREE.Color("#6366f1"), new THREE.Color("#6366f1")]}
      position={[0, -3, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

function FogLayer() {
  const fogRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!fogRef.current) return
    fogRef.current.rotation.z = state.clock.getElapsedTime() * 0.05
  })

  return (
    <mesh ref={fogRef} position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[40, 40, 1, 1]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.7} fog={true} />
    </mesh>
  )
}
