"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const elements = [
    { size: 10, x: "10%", y: "20%", delay: 0, parallaxFactor: 0.02 },
    { size: 15, x: "80%", y: "15%", delay: 0.5, parallaxFactor: 0.03 },
    { size: 8, x: "30%", y: "70%", delay: 1, parallaxFactor: 0.01 },
    { size: 12, x: "70%", y: "60%", delay: 1.5, parallaxFactor: 0.04 },
    { size: 20, x: "20%", y: "40%", delay: 2, parallaxFactor: 0.02 },
    { size: 6, x: "60%", y: "30%", delay: 2.5, parallaxFactor: 0.03 },
    { size: 25, x: "90%", y: "80%", delay: 3, parallaxFactor: 0.05 },
    { size: 18, x: "40%", y: "90%", delay: 3.5, parallaxFactor: 0.02 },
    { size: 14, x: "85%", y: "45%", delay: 4, parallaxFactor: 0.03 },
    { size: 22, x: "15%", y: "65%", delay: 4.5, parallaxFactor: 0.04 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((el, index) => {
        // Calculate parallax offset based on mouse position
        const offsetX = (mousePosition.x - 0.5) * el.parallaxFactor * 100
        const offsetY = (mousePosition.y - 0.5) * el.parallaxFactor * 100

        return (
          <motion.div
            key={index}
            className="absolute rounded-full border border-white/10 backdrop-blur-sm"
            style={{
              width: el.size,
              height: el.size,
              left: `calc(${el.x} + ${offsetX}px)`,
              top: `calc(${el.y} + ${offsetY}px)`,
              background: index % 2 === 0 ? "rgba(147, 51, 234, 0.1)" : "rgba(59, 130, 246, 0.1)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.6,
              scale: 1,
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              opacity: { delay: el.delay + 3, duration: 1 },
              scale: { delay: el.delay + 3, duration: 1 },
              x: { repeat: Number.POSITIVE_INFINITY, duration: 4 + index, ease: "easeInOut" },
              y: { repeat: Number.POSITIVE_INFINITY, duration: 5 + index, ease: "easeInOut" },
              rotate: { repeat: Number.POSITIVE_INFINITY, duration: 20 + index, ease: "linear" },
            }}
          >
            {/* Inner glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  index % 2 === 0
                    ? "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0) 70%)"
                    : "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                opacity: { repeat: Number.POSITIVE_INFINITY, duration: 2 + index * 0.5, ease: "easeInOut" },
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
