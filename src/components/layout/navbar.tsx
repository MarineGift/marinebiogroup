export default function Navbar() {
  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      background: 'rgba(255, 255, 255, 0.95)', 
      backdropFilter: 'blur(10px)', 
      borderBottom: '1px solid #e5e7eb', 
      zIndex: 1000 
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem' 
      }}>
        <a href="#" style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: '#0ea5e9', 
          textDecoration: 'none' 
        }}>
          🌊 MarineBioGroup
        </a>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          gap: '2rem' 
        }}>
          <li><a href="#home" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.3s ease' }}>Home</a></li>
          <li><a href="#features" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.3s ease' }}>Features</a></li>
          <li><a href="#technology" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.3s ease' }}>Technology</a></li>
          <li><a href="#contact" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.3s ease' }}>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}