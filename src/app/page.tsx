import Navbar from '@/components/layout/navbar'
import Hero from '@/components/sections/hero'
import Features from '@/components/sections/features'
import Technology from '@/components/sections/technology'
import Contact from '@/components/sections/contact'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Technology />
      <Contact />
      <Footer />
    </>
  )
}