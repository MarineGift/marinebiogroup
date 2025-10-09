'use client'

import { motion } from 'framer-motion'

const processes = [
  {
    step: '01',
    title: 'Marine Sourcing',
    description: 'Sustainable collection from certified marine farms using environmentally responsible methods.',
    details: ['Certified sustainable sources', 'Zero environmental impact', 'Traceable supply chain']
  },
  {
    step: '02', 
    title: 'Nano-Fiber Extraction',
    description: 'Advanced extraction techniques that preserve unique marine material properties.',
    details: ['Molecular-level precision', 'Proprietary extraction method', 'Quality preservation']
  },
  {
    step: '03',
    title: 'Enhancement Processing',
    description: 'Purification and enhancement to optimize material performance characteristics.',
    details: ['Advanced purification', 'Performance optimization', 'Quality control testing']
  },
  {
    step: '04',
    title: 'Product Integration',
    description: 'Seamless integration into luxury beauty and lifestyle product formulations.',
    details: ['Custom formulations', 'Luxury applications', 'Premium quality assurance']
  }
]

export function TechProcess() {
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
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-6">
            Our Manufacturing Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ocean to application, our carefully designed process ensures the highest quality and sustainability standards.
          </p>
        </motion.div>

        <div className="space-y-16">
          {processes.map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 marine-gradient rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                    {process.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-marine">
                    {process.title}
                  </h3>
                </div>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {process.description}
                </p>
                
                <ul className="space-y-3">
                  {process.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-marine-teal rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-ocean-light to-ocean-medium rounded-2xl flex items-center justify-center">
                    <div className="text-center text-marine">
                      <div className="w-24 h-24 marine-gradient rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4 mx-auto">
                        {process.step}
                      </div>
                      <p className="font-semibold">{process.title}</p>
                    </div>
                  </div>
                  
                  {/* Connection line for non-last items */}
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-marine/20" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}