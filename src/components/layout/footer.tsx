import Link from 'next/link'
import { Waves, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-marine-400" />
              <span className="font-bold text-xl">MarineBioGroup</span>
            </div>
            <p className="text-gray-300 mb-4">
              Leading marine nano-fiber technology for sustainable beauty and lifestyle products.
              Innovating the future of biotechnology through ocean-inspired solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-marine-400 transition-colors">About Us</Link></li>
              <li><Link href="/technology" className="text-gray-300 hover:text-marine-400 transition-colors">Technology</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-marine-400 transition-colors">Products</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-marine-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-marine-400" />
                <span className="text-gray-300">info@marinebiogroup.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-marine-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-marine-400" />
                <span className="text-gray-300">Ocean Research Center</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 MarineBioGroup. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}