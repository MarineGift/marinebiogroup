'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'

export function Mission() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              content: 'To revolutionize material science through sustainable marine nano-fiber technology, creating premium products that benefit both consumers and the environment.'
            },
            {
              icon: Eye,
              title: 'Our Vision',
              content: 'To become the global leader in marine-based sustainable materials, setting new standards for environmental responsibility in luxury product manufacturing.'
            },
            {
              icon: Heart,
              title: 'Our Values',
              content: 'Sustainability, innovation, quality, and environmental stewardship guide everything we do. We believe luxury and sustainability can coexist beautifully.'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 marine-gradient rounded-full mb-6">
                <item.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-marine mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}