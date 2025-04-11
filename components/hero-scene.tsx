"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 1500

    const posArray = new Float32Array(particleCount * 3)
    const colorArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15
      posArray[i + 1] = (Math.random() - 0.5) * 15
      posArray[i + 2] = (Math.random() - 0.5) * 15

      // Color
      const color = new THREE.Color()
      if (Math.random() < 0.3) {
        color.setHSL(0.85, 1, 0.5) // Purple
      } else if (Math.random() < 0.6) {
        color.setHSL(0.6, 1, 0.5) // Blue
      } else {
        color.setHSL(0.7, 1, 0.5) // Indigo
      }

      colorArray[i] = color.r
      colorArray[i + 1] = color.g
      colorArray[i + 2] = color.b
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.x = elapsedTime * 0.05
      particlesMesh.rotation.y = elapsedTime * 0.03

      // Mouse interaction
      particlesMesh.rotation.x += mouseY * 0.01
      particlesMesh.rotation.y += mouseX * 0.01

      // Update particle positions for wave effect
      const positions = particlesMesh.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(elapsedTime + i * 0.1) * 0.002
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
