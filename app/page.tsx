"use client"

import { Github, Linkedin, Mail, ArrowRight, ExternalLink, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProjectGallery from "@/components/project-gallery"
import TechStack from "@/components/tech-stack"
import SkillsGrid from "@/components/skills-grid"
import ContactForm from "@/components/contact-form"
import WebGLBackground from "@/components/webgl-background"
import ScrollIndicator from "@/components/scroll-indicator"
import AnimatedText from "@/components/animated-text"
import MagneticCursor from "@/components/magnetic-cursor"
import HeroScene from "@/components/hero-scene"
import ScrollProgress from "@/components/scroll-progress"
import FloatingElements from "@/components/floating-elements"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import SoundEffects from "@/components/sound-effects"
import ParallaxSection from "@/components/parallax-section"
import { useInView } from "react-intersection-observer"
import NoiseFilter from "@/components/noise-filter"
import LiquidButton from "@/components/liquid-button"
import GlitchText from "@/components/glitch-text"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [soundEnabled, setSoundEnabled] = useState(false)

  const featuredProjects = [
    {
      id: 1,
      title: "My Experimental OS",
      category: "Systems Programming",
      description:
        "A custom operating system implementing various OS data structures and kernel routines capable of loading into memory and executing programs.",
      image: "/placeholder.svg?height=600&width=800",
      link: "https://github.com/thomasjames433/myexpos",
    },
    {
      id: 2,
      title: "AI-Enhanced Video Chat Platform",
      category: "Web Development",
      description:
        "A video chatting website that allows random matches, group calls, and one-on-one calls. Features AI-powered sign language conversion, speech-to-text, and intelligent user matching algorithms.",
      image: "/placeholder.svg?height=600&width=800",
      link: "https://github.com/thomasjames433/myexpos",
    },
  ]

  const otherProjects = [
    {
      id: 3,
      title: "Tic Tac Toe with AI",
      category: "Algorithms",
      description: "An implementation of the classic game with an unbeatable AI using the minimax algorithm.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      id: 4,
      title: "URL Shortener",
      category: "Web Development",
      description: "A URL shortening service built with Django, Celery, and Redis for efficient request handling.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      id: 5,
      title: "Movie Recommendation System",
      category: "Machine Learning",
      description: "An ML-based system that recommends movies based on user preferences and viewing history.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
    {
      id: 6,
      title: "Hall Booking System",
      category: "Backend Development",
      description: "A FastAPI-based application for managing and booking halls and venues.",
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
    },
  ]

  // Intersection observers for each section
  const [heroRef, heroInView] = useInView({ threshold: 0.5 })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2 })
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2 })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2 })
  const [contactRef, contactInView] = useInView({ threshold: 0.2 })

  // Update active section based on scroll position
  useEffect(() => {
    if (heroInView) setActiveSection("hero")
    else if (projectsInView) setActiveSection("projects")
    else if (aboutInView) setActiveSection("about")
    else if (skillsInView) setActiveSection("skills")
    else if (contactInView) setActiveSection("contact")
  }, [heroInView, projectsInView, aboutInView, skillsInView, contactInView])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <GlitchText text="THOMAS JAMES" className="text-6xl font-bold text-white" />
              <motion.div
                className="mt-4 h-1 w-0 bg-gradient-to-r from-fuchsia-600 to-blue-600"
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-4 text-white/60"
              >
                Initializing Experience...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SoundEffects enabled={soundEnabled} activeSection={activeSection} />
      <MagneticCursor />
      <NoiseFilter />
      <ScrollProgress />
      <WebGLBackground />

      <div ref={containerRef} className="relative">
        {/* Navigation */}
        <motion.nav
          className="fixed w-full z-50 bg-black/5 backdrop-blur-xl border-b border-white/5"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold tracking-tight relative group">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Thomas</span>
                <span className="text-fuchsia-500">.</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <div className="hidden md:flex space-x-10">
                {[
                  { name: "projects", ref: "#projects" },
                  { name: "about", ref: "#about" },
                  { name: "skills", ref: "#skills" },
                  { name: "contact", ref: "#contact" },
                ].map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.ref}
                    className={`text-white/70 hover:text-white transition-colors relative group uppercase text-sm tracking-wider ${
                      activeSection === item.name ? "text-white" : ""
                    }`}
                  >
                    <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-500 group-hover:to-blue-500 transition-all duration-300">
                      {item.name}
                    </span>
                    <motion.span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-500 ${
                        activeSection === item.name ? "w-full" : "w-0"
                      }`}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      animate={{ width: activeSection === item.name ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-full ${
                    soundEnabled ? "bg-fuchsia-500/20" : "bg-white/5"
                  } transition-colors duration-300`}
                  aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ scale: soundEnabled ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {soundEnabled ? (
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </>
                    ) : (
                      <>
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </>
                    )}
                  </motion.svg>
                </button>
                <LiquidButton asChild>
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Get in Touch</span>
                  </a>
                </LiquidButton>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <HeroScene />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
          <FloatingElements />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white/80 text-sm font-medium mb-6"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <GlitchText text="Developer & CSE Student" className="text-sm" />
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
                  <AnimatedText delay={2.6}>
                    <span className="block">Thomas</span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500">
                      James
                    </span>
                  </AnimatedText>
                </h1>
                <motion.p
                  className="text-xl text-white/70 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0, duration: 0.8 }}
                >
                  Building innovative solutions at National Institute of Technology Calicut, specializing in systems
                  programming and web development.
                </motion.p>
                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2, duration: 0.8 }}
                >
                  <LiquidButton asChild variant="primary" className="px-8 py-6 text-lg">
                    <a href="#projects">
                      View My Projects
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </LiquidButton>
                  <LiquidButton asChild variant="outline" className="px-8 py-6 text-lg">
                    <a href="#about">About Me</a>
                  </LiquidButton>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative perspective"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-blue-600/20 z-10 mix-blend-overlay"></div>
                  <Image
                    src="/placeholder.svg?height=1000&width=800"
                    alt="Thomas James"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 z-20 mix-blend-overlay pointer-events-none holographic-effect"></div>
                </motion.div>
                <motion.div
                  className="absolute -bottom-6 -left-6 h-32 w-32 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full blur-2xl"
                  animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute -top-6 -right-6 h-24 w-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl"
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                ></motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-10 -left-10 h-20 w-20 border border-fuchsia-500/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-10 -right-10 h-20 w-20 border border-blue-500/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="absolute top-1/2 -right-5 h-10 w-10 bg-fuchsia-500/20 backdrop-blur-md rounded-full border border-fuchsia-500/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-1/3 -left-5 h-10 w-10 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                ></motion.div>
              </motion.div>
            </div>
          </div>

          <ScrollIndicator href="#projects">
            <ChevronDown className="h-6 w-6 animate-bounce" />
            <span className="sr-only">Scroll down</span>
          </ScrollIndicator>
        </section>

        {/* Featured Projects Section */}
        <ParallaxSection id="projects" ref={projectsRef} className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <motion.div style={{ y: y1 }} className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
              <div>
                <motion.p
                  className="text-blue-400 font-medium mb-2 uppercase tracking-wider text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Featured Projects
                </motion.p>
                <motion.h2
                  className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlitchText text="My Work" className="text-5xl font-bold" />
                </motion.h2>
              </div>
              <motion.p
                className="text-white/60 max-w-md mt-4 md:mt-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                A collection of projects that showcase my technical skills and problem-solving abilities.
              </motion.p>
            </div>

            {/* Featured Projects */}
            <div className="space-y-40">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="relative group perspective">
                    <motion.div
                      className="relative h-[350px] md:h-[450px] w-full rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:border-blue-500/50"
                      whileHover={{
                        scale: 1.05,
                        rotateY: index % 2 === 0 ? 12 : -12,
                        transition: { duration: 0.7 },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-blue-600/20 z-10 mix-blend-overlay"></div>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 z-20 mix-blend-overlay pointer-events-none holographic-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.div>
                    <motion.div
                      className={`absolute -z-10 ${
                        index % 2 === 0 ? "-bottom-6 -right-6" : "-bottom-6 -left-6"
                      } h-32 w-32 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-full blur-2xl`}
                      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    ></motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      className={`absolute ${
                        index % 2 === 0 ? "-top-10 -left-10" : "-top-10 -right-10"
                      } h-20 w-20 border border-blue-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    ></motion.div>
                    <motion.div
                      className={`absolute ${
                        index % 2 === 0 ? "top-1/3 -right-5" : "top-1/3 -left-5"
                      } h-10 w-10 bg-fuchsia-500/20 backdrop-blur-md rounded-full border border-fuchsia-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    ></motion.div>
                  </div>
                  <div className={index % 2 === 1 ? "md:pr-12" : "md:pl-12"}>
                    <motion.span
                      className="text-blue-400 font-medium uppercase tracking-wider text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      {project.category}
                    </motion.span>
                    <motion.h3
                      className="text-4xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-white/60 mb-8 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <LiquidButton asChild variant="secondary">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </LiquidButton>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ParallaxSection>

        {/* Other Projects Gallery */}
        <ParallaxSection className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
          <motion.div style={{ y: y2 }} className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.p
                className="text-fuchsia-400 font-medium mb-2 uppercase tracking-wider text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Explore More
              </motion.p>
              <motion.h2
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-100 to-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <GlitchText text="Other Projects" className="text-5xl font-bold" />
              </motion.h2>
              <motion.p
                className="text-white/60 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                A selection of additional projects that demonstrate my range of skills and interests.
              </motion.p>
            </div>

            <ProjectGallery projects={otherProjects} />
          </motion.div>
        </ParallaxSection>

        {/* About Section */}
        <ParallaxSection id="about" ref={aboutRef} className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <motion.div style={{ y: y3 }} className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="relative order-2 md:order-1 perspective">
                <motion.div
                  className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10"
                  initial={{ opacity: 0, x: -50, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotateY: 6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-fuchsia-600/20 z-10 mix-blend-overlay"></div>
                  <Image
                    src="/placeholder.svg?height=1200&width=800"
                    alt="Thomas James"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-fuchsia-500/10 z-20 mix-blend-overlay pointer-events-none holographic-effect"></div>
                </motion.div>
                <motion.div
                  className="absolute -top-8 -left-8 h-40 w-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl"
                  animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-8 -right-8 h-32 w-32 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                ></motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-10 -right-10 h-20 w-20 border border-blue-500/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-10 -left-10 h-20 w-20 border border-fuchsia-500/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="absolute top-1/3 -left-5 h-10 w-10 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-1/4 -right-5 h-10 w-10 bg-fuchsia-500/20 backdrop-blur-md rounded-full border border-fuchsia-500/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                ></motion.div>
              </div>
              <div className="order-1 md:order-2">
                <motion.p
                  className="text-blue-400 font-medium mb-2 uppercase tracking-wider text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.p>
                <motion.h2
                  className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlitchText text="Thomas James" className="text-5xl font-bold" />
                </motion.h2>
                <motion.p
                  className="text-2xl text-blue-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Developer at National Institute of Technology Calicut
                </motion.p>
                <div className="space-y-6 text-white/70 text-lg">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    I'm a second-year Computer Science and Engineering student passionate about building innovative
                    software solutions that solve real-world problems.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    My interests span from low-level systems programming to full-stack web development and artificial
                    intelligence. I enjoy tackling complex challenges and continuously expanding my technical knowledge.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    As a Senior Executive at Google Developers Students Club NITC, I help organize workshops,
                    hackathons, and other technical events to foster a culture of innovation on campus.
                  </motion.p>
                </div>
                <motion.div
                  className="flex space-x-4 mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <LiquidButton asChild variant="outline">
                    <a href="https://github.com/thomasjames433" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5 relative z-10" />
                      <span className="relative z-10">GitHub</span>
                    </a>
                  </LiquidButton>
                  <LiquidButton asChild variant="outline">
                    <a href="https://linkedin.com/in/thomasjames433" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5 relative z-10" />
                      <span className="relative z-10">LinkedIn</span>
                    </a>
                  </LiquidButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ParallaxSection>

        {/* Tech Stack Section */}
        <ParallaxSection className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
          <motion.div style={{ y: y1 }} className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.p
                className="text-fuchsia-400 font-medium mb-2 uppercase tracking-wider text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Technologies
              </motion.p>
              <motion.h2
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-100 to-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <GlitchText text="Tech Stack" className="text-5xl font-bold" />
              </motion.h2>
              <motion.p
                className="text-white/60 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                The technologies and tools I use to build robust and scalable applications.
              </motion.p>
            </div>

            <TechStack />
          </motion.div>
        </ParallaxSection>

        {/* LeetCode Stats Section */}
        <ParallaxSection className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <motion.div style={{ y: y2 }} className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.p
                className="text-blue-400 font-medium mb-2 uppercase tracking-wider text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Problem Solving
              </motion.p>
              <motion.h2
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <GlitchText text="LeetCode Progress" className="text-5xl font-bold" />
              </motion.h2>
              <motion.p
                className="text-white/60 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                I've solved over 200 algorithmic problems, demonstrating my analytical thinking and problem-solving
                abilities.
              </motion.p>
            </div>

            <motion.div
              className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl shadow-lg p-10 border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                className="absolute -top-40 -right-40 h-80 w-80 bg-blue-500 rounded-full blur-3xl"
                animate={{ opacity: [0, 0.05, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-40 -left-40 h-80 w-80 bg-fuchsia-500 rounded-full blur-3xl"
                animate={{ opacity: [0, 0.05, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
              ></motion.div>

              {/* Holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-fuchsia-500/5 z-0 mix-blend-overlay pointer-events-none holographic-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                      thomasjames_433
                    </h3>
                    <p className="text-white/60 mt-1">LeetCode Profile</p>
                  </div>
                  <motion.div
                    className="bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-full px-8 py-4 font-bold text-xl shadow-lg shadow-fuchsia-500/10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    200+ Problems Solved
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    className="bg-white/5 backdrop-blur-2xl rounded-xl p-8 text-center border border-white/10 hover:border-green-500/50 transition-all duration-300 group/card relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-green-400/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      className="text-5xl font-bold text-green-400 mb-3 relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      120
                    </motion.div>
                    <p className="text-green-400 font-medium text-lg relative">Easy Problems</p>
                    <div className="w-full bg-white/10 rounded-full h-3 mt-6 relative overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full relative z-10"
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/5 backdrop-blur-2xl rounded-xl p-8 text-center border border-white/10 hover:border-yellow-500/50 transition-all duration-300 group/card relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-yellow-400/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      className="text-5xl font-bold text-yellow-400 mb-3 relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
                    >
                      65
                    </motion.div>
                    <p className="text-yellow-400 font-medium text-lg relative">Medium Problems</p>
                    <div className="w-full bg-white/10 rounded-full h-3 mt-6 relative overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full relative z-10"
                        initial={{ width: 0 }}
                        whileInView={{ width: "32.5%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/5 backdrop-blur-2xl rounded-xl p-8 text-center border border-white/10 hover:border-red-500/50 transition-all duration-300 group/card relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-red-400/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    <motion.div
                      className="text-5xl font-bold text-red-400 mb-3 relative"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
                    >
                      15
                    </motion.div>
                    <p className="text-red-400 font-medium text-lg relative">Hard Problems</p>
                    <div className="w-full bg-white/10 rounded-full h-3 mt-6 relative overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full relative z-10"
                        initial={{ width: 0 }}
                        whileInView={{ width: "7.5%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* Skills Section */}
        <ParallaxSection id="skills" ref={skillsRef} className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
          <motion.div style={{ y: y3 }} className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <motion.p
                className="text-fuchsia-400 font-medium mb-2 uppercase tracking-wider text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Expertise
              </motion.p>
              <motion.h2
                className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-100 to-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <GlitchText text="Skills" className="text-5xl font-bold" />
              </motion.h2>
              <motion.p
                className="text-white/60 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Technical skills that I've developed through projects and coursework.
              </motion.p>
            </div>

            <SkillsGrid />
          </motion.div>
        </ParallaxSection>

        {/* Contact Section */}
        <ParallaxSection id="contact" ref={contactRef} className="py-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-black to-black z-0"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <motion.div style={{ y: y1 }} className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-blue-400 font-medium mb-2 uppercase tracking-wider text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Get in Touch
                </motion.p>
                <motion.h2
                  className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlitchText text="Let's Connect" className="text-5xl font-bold" />
                </motion.h2>
                <motion.p
                  className="text-white/70 mb-10 text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Have a project in mind or just want to connect? I'd love to hear from you. Fill out the form or reach
                  out through any of the channels below.
                </motion.p>

                <div className="space-y-8">
                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center mr-4 group-hover:border-blue-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Mail className="h-6 w-6 text-blue-400" />
                    </motion.div>
                    <a
                      href="mailto:thomaspjames433@gmail.com"
                      className="text-white/70 hover:text-white transition-colors text-lg group-hover:text-blue-400"
                    >
                      thomaspjames433@gmail.com
                    </a>
                  </motion.div>
                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center mr-4 group-hover:border-blue-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Github className="h-6 w-6 text-blue-400" />
                    </motion.div>
                    <a
                      href="https://github.com/thomasjames433"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-lg group-hover:text-blue-400"
                    >
                      github.com/thomasjames433
                    </a>
                  </motion.div>
                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-12 w-12 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center mr-4 group-hover:border-blue-500/50 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Linkedin className="h-6 w-6 text-blue-400" />
                    </motion.div>
                    <a
                      href="https://linkedin.com/in/thomasjames433"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors text-lg group-hover:text-blue-400"
                    >
                      linkedin.com/in/thomasjames433
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </ParallaxSection>

        {/* Footer */}
        <footer className="bg-black text-white/40 py-8 border-t border-white/5">
          <div className="container mx-auto px-6 text-center">
            <p>© {new Date().getFullYear()} Thomas James. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
