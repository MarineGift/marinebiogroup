export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-blue-900">MarineBioGroup</h1>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-900">
            Marine Nano-Fiber Technology
          </h2>
          <p className="text-xl text-gray-600">
            Leading innovation in sustainable materials
          </p>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 MarineBioGroup. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
