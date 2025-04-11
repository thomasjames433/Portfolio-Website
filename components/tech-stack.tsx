"use client"

import { motion, useInView } from "framer-motion"
import { Database, Server, Code, Globe, Cpu, Terminal } from "lucide-react"
import { useState, useRef } from "react"

export default function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const technologies = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development",
      items: ["Django", "FastAPI"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database",
      items: ["PostgreSQL"],
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "AI & ML",
      items: ["AI/ML", "WebSocket"],
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "DevOps & Systems",
      items: ["Linux", "DevOps"],
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Core CS",
      items: ["Data Structures", "Algorithms"],
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Tools",
      items: ["Git"],
    },
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
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      ref={containerRef}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={index}
          variants={item}
          className="bg-white/5 backdrop-blur-2xl p-8 rounded-2xl shadow-lg border border-white/10 hover:border-fuchsia-500/50 transition-all duration-300 group relative overflow-hidden"
          whileHover={{ y: -15, scale: 1.05, zIndex: 10 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-20 -right-20 h-40 w-40 bg-fuchsia-500 rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0"></div>

          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 mix-blend-overlay pointer-events-none holographic-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <motion.div
            className="bg-gradient-to-br from-fuchsia-500/10 to-blue-600/10 p-4 rounded-full w-16 h-16 flex items-center justify-center text-fuchsia-400 mb-6 border border-fuchsia-500/20 group-hover:border-fuchsia-500/40 transition-colors duration-300 relative"
            animate={{
              rotateZ: hoveredIndex === index ? 360 : 0,
              scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotateZ: { duration: 1, ease: "easeInOut" },
              scale: { duration: 0.5, times: [0, 0.5, 1] },
            }}
          >
            {tech.icon}
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{tech.title}</h3>
          <ul className="space-y-3 relative z-10">
            {tech.items.map((item, idx) => (
              <motion.li
                key={idx}
                className="flex items-center group/item"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.8,
                  x: 0,
                }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                <motion.span
                  className="w-2 h-2 bg-gradient-to-r from-fuchsia-400 to-blue-500 rounded-full mr-3"
                  animate={{
                    scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 1,
                  }}
                ></motion.span>
                <motion.span
                  className="text-white/80 group-hover/item:text-white transition-colors duration-300 text-lg"
                  animate={{
                    color: hoveredIndex === index ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item}
                </motion.span>
              </motion.li>
            ))}
          </ul>

          {/* Particle effect on hover */}
          {hoveredIndex === index && <Particles count={10} parentIndex={index} />}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface ParticlesProps {
  count: number
  parentIndex: number
}

function Particles({ count, parentIndex }: ParticlesProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`particle-${parentIndex}-${index}`}
          className="absolute w-1 h-1 rounded-full bg-fuchsia-500"
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
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.1,
          }}
        />
      ))}
    </>
  )
}
