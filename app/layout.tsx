"use client"

import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

// export const metadata: Metadata = {
//   title: "Thomas James | Developer",
//   description:
//     "Portfolio of Thomas James, a CSE student at NIT Calicut specializing in systems programming and web development.",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate assets loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans ${isLoading ? "no-fouc" : "fouc-ready"}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'