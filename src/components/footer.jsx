import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Same CSS file use kar lenge simplicity ke liye

const footerSections = [
  {
    title: 'Company',
    links: ['About Us', 'Team', 'Careers', 'Blog'],
  },
  {
    title: 'Travel Info',
    links: ['Destinations', 'Booking Policy', 'FAQs', 'Travel Guides'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Sitemap'],
  },
];

const Footer = () => {
  const SocialIcon = ({ Icon }) => (
    <button className="social-btn">
      <Icon className="h-5 w-5" />
    </button>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Logo + Social */}
          <div className="footer-logo-section">
            <h2 className="footer-logo">NEXT ROUTE</h2>
            <p>Book, explore, and enjoy—all in one place.</p>
            <div className="footer-socials">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* Footer columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((item) => (
                  <li key={item}>
                    <Link to="#">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} NEXT ROUTE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;