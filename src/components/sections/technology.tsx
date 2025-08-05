'use client'

import { motion } from 'framer-motion'
import { Microscope, Beaker, Cpu } from 'lucide-react'

export default function Technology() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Revolutionary Marine Nano-Fiber Technology
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our patented process extracts and refines nano-fibers from sustainable marine sources,
              creating materials with unprecedented properties for beauty and lifestyle applications.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="marine-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Advanced Extraction
                  </h3>
                  <p className="text-gray-600">
                    Proprietary methods for harvesting nano-fibers while preserving marine ecosystems
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="marine-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                  <Beaker className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Precision Processing
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art refinement techniques that enhance fiber properties
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="marine-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                  <Cpu className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Smart Applications
                  </h3>
                  <p className="text-gray-600">
                    Integration into innovative products for enhanced performance and sustainability
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-marine-400 to-marine-600 rounded-2xl p-8 text-white">
              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-bold mb-4">Technology Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold">99.9%</div>
                    <div className="text-sm opacity-90">Purity Level</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">50x</div>
                    <div className="text-sm opacity-90">Stronger Fibers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm opacity-90">Sustainable</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">Production</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg opacity-90">
                  "Leading the future of marine biotechnology"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}