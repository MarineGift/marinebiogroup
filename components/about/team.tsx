'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Marine biologist with 15+ years in sustainable materials research.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Dr. Michael Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Nanotechnology expert specializing in marine-based fiber extraction.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Emma Thompson',
    role: 'Head of Operations',
    bio: 'Former operations director at leading sustainable beauty brands.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
  },
  {
    name: 'Dr. James Park',
    role: 'Chief Research Officer',
    bio: 'PhD in Marine Chemistry with focus on sustainable extraction methods.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
  }
]

export function Team() {
  return (
    <section className="py-24 bg-ocean-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-6">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate experts driving innovation in marine biotechnology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative mb-6">
                <div
                  className="w-24 h-24 mx-auto rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-marine mb-2">
                {member.name}
              </h3>
              
              <p className="text-marine-teal font-medium mb-3">
                {member.role}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-3">
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-marine transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 text-gray-400 hover:text-marine transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}