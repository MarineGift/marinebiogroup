'use client'

import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Technology } from '@/components/sections/technology'
import { Products } from '@/components/sections/products'
import { Contact } from '@/components/sections/contact'
import { CarouselSection } from '@/components/sections/carousel'

export default function HomePage() {
  return (
    <div className="space-y-0">
      <CarouselSection />
      <Hero />
      <Features />
      <Technology />
      <Products />
      <Contact />
    </div>
  )
}