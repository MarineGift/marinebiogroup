import type { Metadata } from 'next'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'

export const metadata: Metadata = {
  title: 'Contact Us - MarineBioGroup',
  description: 'Get in touch with our team to learn more about marine nano-fiber technology and partnership opportunities.',
}

export default function ContactPage() {
  return (
    <div className="space-y-0">
      <ContactHero />
      <div className="py-24 bg-gradient-to-b from-white to-ocean-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}