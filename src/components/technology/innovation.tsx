'use client'

import { motion } from 'framer-motion'
import { Microscope, Atom, Dna, FlaskConical } from 'lucide-react'

const innovations = [
  {
    icon: Microscope,
    title: 'Molecular Precision',
    description: 'Advanced microscopy and molecular analysis ensure exact fiber specifications and optimal performance characteristics.'
  },
  {
    icon: Atom,
    title: 'Atomic Structure',
    description: 'Understanding and manipulating atomic-level structures to enhance material properties and sustainability.'
  },
  {
    icon: Dna,
    title: 'Bio-Compatibility',
    description: 'Marine nano-fibers naturally integrate with biological systems, providing superior skin compatibility.'
  },
  {
    icon: FlaskConical,
    title: 'Lab Innovation',
    description: 'Continuous research and development in our state-of-the-art laboratories drive technological advancement.'
  }
]

export function Innovation() {
  return (
    <section className="py-24 bg-gradient-to-b from-ocean-light/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-6">
            Scientific Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our breakthrough innovations in marine biotechnology set new standards for sustainable material science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 marine-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <innovation.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-marine mb-3">
                    {innovation.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {innovation.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-marine rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Fiber Diameter', value: '10-50 nm', desc: 'Nano-scale precision' },
              { label: 'Tensile Strength', value: '10x Steel', desc: 'Superior durability' },
              { label: 'Biodegradability', value: '100%', desc: 'Complete decomposition' }
            ].map((spec, index) => (
              <div key={spec.label} className="text-center">
                <div className="text-3xl font-bold text-marine-teal mb-2">
                  {spec.value}
                </div>
                <div className="font-semibold mb-1">
                  {spec.label}
                </div>
                <div className="text-sm opacity-80">
                  {spec.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}