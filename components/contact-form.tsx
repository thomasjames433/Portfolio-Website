"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { motion, useInView } from "framer-motion"
import LiquidButton from "@/components/liquid-button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true, amount: 0.3 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (name: string) => {
    setFocusedField(name)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-2xl rounded-2xl p-10 border border-white/10 hover:border-blue-500/30 transition-colors duration-500 relative overflow-hidden"
      variants={formVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <motion.div
        className="absolute -top-40 -right-40 h-80 w-80 bg-blue-500 rounded-full blur-3xl"
        animate={{ opacity: [0.02, 0.05, 0.02], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-40 -left-40 h-80 w-80 bg-fuchsia-500 rounded-full blur-3xl"
        animate={{ opacity: [0.02, 0.05, 0.02], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
      ></motion.div>

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-2xl blur opacity-0 hover:opacity-20 transition-opacity duration-500 z-0"></div>

      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-fuchsia-500/5 mix-blend-overlay pointer-events-none holographic-effect opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

      {isSubmitted ? (
        <motion.div
          className="flex flex-col items-center justify-center h-full py-20 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500 to-blue-500 flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </motion.div>
          <motion.h3
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Message Sent!
          </motion.h3>
          <motion.p
            className="text-white/70 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Thanks for reaching out. I'll get back to you soon.
          </motion.p>
        </motion.div>
      ) : (
        <div className="space-y-8 relative z-10">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
              Name
            </label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500 focus-visible:border-blue-500/50 h-14 text-lg pr-10"
                placeholder="Your name"
                disabled={isSubmitting}
              />
              <motion.div
                className="absolute inset-0 border border-blue-500/50 rounded-md pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: focusedField === "name" ? 1 : 0,
                  scale: focusedField === "name" ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              ></motion.div>

              {/* Particle effect on focus */}
              {focusedField === "name" && <InputParticles />}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500 focus-visible:border-blue-500/50 h-14 text-lg"
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              <motion.div
                className="absolute inset-0 border border-blue-500/50 rounded-md pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: focusedField === "email" ? 1 : 0,
                  scale: focusedField === "email" ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              ></motion.div>

              {/* Particle effect on focus */}
              {focusedField === "email" && <InputParticles />}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
              Message
            </label>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500 focus-visible:border-blue-500/50 min-h-[180px] text-lg"
                placeholder="Tell me about your project or inquiry..."
                disabled={isSubmitting}
              />
              <motion.div
                className="absolute inset-0 border border-blue-500/50 rounded-md pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: focusedField === "message" ? 1 : 0,
                  scale: focusedField === "message" ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
              ></motion.div>

              {/* Particle effect on focus */}
              {focusedField === "message" && <InputParticles />}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <LiquidButton type="submit" variant="primary" className="w-full py-6 text-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <span className="ml-2">Sending...</span>
                </motion.div>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </span>
              )}
            </LiquidButton>
          </motion.div>
        </div>
      )}
    </motion.form>
  )
}

function InputParticles() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`input-particle-${index}`}
          className="absolute w-1 h-1 rounded-full bg-blue-500"
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
            duration: 1 + Math.random() * 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: index * 0.1,
          }}
          style={{
            boxShadow: "0 0 4px rgba(59, 130, 246, 0.5)",
          }}
        />
      ))}
    </>
  )
}
