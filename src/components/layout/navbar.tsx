'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Waves } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-marine-600" />
              <span className="font-bold text-xl text-gray-900">MarineBioGroup</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-marine-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-marine-600 transition-colors">
              About
            </Link>
            <Link href="/technology" className="text-gray-700 hover:text-marine-600 transition-colors">
              Technology
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-marine-600 transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-marine-600 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="bg-marine-600 text-white px-4 py-2 rounded-md hover:bg-marine-700 transition-colors">
              Admin
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-marine-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-marine-600">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-marine-600">
                About
              </Link>
              <Link href="/technology" className="block px-3 py-2 text-gray-700 hover:text-marine-600">
                Technology
              </Link>
              <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-marine-600">
                Products
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-marine-600">
                Contact
              </Link>
              <Link href="/admin" className="block px-3 py-2 text-marine-600 font-medium">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}