import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const Navbar = () => {
  return (
    <header style={{
      background: 'rgba(10, 10, 11, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container flex justify-between items-center" style={{ height: '70px' }}>
        <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover))',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-neon)'
          }}>
            <Calculator size={24} color="#fff" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Calculora<span style={{ color: 'var(--accent-primary)' }}>.</span></span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" style={{ fontWeight: 500 }}>Home</Link>
          <Link to="/about" style={{ fontWeight: 500 }}>About</Link>
          <Link to="/contact" style={{ fontWeight: 500 }}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
