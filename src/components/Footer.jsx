import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Home, Heart, User, History } from 'lucide-react';

const Footer = ({ activeFooterTab, handleFooterTabChange, favorites, isNavFooter = false }) => {
  if (isNavFooter) {
    // Navigation Footer (for mobile)
    return (
      <footer className="footer nav-footer">
        <nav className="footer-nav">
          <button
            className={`footer-button ${activeFooterTab === "home" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("home")}
          >
            <Home size={24} />
            <span className="footer-button-label">Home</span>
          </button>
          <button
            className={`footer-button ${activeFooterTab === "favorites" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("favorites")}
          >
            <Heart size={24} />
            {favorites.length > 0 && <span className="favorite-count">{favorites.length}</span>}
            <span className="footer-button-label">Favorites</span>
          </button>
          <button
            className={`footer-button ${activeFooterTab === "profile" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("profile")}
          >
            <User size={24} />
            <span className="footer-button-label">Profile</span>
          </button>
          <button
            className={`footer-button ${activeFooterTab === "history" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("history")}
          >
            <History size={24} />
            <span className="footer-button-label">History</span>
          </button>
        </nav>
      </footer>
    );
  }

  // Content Footer (for homepage)
  return (
    <footer className="content-footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="logo-icon">🥘</span>
              Saverito
            </h3>
            <p className="footer-description">
              Your favorite campus food ordering platform. Skip the lines, enjoy fresh meals, 
              and make the most of your student life with convenient dining solutions.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#menu">Browse Menu</a></li>
              <li><a href="#favorites">My Favorites</a></li>
              <li><a href="#orders">Order History</a></li>
              <li><a href="#profile">My Profile</a></li>
            </ul>
          </div>

          {/* Campus Info */}
          <div className="footer-section">
            <h4 className="footer-title">Campus Dining</h4>
            <ul className="footer-links">
              <li><a href="#canteens">All Canteens</a></li>
              <li><a href="#hours">Dining Hours</a></li>
              <li><a href="#events">Special Events</a></li>
              <li><a href="#nutrition">Nutrition Info</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Get in Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>Student Center, Campus Main</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>help@saverito.edu</span>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>Mon-Fri: 7AM - 10PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Saverito Campus Dining. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#support">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

