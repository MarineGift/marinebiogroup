export default function Technology() {
  return (
    <section id="technology" style={{ padding: '5rem 0', background: '#f9fafb' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          marginBottom: '3rem', 
          color: '#1f2937' 
        }}>
          Revolutionary Marine Nano-Fiber Technology
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem', 
          alignItems: 'center' 
        }}>
          <div>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#6b7280', 
              marginBottom: '2rem' 
            }}>
              Our patented process extracts and refines nano-fibers from sustainable marine sources,
              creating materials with unprecedented properties for beauty and lifestyle applications.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="marine-gradient" style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontSize: '1.25rem' 
                }}>
                  🔬
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem' 
                  }}>
                    Advanced Extraction
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    Proprietary methods for harvesting nano-fibers while preserving marine ecosystems
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="marine-gradient" style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  fontSize: '1.25rem' 
                }}>
                  ⚗️
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem' 
                  }}>
                    Precision Processing
                  </h3>
                  <p style={{ color: '#6b7280' }}>
                    State-of-the-art refinement techniques that enhance fiber properties
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="marine-gradient" style={{ 
            borderRadius: '16px', 
            padding: '2rem', 
            color: 'white' 
          }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              marginBottom: '1.5rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1rem' 
              }}>
                Technology Stats
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1rem' 
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>99.9%</div>
                  <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Purity Level</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>50x</div>
                  <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Stronger Fibers</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>100%</div>
                  <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Sustainable</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700' }}>24/7</div>
                  <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Production</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.125rem', opacity: '0.9' }}>
                "Leading the future of marine biotechnology"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}