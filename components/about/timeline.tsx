'use client'

import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'MarineBioGroup was established with a vision to revolutionize sustainable materials.'
  },
  {
    year: '2020',
    title: 'First Breakthrough',
    description: 'Successfully developed our proprietary marine nano-fiber extraction process.'
  },
  {
    year: '2021',
    title: 'Patent Filed',
    description: 'Secured multiple patents for our innovative marine biotechnology processes.'
  },
  {
    year: '2022',
    title: 'First Products',
    description: 'Launched our premium skincare line featuring marine nano-fiber technology.'
  },
  {
    year: '2023',
    title: 'Scale Production',
    description: 'Expanded manufacturing capabilities and entered international markets.'
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Partnered with leading beauty brands worldwide, reaching over 100,000 customers.'
  }
]

export function Timeline() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-ocean-light/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-6">
            Our Journey
          </h2>
          <p className="text-xl text-gray-600">
            Key milestones in our mission to revolutionize sustainable materials.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-marine/20" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 marine-gradient rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {milestone.year.slice(2)}
                </div>
                
                {/* Content */}
                <div className="ml-8 bg-white rounded-2xl p-6 shadow-lg flex-grow">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-marine-teal mr-3">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-marine mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}