'use client'

import { motion } from 'framer-motion'
import { Microscope, Recycle, Zap, Award } from 'lucide-react'

const technologies = [
  {
    icon: Microscope,
    title: 'Nano-Fiber Extraction',
    description: 'Advanced extraction techniques that preserve the unique properties of marine materials while ensuring sustainable harvesting.',
    features: ['Molecular-level precision', 'Zero-waste process', 'Scalable production']
  },
  {
    icon: Recycle,
    title: 'Sustainable Processing',
    description: 'Our proprietary processing methods minimize environmental impact while maximizing material performance.',
    features: ['Renewable energy powered', 'Closed-loop system', 'Carbon negative']
  },
  {
    icon: Zap,
    title: 'Enhanced Performance',
    description: 'Marine nano-fibers exhibit superior strength, flexibility, and biocompatibility compared to synthetic alternatives.',
    features: ['10x stronger than steel', 'Biodegradable', 'Hypoallergenic']
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control ensure consistent, premium-grade materials for luxury applications.',
    features: ['ISO certified', 'Lab tested', 'Guaranteed purity']
  }
]

export function Technology() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-marine mb-6">
            Cutting-Edge Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proprietary marine nano-fiber technology represents a breakthrough in sustainable material science, 
            offering unprecedented performance while protecting our oceans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 marine-gradient rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <tech.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-marine mb-3">
                      {tech.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tech.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {tech.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-marine-teal rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-marine text-center mb-12">
            Our Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Marine Sourcing', desc: 'Sustainable collection from certified marine farms' },
              { step: '02', title: 'Extraction', desc: 'Nano-fiber extraction using proprietary methods' },
              { step: '03', title: 'Processing', desc: 'Enhancement and purification for optimal properties' },
              { step: '04', title: 'Application', desc: 'Integration into luxury beauty and lifestyle products' }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 marine-gradient rounded-full text-white font-bold text-lg mb-4">
                  {process.step}
                </div>
                <h4 className="text-lg font-semibold text-marine mb-2">
                  {process.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {process.desc}
                </p>
                
                {/* Arrow for desktop */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-marine-teal" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}