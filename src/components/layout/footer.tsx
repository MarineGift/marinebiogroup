import { Link } from "wouter";
import { Waves, Youtube, Linkedin, Instagram } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export default function Footer() {
  const { data: siteConfig } = useSiteConfig();
  const companyName = siteConfig?.companyName || "MarineBioGroup";
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Waves className="text-white h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{companyName}</h3>
                <p className="text-sm opacity-75">Marine Nano Fiber Pioneer</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              World's first pioneer of marine nano-fiber technology, creating sustainable beauty and lifestyle products for a healthier planet.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">MarinePack Face Mask</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">Marine Cream Bar</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">Marine Sun Protect</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-blue-400 transition-colors">Marine Pad</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/technology" className="text-gray-300 hover:text-blue-400 transition-colors">Technology</Link></li>
              <li><Link href="/investors" className="text-gray-300 hover:text-blue-400 transition-colors">Investor Relations</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">News & Updates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Partnership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 MarineBioGroup. All rights reserved. | Reg. No (2023-0010)
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Patents</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
