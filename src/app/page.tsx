'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Waves, Leaf, Award, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface CarouselItem {
  id: string
  title: string
  description: string
  imageUrl: string
  buttonText: string
  buttonLink: string
}

export default function HomePage() {
  const [carousels, setCarousels] = useState<CarouselItem[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Mock carousel data - replace with actual API call
    const mockCarousels: CarouselItem[] = [
      {
        id: '1',
        title: 'Revolutionary Marine Nano-Fiber Technology',
        description: 'Leading the future of sustainable materials with breakthrough marine nano-fiber innovation.',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Discover Innovation',
        buttonLink: '/technology'
      },
      {
        id: '2', 
        title: 'Sustainable Beauty Solutions',
        description: 'Premium marine-based skincare products powered by advanced nano-fiber technology.',
        imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Explore Products',
        buttonLink: '/products'
      },
      {
        id: '3',
        title: 'Ocean Conservation Leadership',
        description: 'Committed to marine ecosystem protection through responsible innovation and research.',
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Learn More',
        buttonLink: '/about'
      }
    ]
    
    setCarousels(mockCarousels)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carousels.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [carousels.length])

  const features = [
    {
      icon: Waves,
      title: 'Marine Innovation',
      description: 'Revolutionary nano-fiber technology derived from sustainable marine sources'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: '100% biodegradable materials with minimal environmental impact'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'ISO certified processes ensuring premium product standards'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Leading marine biologists and materials scientists'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 to-marine-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-marine-600" />
              <span className="text-2xl font-bold marine-text-gradient">MarineBioGroup</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-marine-600 transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-marine-600 transition-colors">About</Link>
              <Link href="/technology" className="text-gray-700 hover:text-marine-600 transition-colors">Technology</Link>
              <Link href="/products" className="text-gray-700 hover:text-marine-600 transition-colors">Products</Link>
              <Link href="/contact" className="text-gray-700 hover:text-marine-600 transition-colors">Contact</Link>
              <Link href="/admin/login">
                <Button variant="outline" size="sm">Admin</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Carousel */}
      {carousels.length > 0 && (
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={carousels[currentSlide]?.imageUrl || ''}
              alt={carousels[currentSlide]?.title || ''}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {carousels[currentSlide]?.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                {carousels[currentSlide]?.description}
              </p>
              <Link href={carousels[currentSlide]?.buttonLink || '#'}>
                <Button size="lg" className="marine-gradient text-white hover:opacity-90">
                  {carousels[currentSlide]?.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carousels.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold marine-text-gradient mb-6">
              Leading Marine Innovation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering sustainable marine nano-fiber technology for next-generation beauty and lifestyle products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <feature.icon className="h-12 w-12 text-marine-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="marine-gradient py-20 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Dive Into Innovation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in revolutionizing sustainable materials through marine nano-fiber technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white text-marine-600 hover:bg-gray-100">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/technology">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-marine-600">
                Learn Technology
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Waves className="h-6 w-6 text-marine-400" />
                <span className="text-xl font-bold">MarineBioGroup</span>
              </div>
              <p className="text-gray-400">
                Leading innovation in marine nano-fiber technology for sustainable future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link href="/technology" className="block text-gray-400 hover:text-white transition-colors">Technology</Link>
                <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">Products</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>Seoul, South Korea</p>
                <p>Email: info@marinebiogroup.com</p>
                <p>Phone: +82-2-1234-5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MarineBioGroup. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}