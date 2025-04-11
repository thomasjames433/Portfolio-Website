"use client"

import { useState, useEffect } from "react"
import { motion, useAnimate } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchFactor?: number
  delay?: number
}

export default function GlitchText({ text, className = "", glitchFactor = 0.3, delay = 0 }: GlitchTextProps) {
  const [scope, animate] = useAnimate()
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayText, setDisplayText] = useState(text)

  // Characters to use for glitch effect
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  // Initial animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      runGlitchAnimation()
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [])

  // Run glitch animation
  const runGlitchAnimation = async () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Original text
    const originalText = text

    // Number of glitch iterations
    const iterations = Math.floor(Math.random() * 3) + 2

    for (let i = 0; i < iterations; i++) {
      // Create glitched text
      let glitchedText = ""

      for (let j = 0; j < originalText.length; j++) {
        // Randomly decide whether to glitch this character
        if (Math.random() < glitchFactor) {
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          glitchedText += randomChar
        } else {
          glitchedText += originalText[j]
        }
      }

      setDisplayText(glitchedText)

      // Wait a short time
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 50))
    }

    // Restore original text
    setDisplayText(originalText)
    setIsAnimating(false)
  }

  // Handle hover
  const handleHover = () => {
    if (!isHovered) {
      setIsHovered(true)
      runGlitchAnimation()
    }
  }

  return (
    <motion.span
      ref={scope}
      className={`inline-block ${className}`}
      onMouseEnter={handleHover}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayText}
    </motion.span>
  )
}
