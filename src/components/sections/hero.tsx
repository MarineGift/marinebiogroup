'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-marine-50 to-marine-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Marine Nano-Fiber
            <span className="marine-text-gradient"> Technology</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Pioneering sustainable beauty and lifestyle products through innovative marine biotechnology solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-marine-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-marine-700 transition-colors flex items-center space-x-2">
              <span>Explore Our Technology</span>
              <Play className="h-5 w-5" />
            </button>
            
            <button className="border-2 border-marine-600 text-marine-600 px-8 py-4 rounded-lg font-semibold hover:bg-marine-600 hover:text-white transition-colors">
              Learn More
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="h-6 w-6 text-marine-600 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}