"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollIndicatorProps {
  href: string
  children: ReactNode
}

export default function ScrollIndicator({ href, children }: ScrollIndicatorProps) {
  return (
    <motion.a
      href={href}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors duration-300 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 0.5 }}
      whileHover={{ scale: 1.2, y: 5 }}
    >
      <motion.div
        animate={{
          y: [0, 5, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-blue-500 rounded-full blur-md z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      />
    </motion.a>
  )
}
