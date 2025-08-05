import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves, Microscope, Leaf, Recycle, Shield, Zap } from 'lucide-react'

export default function TechnologyPage() {
  const technologies = [
    {
      icon: Microscope,
      title: 'Nano-Fiber Extraction',
      description: 'Advanced biotechnology processes to extract high-quality nano-fibers from sustainable marine sources',
      features: ['Proprietary extraction methods', 'Minimal environmental impact', 'High purity levels', '99.8% efficiency rate']
    },
    {
      icon: Leaf,
      title: 'Biodegradable Processing',
      description: 'Revolutionary processing techniques that maintain fiber integrity while ensuring complete biodegradability',
      features: ['100% biodegradable', 'Non-toxic processing', 'Ocean-safe materials', 'Carbon neutral production']
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous testing and quality control systems ensuring premium product standards',
      features: ['ISO 9001 certified', 'Third-party testing', 'Batch tracking', 'Quality guaranteed']
    }
  ]

  const process = [
    { step: 1, title: 'Marine Sourcing', description: 'Sustainable collection from protected marine environments' },
    { step: 2, title: 'Bio-Processing', description: 'Advanced biotechnology extraction and purification' },
    { step: 3, title: 'Nano-Engineering', description: 'Precision engineering at molecular level' },
    { step: 4, title: 'Quality Testing', description: 'Comprehensive testing for purity and performance' },
    { step: 5, title: 'Product Integration', description: 'Integration into beauty and lifestyle products' }
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
              <Link href="/about" className="text-gray-700 hover:text-marine-600 transition-colors">About</Link>
              <Link href="/technology" className="text-marine-600 font-medium">Technology</Link>
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
            Our Technology
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Breakthrough marine nano-fiber technology that revolutionizes sustainable material science and product development.
          </p>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Revolutionary Marine Nano-Fiber Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our proprietary technology harnesses the power of marine biodiversity to create ultra-fine nano-fibers with exceptional properties. These fibers maintain the natural benefits of marine organisms while providing superior performance in beauty and lifestyle applications.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-marine-600">99.8%</div>
                  <div className="text-sm text-gray-600">Extraction Efficiency</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-marine-600">100%</div>
                  <div className="text-sm text-gray-600">Biodegradable</div>
                </div>
              </div>
              <Link href="/contact">
                <Button className="marine-gradient text-white">Learn More</Button>
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80"
                alt="Marine research laboratory"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold marine-text-gradient mb-4">Core Technologies</h2>
            <p className="text-lg text-gray-600">Advanced biotechnology solutions for sustainable material innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <tech.icon className="h-12 w-12 text-marine-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-marine-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold marine-text-gradient mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">From ocean to product: our sustainable nano-fiber development process</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="marine-gradient w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-marine-200 transform translate-x-3"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80"
                alt="Research and development"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Innovation & Research</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our dedicated R&D team continuously pushes the boundaries of marine biotechnology, developing new applications and improving existing processes to maintain our position as industry leaders.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-marine-600" />
                  <span>Advanced nano-engineering capabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Recycle className="h-6 w-6 text-marine-600" />
                  <span>Circular economy principles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-marine-600" />
                  <span>Rigorous safety and quality standards</span>
                </div>
              </div>
              <Link href="/about">
                <Button variant="outline" className="border-marine-600 text-marine-600 hover:bg-marine-50">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="marine-gradient py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Innovate Together?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Partner with us to bring revolutionary marine nano-fiber technology to your products
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-white text-marine-600 hover:bg-gray-100">
              Start Partnership
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