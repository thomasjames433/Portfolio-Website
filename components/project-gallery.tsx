"use client"

import type React from "react"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"

interface Project {
  id: number
  title: string
  category: string
  description?: string
  image: string
  link: string
}

interface ProjectGalleryProps {
  projects: Project[]
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isHovered={hoveredId === project.id}
          onHover={() => setHoveredId(project.id)}
          onHoverEnd={() => setHoveredId(null)}
        />
      ))}
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  isHovered: boolean
  onHover: () => void
  onHoverEnd: () => void
}

function ProjectCard({ project, index, isHovered, onHover, onHoverEnd }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth values for rotation
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 300, damping: 30 })

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onHoverEnd()
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl shadow-lg border border-white/10 hover:border-fuchsia-500/50 transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[350px] w-full perspective">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-blue-600/20 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-8 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          style={{ transform: "translateZ(40px)" }}
        >
          <motion.span
            className="text-fuchsia-400 font-medium text-sm mb-2 uppercase tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.category}
          </motion.span>
          <motion.h3
            className="text-white text-2xl font-bold mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project.title}
          </motion.h3>
          {project.description && (
            <motion.p
              className="text-white/80 mb-5 text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {project.description}
            </motion.p>
          )}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white w-fit group/link"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative">
              View Project
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-4 right-4 h-8 w-8 border border-fuchsia-500/30 rounded-full z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5, rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } }}
      ></motion.div>
      <motion.div
        className="absolute bottom-4 left-4 h-8 w-8 border border-blue-500/30 rounded-full z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? -360 : 0 }}
        transition={{ duration: 0.5, rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" } }}
      ></motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-xl blur z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 mix-blend-overlay pointer-events-none holographic-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
    </motion.div>
  )
}
