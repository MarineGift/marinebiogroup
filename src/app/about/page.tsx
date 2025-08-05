export default function About() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About MarineBioGroup</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            MarineBioGroup is at the forefront of marine biotechnology innovation, 
            developing sustainable solutions that harness the power of ocean-derived nano-fibers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To revolutionize beauty and lifestyle products through innovative marine nano-fiber technology 
                while protecting and preserving our ocean ecosystems.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A sustainable future where marine biotechnology creates superior products 
                that benefit both humanity and the environment.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Innovation, sustainability, scientific excellence, and respect for marine ecosystems 
                guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}