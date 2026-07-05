import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0',
      marginTop: 'auto',
      backgroundColor: 'var(--bg-secondary)'
    }}>
      <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Calculora<span style={{ color: 'var(--accent-primary)' }}>.</span></h3>
          <p style={{ fontSize: '0.875rem', maxWidth: '300px', marginBottom: 0 }}>
            Premium, high-performance calculators designed for everyday financial, health, and academic needs.
          </p>
        </div>
        
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Legal</span>
            <Link to="/privacy-policy" style={{ fontSize: '0.875rem' }}>Privacy Policy</Link>
            <Link to="/terms-of-service" style={{ fontSize: '0.875rem' }}>Terms of Service</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '2rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Company</span>
            <Link to="/about" style={{ fontSize: '0.875rem' }}>About Us</Link>
            <Link to="/contact" style={{ fontSize: '0.875rem' }}>Contact</Link>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 text-center" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        &copy; {new Date().getFullYear()} Calculora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
