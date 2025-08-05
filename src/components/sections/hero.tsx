export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <h1>
          Marine Nano-Fiber
          <span className="marine-text"> Technology</span>
        </h1>
        <p>
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