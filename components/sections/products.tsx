'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const products = [
  {
    id: 1,
    name: 'Marine Glow Serum',
    category: 'Skincare',
    description: 'Revolutionary anti-aging serum powered by marine nano-fibers for radiant, youthful skin.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    features: ['Deep hydration', 'Anti-aging', 'Natural glow'],
    price: '$89',
    rating: 4.9
  },
  {
    id: 2,
    name: 'Ocean Fiber Cleanser',
    category: 'Skincare',
    description: 'Gentle yet effective cleanser that removes impurities while nourishing with marine minerals.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop',
    features: ['Deep cleansing', 'Mineral rich', 'pH balanced'],
    price: '$45',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Marine Luxury Cream',
    category: 'Skincare',
    description: 'Premium moisturizing cream infused with marine nano-fibers for ultimate skin rejuvenation.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    features: ['24h moisturizing', 'Skin barrier repair', 'Luxury texture'],
    price: '$129',
    rating: 5.0
  },
  {
    id: 4,
    name: 'Sustainable Face Mask',
    category: 'Treatment',
    description: 'Weekly treatment mask made from marine bio-materials for deep skin renewal.',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    features: ['Weekly treatment', 'Bio-degradable', 'Intensive care'],
    price: '$65',
    rating: 4.7
  }
]

export function Products() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-marine mb-6">
            Premium Marine Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of marine nano-fiber technology in our carefully crafted 
            collection of luxury beauty and wellness products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-marine text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-marine mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-ocean-light text-marine px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-marine">
                      {product.price}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-marine hover:bg-marine/90 text-white"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { icon: Sparkles, title: 'Premium Quality', desc: 'Luxury ingredients from sustainable marine sources' },
            { icon: Heart, title: 'Skin Loving', desc: 'Gentle formulations suitable for all skin types' },
            { icon: Shield, title: 'Scientifically Proven', desc: 'Clinically tested and dermatologist approved' },
            { icon: Star, title: 'Award Winning', desc: 'Recognized by leading beauty industry experts' }
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 marine-gradient rounded-full mb-4">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-marine mb-2">
                {benefit.title}
              </h4>
              <p className="text-gray-600 text-sm">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 marine-gradient rounded-2xl text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Experience Marine Innovation
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the transformative power of marine nano-fiber technology.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-marine hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Shop Collection
          </Button>
        </motion.div>
      </div>
    </section>
  )
}