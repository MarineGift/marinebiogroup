import type { Metadata } from 'next'
import { TechnologyHero } from '@/components/technology/technology-hero'
import { TechProcess } from '@/components/technology/tech-process'
import { Innovation } from '@/components/technology/innovation'
import { Research } from '@/components/technology/research'

export const metadata: Metadata = {
  title: 'Technology - MarineBioGroup',
  description: 'Discover our cutting-edge marine nano-fiber extraction technology and sustainable production processes.',
}

export default function TechnologyPage() {
  return (
    <div className="space-y-0">
      <TechnologyHero />
      <TechProcess />
      <Innovation />
      <Research />
    </div>
  )
}