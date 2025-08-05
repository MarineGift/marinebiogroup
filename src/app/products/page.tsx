import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Waves, Sparkles, Leaf, Star, ShoppingCart } from 'lucide-react'

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Marine Glow Serum',
      category: 'Skincare',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80',
      description: 'Revolutionary anti-aging serum powered by marine nano-fibers for radiant, youthful skin.',
      features: ['Marine nano-fiber technology', 'Anti-aging properties', '100% natural ingredients', 'Clinically tested'],
      rating: 4.9
    },
    {
      id: 2,
      name: 'Ocean Breeze Moisturizer',
      category: 'Skincare',
      price: '$65',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80',
      description: 'Deep hydrating moisturizer with marine minerals and nano-fiber complex for all-day hydration.',
      features: ['24-hour hydration', 'Marine mineral complex', 'Lightweight formula', 'Suitable for all skin types'],
      rating: 4.8
    },
    {
      id: 3,
      name: 'Coral Renewal Mask',
      category: 'Skincare',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
      description: 'Weekly treatment mask infused with coral-derived nano-fibers for intensive skin renewal.',
      features: ['Coral nano-fiber infusion', 'Weekly treatment', 'Intensive renewal', 'Biodegradable packaging'],
      rating: 4.7
    },
    {
      id: 4,
      name: 'Seaweed Cleansing Foam',
      category: 'Skincare',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
      description: 'Gentle cleansing foam with seaweed nano-fibers that purifies while maintaining skin balance.',
      features: ['Gentle cleansing', 'Seaweed nano-fibers', 'pH balanced', 'Eco-friendly formula'],
      rating: 4.6
    }
  ]

  const categories = [
    { name: 'All Products', count: 12, active: true },
    { name: 'Skincare', count: 8, active: false },
    { name: 'Beauty', count: 6, active: false },
    { name: 'Wellness', count: 4, active: false }
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
              <Link href="/technology" className="text-gray-700 hover:text-marine-600 transition-colors">Technology</Link>
              <Link href="/products" className="text-marine-600 font-medium">Products</Link>
              <Link href="/contact" className="text-gray-700 hover:text-marine-600 transition-colors">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold marine-text-gradient mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium beauty and lifestyle products powered by revolutionary marine nano-fiber technology for exceptional results.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full transition-colors ${
                  category.active
                    ? 'marine-gradient text-white'
                    : 'bg-white text-gray-700 hover:bg-marine-50 hover:text-marine-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-marine-600 text-white px-2 py-1 rounded-full text-xs">
                    {product.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-marine-600">{product.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <ul className="space-y-1 mb-6">
                    {product.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-marine-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full marine-gradient text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold marine-text-gradient mb-4">Why Choose Our Products?</h2>
            <p className="text-lg text-gray-600">Revolutionary marine technology meets premium beauty standards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-marine-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovative Technology</h3>
              <p className="text-gray-600">
                Cutting-edge marine nano-fiber technology for superior product performance and results.
              </p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-marine-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">100% Sustainable</h3>
              <p className="text-gray-600">
                Eco-friendly formulations with biodegradable ingredients that protect marine ecosystems.
              </p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 text-marine-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Clinically Tested</h3>
              <p className="text-gray-600">
                Rigorously tested for safety and efficacy with proven results and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="marine-gradient py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be the first to know about new product launches and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
            />
            <Button variant="outline" className="bg-white text-marine-600 hover:bg-gray-100">
              Subscribe
            </Button>
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