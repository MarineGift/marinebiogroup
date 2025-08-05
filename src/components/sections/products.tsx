'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield } from 'lucide-react'

const products = [
  {
    icon: Sparkles,
    title: 'Beauty & Skincare',
    description: 'Revolutionary skincare products with marine nano-fiber technology for enhanced absorption and protection.',
    features: ['Anti-aging properties', 'Deep hydration', 'Natural protection']
  },
  {
    icon: Heart,
    title: 'Wellness Products',
    description: 'Health and wellness solutions that harness the power of marine biotechnology for optimal well-being.',
    features: ['Biocompatible materials', 'Enhanced effectiveness', 'Natural ingredients']
  },
  {
    icon: Shield,
    title: 'Lifestyle Applications',
    description: 'Innovative lifestyle products that combine sustainability with performance for everyday use.',
    features: ['Durable materials', 'Eco-friendly', 'Superior performance']
  }
]

export default function Products() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Product Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our marine nano-fiber technology transforms everyday products
            into extraordinary solutions for beauty, wellness, and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="marine-gradient w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <product.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <ul className="space-y-2">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-marine-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="mt-6 w-full bg-marine-600 text-white py-3 rounded-lg font-semibold hover:bg-marine-700 transition-colors">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}