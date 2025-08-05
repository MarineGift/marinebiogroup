import type { Metadata } from 'next'
import { AboutHero } from '@/components/about/about-hero'
import { Mission } from '@/components/about/mission'
import { Team } from '@/components/about/team'
import { Timeline } from '@/components/about/timeline'

export const metadata: Metadata = {
  title: 'About Us - MarineBioGroup',
  description: 'Learn about MarineBioGroup\'s mission to revolutionize materials science through sustainable marine nano-fiber technology.',
}

export default function AboutPage() {
  return (
    <div className="space-y-0">
      <AboutHero />
      <Mission />
      <Timeline />
      <Team />
    </div>
  )
}