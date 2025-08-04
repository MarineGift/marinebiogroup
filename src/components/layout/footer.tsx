"use client";

import Link from "next/link";
import { Waves, Youtube, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Waves className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">MarineBioGroup</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading marine nano-fiber technology pioneer, committed to sustainable ocean solutions and innovative biotechnology research.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://youtube.com/@marinebiogroup" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/marinebiogroup" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/marinebiogroup" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/research" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-gray-300 space-y-2">
              <p>Marine Technology Center</p>
              <p>Busan, South Korea</p>
              <p>
                <a 
                  href="tel:+82-51-123-4567" 
                  className="hover:text-white transition-colors"
                >
                  Phone: +82-51-123-4567
                </a>
              </p>
              <p>
                <a 
                  href="mailto:info@marinebiogroup.com" 
                  className="hover:text-white transition-colors"
                >
                  Email: info@marinebiogroup.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} MarineBioGroup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}