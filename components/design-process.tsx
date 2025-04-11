"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react"

export default function DesignProcess() {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Research",
      description: "Understanding the problem space, user needs, and business goals through research and analysis.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Ideation",
      description: "Generating creative solutions and exploring different approaches to solve the identified problems.",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Design",
      description: "Creating wireframes, mockups, and high-fidelity designs that bring the solution to life.",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Development",
      description: "Implementing the design with clean, efficient code and attention to performance.",
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: "Testing",
      description: "Validating the solution through user testing and iterating based on feedback.",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch",
      description: "Deploying the final product and monitoring its performance to ensure success.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 flex items-center justify-center text-emerald-500 mb-6">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold mb-3">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
