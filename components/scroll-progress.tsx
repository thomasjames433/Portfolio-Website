"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Transform for glow effect
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
        if (!hasScrolled) setHasScrolled(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasScrolled])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-blue-500 z-50 origin-left blur-md"
        style={{ scaleX, opacity: glowOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? glowOpacity : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Scroll indicator for first-time visitors */}
      {!hasScrolled && (
        <motion.div
          className="fixed bottom-20 right-10 z-50 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full mb-2 flex justify-center"
            animate={{ borderColor: ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.5)"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [2, 6, 2] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
          <motion.p
            className="text-white/50 text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      )}
    </>
  )
}
