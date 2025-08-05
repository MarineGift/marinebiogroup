'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves, Mail, Phone, MapPin, Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: 'Thank you for your message. We\'ll get back to you soon.',
        })
        setFormData({ name: '', email: '', inquiryType: 'general', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 to-marine-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-marine-600" />
              <span className="text-2xl font-bold marine-text-gradient">MarineBioGroup</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-marine-600 transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-marine-600 transition-colors">About</Link>
              <Link href="/technology" className="text-gray-700 hover:text-marine-600 transition-colors">Technology</Link>
              <Link href="/products" className="text-gray-700 hover:text-marine-600 transition-colors">Products</Link>
              <Link href="/contact" className="text-marine-600 font-medium">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold marine-text-gradient mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team to learn more about our marine nano-fiber technology and partnership opportunities.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
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
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="investment">Investment</option>
                      <option value="technology">Technology</option>
                      <option value="media">Media</option>
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
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-marine-500 focus:border-marine-500"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full marine-gradient text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-marine-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <p className="text-gray-600">info@marinebiogroup.com</p>
                      <p className="text-gray-600">partnerships@marinebiogroup.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-marine-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Phone</h3>
                      <p className="text-gray-600">+82-2-1234-5678</p>
                      <p className="text-gray-600">+82-2-1234-5679 (International)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-marine-600 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Address</h3>
                      <p className="text-gray-600">
                        MarineBioGroup Headquarters<br />
                        123 Marine Technology Center<br />
                        Gangnam-gu, Seoul 06292<br />
                        South Korea
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="marine-gradient text-white">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM (KST)</p>
                    <p>Saturday: 10:00 AM - 2:00 PM (KST)</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Waves className="h-6 w-6 text-marine-400" />
            <span className="text-xl font-bold">MarineBioGroup</span>
          </div>
          <p className="text-gray-400 mb-4">
            Leading innovation in marine nano-fiber technology for sustainable future.
          </p>
          <p className="text-sm text-gray-500">&copy; 2024 MarineBioGroup. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}