'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-2xl font-bold text-marine mb-6">Contact Information</h3>
        <div className="space-y-6">
          {[
            {
              icon: Phone,
              title: 'Phone',
              content: '+1 (555) 123-4567',
              description: 'Monday to Friday, 9 AM - 6 PM PST'
            },
            {
              icon: Mail,
              title: 'Email',
              content: 'info@marinebiogroup.com',
              description: 'We\'ll respond within 24 hours'
            },
            {
              icon: MapPin,
              title: 'Office',
              content: 'San Francisco, CA',
              description: 'Main headquarters and research facility'
            },
            {
              icon: Clock,
              title: 'Business Hours',
              content: 'Mon - Fri: 9:00 AM - 6:00 PM',
              description: 'Pacific Standard Time'
            }
          ].map((item, index) => (
            <div key={item.title} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 marine-gradient rounded-lg">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-marine mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-900 font-medium">
                  {item.content}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="marine-gradient rounded-2xl p-8 text-white">
        <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
        <p className="text-marine-teal/90 mb-6">
          Get the latest news about marine technology innovations and product releases.
        </p>
        
        <div className="flex space-x-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Button className="bg-white text-marine hover:bg-gray-100 px-6">
            Subscribe
          </Button>
        </div>
      </div>
    </motion.div>
  )
}