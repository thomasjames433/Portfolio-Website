"use client"

import type React from "react"

import { forwardRef, type ReactNode, useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface LiquidButtonProps extends ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
}

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ children, variant = "primary", className = "", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Get button variant styles
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return "bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 border-0 shadow-lg shadow-fuchsia-500/20 text-white rounded-full"
        case "secondary":
          return "bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white rounded-full"
        case "outline":
          return "border-white/20 text-white hover:bg-white/10 rounded-full"
        default:
          return "bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-700 hover:to-blue-700 border-0 shadow-lg shadow-fuchsia-500/20 text-white rounded-full"
      }
    }

    // Handle mouse move for liquid effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    // Animate liquid blob
    useEffect(() => {
      if (!buttonRef.current || !isHovered) return

      const button = buttonRef.current
      const blob = document.createElement("div")

      blob.className = "absolute rounded-full mix-blend-screen pointer-events-none"

      if (variant === "primary") {
        blob.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
      } else {
        blob.style.background =
          "radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(255,255,255,0) 70%)"
      }

      blob.style.left = `${mousePosition.x}px`
      blob.style.top = `${mousePosition.y}px`
      blob.style.width = "150px"
      blob.style.height = "150px"
      blob.style.transform = "translate(-50%, -50%)"
      blob.style.opacity = "0"
      blob.style.transition = "opacity 0.3s"

      button.appendChild(blob)

      // Fade in
      setTimeout(() => {
        blob.style.opacity = "1"
      }, 10)

      // Remove after animation
      setTimeout(() => {
        blob.style.opacity = "0"
        setTimeout(() => {
          if (button.contains(blob)) {
            button.removeChild(blob)
          }
        }, 300)
      }, 1000)

      return () => {
        if (button.contains(blob)) {
          button.removeChild(blob)
        }
      }
    }, [mousePosition, isHovered, variant])

    return (
      <Button
        ref={(node) => {
          // Handle both refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          if (buttonRef.current !== node) {
            buttonRef.current = node
          }
        }}
        className={`${getVariantStyles()} relative overflow-hidden group ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {/* Background gradient */}
        <motion.span
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-fuchsia-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            opacity: variant !== "primary" ? 0 : undefined,
            display: variant === "primary" ? "none" : "block",
          }}
        ></motion.span>

        {/* Content */}
        <motion.span
          className="relative z-10 flex items-center"
          animate={{
            scale: isHovered ? [1, 1.03, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>

        {/* Glow effect */}
        <motion.span
          className="absolute -inset-1 rounded-full blur-md z-0 bg-gradient-to-r from-fuchsia-500/50 to-blue-500/50 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{ display: variant === "outline" ? "none" : "block" }}
        ></motion.span>
      </Button>
    )
  },
)

LiquidButton.displayName = "LiquidButton"

export default LiquidButton
