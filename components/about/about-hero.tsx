'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-marine to-marine-teal overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About MarineBioGroup
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Pioneering the future of sustainable materials through revolutionary marine nano-fiber technology.
          </p>
        </motion.div>
      </div>
    </section>
  )
}