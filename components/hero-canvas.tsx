"use client"

import { useEffect, useRef } from "react"

export default function HeroCanvas() {
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

    // Create stars
    class Star {
      x: number
      y: number
      size: number
      color: string
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.color = this.getRandomColor()
        this.speed = Math.random() * 0.5 + 0.1
      }

      getRandomColor() {
        const colors = ["#ffffff", "#f3f4f6", "#e5e7eb", "#d1d5db"]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = 0
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create grid lines
    class GridLine {
      x1: number
      y1: number
      x2: number
      y2: number
      color: string
      opacity: number
      speed: number

      constructor(horizontal: boolean) {
        if (horizontal) {
          this.x1 = 0
          this.y1 = Math.random() * canvas.height
          this.x2 = canvas.width
          this.y2 = this.y1
        } else {
          this.x1 = Math.random() * canvas.width
          this.y1 = 0
          this.x2 = this.x1
          this.y2 = canvas.height
        }
        this.color = "#6366f1"
        this.opacity = Math.random() * 0.1 + 0.05
        this.speed = Math.random() * 0.5 + 0.1
      }

      update() {
        this.opacity -= 0.001
        if (this.opacity <= 0) {
          this.opacity = Math.random() * 0.1 + 0.05
        }
      }

      draw() {
        if (!ctx) return
        ctx.strokeStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    // Create stars and grid lines
    const stars: Star[] = []
    const gridLines: GridLine[] = []
    const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 10000))
    const gridLineCount = 20

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    for (let i = 0; i < gridLineCount; i++) {
      gridLines.push(new GridLine(i % 2 === 0))
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update()
        stars[i].draw()
      }

      // Draw grid lines
      for (let i = 0; i < gridLines.length; i++) {
        gridLines[i].update()
        gridLines[i].draw()
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
