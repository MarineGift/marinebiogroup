'use client'

import { motion } from 'framer-motion'
import { Waves, Leaf, Shield, Lightbulb } from 'lucide-react'

const features = [
  {
    icon: Waves,
    title: 'Marine Innovation',
    description: 'Harnessing the power of ocean-derived nano-fibers for revolutionary applications'
  },
  {
    icon: Leaf,
    title: 'Sustainable Solutions',
    description: 'Eco-friendly biotechnology that protects our marine ecosystems'
  },
  {
    icon: Shield,
    title: 'Advanced Protection',
    description: 'Superior durability and performance in beauty and lifestyle products'
  },
  {
    icon: Lightbulb,
    title: 'Cutting-Edge Research',
    description: 'Pioneering scientific breakthroughs in marine biotechnology'
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose MarineBioGroup?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge marine science with sustainable innovation to create
            products that benefit both people and the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="marine-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}