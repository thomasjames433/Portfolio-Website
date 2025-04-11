"use client"

import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  enabled: boolean
  activeSection: string
}

export default function SoundEffects({ enabled, activeSection }: SoundEffectsProps) {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const scrollSoundRef = useRef<HTMLAudioElement | null>(null)
  const ambientSoundRef = useRef<HTMLAudioElement | null>(null)
  const lastSectionRef = useRef<string>(activeSection)

  // Initialize audio elements
  useEffect(() => {
    hoverSoundRef.current = new Audio("/hover.mp3") // Replace with actual sound files
    hoverSoundRef.current.volume = 0.2

    clickSoundRef.current = new Audio("/click.mp3")
    clickSoundRef.current.volume = 0.3

    scrollSoundRef.current = new Audio("/scroll.mp3")
    scrollSoundRef.current.volume = 0.15

    ambientSoundRef.current = new Audio("/ambient.mp3")
    ambientSoundRef.current.volume = 0.1
    ambientSoundRef.current.loop = true

    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause()
      }
    }
  }, [])

  // Handle ambient sound based on enabled state
  useEffect(() => {
    if (!ambientSoundRef.current) return

    if (enabled) {
      ambientSoundRef.current.play().catch(() => {
        // Autoplay was prevented, we'll need user interaction
        console.log("Autoplay prevented")
      })
    } else {
      ambientSoundRef.current.pause()
    }
  }, [enabled])

  // Play section change sound
  useEffect(() => {
    if (!enabled || !scrollSoundRef.current || activeSection === lastSectionRef.current) return

    scrollSoundRef.current.currentTime = 0
    scrollSoundRef.current.play().catch(() => {
      // Autoplay was prevented
    })

    lastSectionRef.current = activeSection
  }, [activeSection, enabled])

  // Add event listeners for hover and click sounds
  useEffect(() => {
    if (!enabled) return

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        getComputedStyle(target).cursor === "pointer"
      ) {
        if (hoverSoundRef.current) {
          hoverSoundRef.current.currentTime = 0
          hoverSoundRef.current.play().catch(() => {
            // Autoplay was prevented
          })
        }
      }
    }

    const handleMouseClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        getComputedStyle(target).cursor === "pointer"
      ) {
        if (clickSoundRef.current) {
          clickSoundRef.current.currentTime = 0
          clickSoundRef.current.play().catch(() => {
            // Autoplay was prevented
          })
        }
      }
    }

    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("click", handleMouseClick)

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("click", handleMouseClick)
    }
  }, [enabled])

  return null
}
