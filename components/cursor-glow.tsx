"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 150,
        y: mousePosition.y - 150,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      style={{
        background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
      }}
    />
  )
}
