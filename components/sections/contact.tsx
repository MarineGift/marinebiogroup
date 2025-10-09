'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: 'en',
          site: 'marinebiogroup'
        }),
      })

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        })
        setFormData({ name: '', email: '', inquiryType: 'general', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

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
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to explore marine nano-fiber technology? Contact our team of experts 
            to learn how our solutions can transform your products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-marine mb-6">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marine focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marine focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marine focus:border-transparent transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="investment">Investment</option>
                    <option value="product">Product Information</option>
                    <option value="research">Research Collaboration</option>
                    <option value="media">Media & Press</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marine focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-marine hover:bg-marine/90 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
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
            <div className="bg-marine-gradient rounded-2xl p-8 text-white">
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
        </div>
      </div>
    </section>
  )
}