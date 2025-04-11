"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { forwardRef, type ReactNode, useRef } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
  speed?: number
}

const ParallaxSection = forwardRef<HTMLElement, ParallaxSectionProps>(
  ({ children, className = "", id, speed = 0.1 }, ref) => {
    const sectionRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

    return (
      <section
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          if (sectionRef.current !== node) {
            sectionRef.current = node
          }
        }}
        id={id}
        className={className}
      >
        <motion.div style={{ y, opacity }}>{children}</motion.div>
      </section>
    )
  },
)

ParallaxSection.displayName = "ParallaxSection"

export default ParallaxSection
