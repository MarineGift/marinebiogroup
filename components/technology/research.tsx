'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, Target } from 'lucide-react'

const achievements = [
  {
    icon: Award,
    title: '15+ Patents',
    description: 'Proprietary technologies protected by international patents'
  },
  {
    icon: Users,
    title: '50+ Scientists',
    description: 'World-class research team from leading institutions'
  },
  {
    icon: BookOpen,
    title: '100+ Publications',
    description: 'Peer-reviewed research advancing marine biotechnology'
  },
  {
    icon: Target,
    title: '5 Years R&D',
    description: 'Continuous innovation and breakthrough discoveries'
  }
]

export function Research() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-6">
            Research & Development
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to scientific excellence drives continuous innovation in marine biotechnology and sustainable materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 marine-gradient rounded-full mb-6">
                <achievement.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-marine mb-3">
                {achievement.title}
              </h3>
              <p className="text-gray-600">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-marine mb-8 text-center">
            Active Research Areas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sustainable Extraction',
                focus: 'Developing zero-waste extraction methods that protect marine ecosystems'
              },
              {
                title: 'Material Enhancement',
                focus: 'Improving fiber strength, flexibility, and biocompatibility'
              },
              {
                title: 'Application Development',
                focus: 'Creating new applications in beauty, healthcare, and textiles'
              },
              {
                title: 'Environmental Impact',
                focus: 'Minimizing carbon footprint and maximizing sustainability'
              },
              {
                title: 'Quality Assurance',
                focus: 'Ensuring consistent, premium-grade material properties'
              },
              {
                title: 'Scalable Production',
                focus: 'Developing methods for large-scale manufacturing'
              }
            ].map((area, index) => (
              <div key={area.title} className="p-6 rounded-xl bg-ocean-light/50">
                <h4 className="font-semibold text-marine mb-3">
                  {area.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {area.focus}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="marine-gradient rounded-2xl p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Collaborate with Us
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Partner with our research team to advance marine biotechnology and develop sustainable solutions for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-marine px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Research Partnership
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                View Publications
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}