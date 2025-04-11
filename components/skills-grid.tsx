"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"

export default function SkillsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  // Only include skills mentioned by the user
  const skills = [
    "Django",
    "FastAPI",
    "AI/ML",
    "PostgreSQL",
    "WebSocket",
    "Linux",
    "DevOps",
    "Data Structures",
    "Algorithms",
    "Git",
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-white/5 backdrop-blur-2xl p-6 rounded-xl shadow-md flex items-center justify-center text-center h-32 border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300 group relative overflow-hidden"
            whileHover={{
              y: -20,
              scale: 1.15,
              zIndex: 10,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-fuchsia-500 rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0"></div>

            {/* Holographic effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 mix-blend-overlay pointer-events-none holographic-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <motion.span
              className="font-medium text-white/80 group-hover:text-white transition-colors duration-300 text-xl relative z-10"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
                textShadow: hoveredIndex === index ? "0 0 8px rgba(255, 255, 255, 0.5)" : "none",
              }}
              transition={{ duration: 0.3 }}
              style={{
                transform: hoveredIndex === index ? "translateZ(20px)" : "translateZ(0px)",
                backgroundImage: hoveredIndex === index ? "linear-gradient(to right, #d946ef, #3b82f6)" : "none",
                backgroundClip: hoveredIndex === index ? "text" : "border-box",
                WebkitBackgroundClip: hoveredIndex === index ? "text" : "text",
                WebkitTextFillColor: hoveredIndex === index ? "transparent" : "inherit",
              }}
            >
              {skill}
            </motion.span>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-2 -right-2 h-4 w-4 bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-500"
              animate={{
                scale: hoveredIndex === index ? 2 : 1,
                rotate: hoveredIndex === index ? 180 : 0,
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>

            {/* Particle effect on hover */}
            {hoveredIndex === index && <SkillParticles count={15} />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface SkillParticlesProps {
  count: number
}

function SkillParticles({ count }: SkillParticlesProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`skill-particle-${index}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background:
              index % 2 === 0
                ? "linear-gradient(to right, #d946ef, #3b82f6)"
                : "linear-gradient(to right, #3b82f6, #d946ef)",
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
          }}
          initial={{
            x: "50%",
            y: "50%",
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: [0, 1, 0],
            scale: [0, Math.random() * 1.5 + 0.5, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.05,
          }}
        />
      ))}
    </>
  )
}
