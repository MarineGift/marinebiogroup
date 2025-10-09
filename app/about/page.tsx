import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Waves, Users, Target, Award } from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: 'Dr. Sarah Kim',
      role: 'CEO & Marine Biologist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=400&q=80',
      description: 'Leading marine biotechnology researcher with 15+ years experience'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'CTO & Materials Scientist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      description: 'Expert in nano-fiber technology and sustainable material development'
    },
    {
      name: 'Dr. Elena Rodriguez',
      role: 'Head of Research',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      description: 'Pioneering research in marine ecosystem preservation and biotechnology'
    }
  ]

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Established MarineBioGroup with vision for sustainable marine technology' },
    { year: '2019', title: 'First Patent', description: 'Secured breakthrough patent for marine nano-fiber extraction process' },
    { year: '2021', title: 'Series A Funding', description: 'Raised $10M to scale research and development operations' },
    { year: '2023', title: 'Commercial Launch', description: 'First marine nano-fiber beauty products launched successfully' },
    { year: '2024', title: 'Global Expansion', description: 'Expanding operations to international markets with Railway deployment' }
  ]

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
              <Link href="/about" className="text-marine-600 font-medium">About</Link>
              <Link href="/technology" className="text-gray-700 hover:text-marine-600 transition-colors">Technology</Link>
              <Link href="/products" className="text-gray-700 hover:text-marine-600 transition-colors">Products</Link>
              <Link href="/contact" className="text-gray-700 hover:text-marine-600 transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold marine-text-gradient mb-6">
            About MarineBioGroup
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Pioneering sustainable marine nano-fiber technology to revolutionize beauty and lifestyle products while protecting our ocean ecosystems.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to developing revolutionary marine nano-fiber technology that creates sustainable, high-performance products while preserving marine ecosystems for future generations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-marine-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Innovation</h3>
                    <p className="text-sm text-gray-600">Cutting-edge research in marine biotechnology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Waves className="h-6 w-6 text-marine-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Sustainability</h3>
                    <p className="text-sm text-gray-600">Protecting ocean health through responsible practices</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&q=80"
                alt="Ocean sustainability"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold marine-text-gradient mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">Leading experts in marine biology and sustainable technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-marine-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold marine-text-gradient mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our mission to revolutionize marine technology</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 marine-gradient rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-marine-600 mr-3">{milestone.year}</span>
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="marine-gradient py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with us to create a sustainable future through innovative marine technology
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-white text-marine-600 hover:bg-gray-100">
              Get In Touch
            </Button>
          </Link>
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