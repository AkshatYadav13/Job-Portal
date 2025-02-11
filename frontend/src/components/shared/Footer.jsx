import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#282828', color: '#f1f1f1', textAlign: 'center', padding: '30px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px'}} className='footerNavLink'>
        <Link to="/" style={{ margin: '0 15px', color: '#f1f1f1', textDecoration: 'none' }}>Home</Link>
        <Link to="/jobs" style={{ margin: '0 15px', color: '#f1f1f1', textDecoration: 'none' }}>Jobs</Link>
        <Link to="/browse" style={{ margin: '0 15px', color: '#f1f1f1', textDecoration: 'none' }}>Browse</Link>
        <Link to="#" style={{ margin: '0 15px', color: '#f1f1f1', textDecoration: 'none' }}>Contact</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Link to="#" style={{ margin: '0 10px', color: '#f1f1f1' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
        </Link>
        <Link to="#" style={{ margin: '0 10px', color: '#f1f1f1' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Twitter" style={{ width: '24px', height: '24px' }} />
        </Link>
        <Link to="#" style={{ margin: '0 10px', color: '#f1f1f1' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
        </Link>
        <Link to="#" style={{ margin: '0 10px', color: '#f1f1f1' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733609.png" alt="LinkedIn" style={{ width: '24px', height: '24px' }} />
        </Link>
      </div>

      <p style={{ fontSize: '14px', margin: 0 }}>&copy; 2024 Your Company. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
