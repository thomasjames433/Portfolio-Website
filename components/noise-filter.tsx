"use client"

import { useEffect, useRef } from "react"

export default function NoiseFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create noise
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 5
        data[i] = noise
        data[i + 1] = noise
        data[i + 2] = noise
        data[i + 3] = Math.random() * 20 // Alpha (transparency)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      createNoise()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[90] pointer-events-none opacity-5 mix-blend-overlay" />
}
