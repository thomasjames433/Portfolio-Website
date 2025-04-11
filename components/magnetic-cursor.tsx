"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Create springs for smoother movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (!isVisible) setIsVisible(true)

      // Check if hovering over clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY)
      const isClickable =
        element?.tagName === "BUTTON" ||
        element?.tagName === "A" ||
        element?.closest("button") ||
        element?.closest("a") ||
        getComputedStyle(element as Element).cursor === "pointer"

      setIsPointer(!!isClickable)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          borderWidth: isPointer ? 1.5 : 0,
          backgroundColor: isPointer ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 1)",
          borderColor: "rgba(255, 255, 255, 1)",
        }}
        transition={{ duration: 0.15 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99] bg-gradient-to-r from-fuchsia-500 to-blue-500 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.7 : 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />
    </>
  )
}
