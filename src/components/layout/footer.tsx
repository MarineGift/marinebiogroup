export default function Footer() {
  return (
    <footer style={{ background: '#1f2937', color: 'white', padding: '3rem 0 1rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              <span style={{ fontSize: '2rem' }}>🌊</span>
              <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>MarineBioGroup</span>
            </div>
            <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '1rem' }}>
              Leading marine nano-fiber technology for sustainable beauty and lifestyle products.
              Innovating the future of biotechnology through ocean-inspired solutions.
            </p>
          </div>

          <div>
            <h3 style={{ fontWeight: '600', fontSize: '1.25rem', marginBottom: '1rem' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#features" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Features
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#technology" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Technology
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#contact" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontWeight: '600', fontSize: '1.25rem', marginBottom: '1rem' }}>
              Contact Info
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '0.5rem' 
              }}>
                <span style={{ color: '#60a5fa' }}>✉️</span>
                <span style={{ color: '#9ca3af' }}>info@marinebiogroup.com</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '0.5rem' 
              }}>
                <span style={{ color: '#60a5fa' }}>📞</span>
                <span style={{ color: '#9ca3af' }}>+1 (555) 123-4567</span>
              </li>
              <li style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#60a5fa' }}>📍</span>
                <span style={{ color: '#9ca3af' }}>Ocean Research Center</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid #374151', 
          paddingTop: '1rem', 
          textAlign: 'center' 
        }}>
          <p style={{ color: '#9ca3af' }}>
            © 2025 MarineBioGroup. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}