'use client'

import { motion } from 'framer-motion'
import { Waves, Leaf, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Waves,
    title: 'Marine-Based Innovation',
    description: 'Advanced nano-fiber extraction from sustainable marine sources, revolutionizing material science.'
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Process',
    description: 'Zero-waste production methods that protect marine ecosystems while creating premium materials.'
  },
  {
    icon: Shield,
    title: 'Superior Quality',
    description: 'Unmatched durability and performance characteristics that exceed traditional alternatives.'
  },
  {
    icon: Sparkles,
    title: 'Luxury Applications',
    description: 'Premium applications in beauty, fashion, and lifestyle products for discerning consumers.'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-ocean-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-marine mb-6">
            Why Choose Marine Technology?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our innovative approach combines cutting-edge science with environmental responsibility, 
            creating products that benefit both consumers and the planet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 marine-gradient rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-marine mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: '50+', label: 'Research Projects' },
            { number: '99%', label: 'Sustainability Rate' },
            { number: '100K+', label: 'Products Delivered' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <div className="text-4xl md:text-5xl font-bold text-marine mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}