import React from 'react';
import { FaFacebook, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="footer-icon" />
          </a>
        </div>
        <div className="footer-section">
          <p>Gindy Tower ,Tel-Aviv , Israel</p>
        </div>
        <div className="footer-section">
          <FaPhone className="footer-icon" />
          <p>03-43-666-23</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
