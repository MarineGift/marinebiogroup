import type { Metadata } from 'next'
import { ProductsHero } from '@/components/products/products-hero'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductCategories } from '@/components/products/product-categories'
import { ProductFeatures } from '@/components/products/product-features'

export const metadata: Metadata = {
  title: 'Products - MarineBioGroup',
  description: 'Explore our premium collection of marine nano-fiber products for beauty, wellness, and lifestyle applications.',
}

export default function ProductsPage() {
  return (
    <div className="space-y-0">
      <ProductsHero />
      <ProductCategories />
      <ProductGrid />
      <ProductFeatures />
    </div>
  )
}