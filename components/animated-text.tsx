"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedText({ children, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.6, 0.05, -0.01, 0.9],
          delay: delay + 0.1,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
