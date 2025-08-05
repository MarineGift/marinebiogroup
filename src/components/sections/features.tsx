export default function Features() {
  return (
    <section id="features" style={{ padding: '5rem 0', background: 'white' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          textAlign: 'center', 
          marginBottom: '3rem', 
          color: '#1f2937' 
        }}>
          Why Choose MarineBioGroup?
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          margin: '3rem 0' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            transition: 'transform 0.3s ease' 
          }}>
            <div className="marine-gradient" style={{ 
              width: '60px', 
              height: '60px', 
              margin: '0 auto 1rem', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              color: 'white' 
            }}>
              🌊
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1f2937' 
            }}>
              Marine Innovation
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Harnessing the power of ocean-derived nano-fibers for revolutionary applications
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            transition: 'transform 0.3s ease' 
          }}>
            <div className="marine-gradient" style={{ 
              width: '60px', 
              height: '60px', 
              margin: '0 auto 1rem', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              color: 'white' 
            }}>
              🌱
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1f2937' 
            }}>
              Sustainable Solutions
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Eco-friendly biotechnology that protects our marine ecosystems
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            transition: 'transform 0.3s ease' 
          }}>
            <div className="marine-gradient" style={{ 
              width: '60px', 
              height: '60px', 
              margin: '0 auto 1rem', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              color: 'white' 
            }}>
              🛡️
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1f2937' 
            }}>
              Advanced Protection
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Superior durability and performance in beauty and lifestyle products
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            textAlign: 'center', 
            transition: 'transform 0.3s ease' 
          }}>
            <div className="marine-gradient" style={{ 
              width: '60px', 
              height: '60px', 
              margin: '0 auto 1rem', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.5rem', 
              color: 'white' 
            }}>
              💡
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#1f2937' 
            }}>
              Cutting-Edge Research
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Pioneering scientific breakthroughs in marine biotechnology
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}