export default function Hero() {
  return (
    <section id="home" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
      textAlign: 'center' 
    }}>
      <div className="container">
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '700', 
          marginBottom: '1.5rem', 
          color: '#1f2937' 
        }}>
          Marine Nano-Fiber
          <span className="marine-text-gradient"> Technology</span>
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280', 
          marginBottom: '2rem', 
          maxWidth: '600px', 
          marginLeft: 'auto', 
          marginRight: 'auto' 
        }}>
          Pioneering sustainable beauty and lifestyle products through innovative marine biotechnology solutions
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#technology" className="btn btn-primary">Explore Technology</a>
          <a href="#contact" className="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </section>
  )
}