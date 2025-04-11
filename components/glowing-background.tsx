"use client"

import { useEffect, useRef } from "react"

export default function GlowingBackground() {
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

    // Create glowing orbs
    class GlowOrb {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      pulseSpeed: number
      pulseDirection: number
      maxRadius: number
      minRadius: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 100 + 50
        this.maxRadius = this.radius
        this.minRadius = this.radius * 0.7
        this.color = this.getRandomColor()
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.05 + 0.02
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseDirection = 1
      }

      getRandomColor() {
        const colors = ["#9333ea", "#6366f1", "#3b82f6", "#ec4899"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1

        // Pulse effect
        this.radius += this.pulseDirection * this.pulseSpeed
        if (this.radius > this.maxRadius || this.radius < this.minRadius) {
          this.pulseDirection *= -1
        }
      }

      draw() {
        if (!ctx) return

        // Create radial gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, `${this.color}`)
        gradient.addColorStop(1, "transparent")

        ctx.globalAlpha = this.opacity
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create orbs
    const orbs: GlowOrb[] = []
    const orbCount = 5

    for (let i = 0; i < orbCount; i++) {
      orbs.push(new GlowOrb())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw orbs
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].update()
        orbs[i].draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
