"use client"

import { Search, MapPin, ShoppingCart, User, Bell, ChevronDown } from "lucide-react"

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="header-brand">
            <span className="brand-logo">🍽️</span>
            <span className="brand-text">Saverito</span>
          </a>
          
          <div className="location-selector">
            <MapPin size={16} />
            <div className="location-text">
              <span className="location-label">Deliver to</span>
              <span className="location-value">Bangalore, India <ChevronDown size={14} /></span>
            </div>
          </div>
        </div>
        
        <div className="header-search">
          <Search size={20} className="main-search-icon" />
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="main-search-bar"
          />
        </div>
        
        <div className="header-right">
          <nav className="header-nav">
            <a href="#" className="nav-item">
              <User size={18} />
              Sign In
            </a>
            <a href="#" className="nav-item">
              <ShoppingCart size={18} />
              Cart
            </a>
          </nav>
          <div className="user-avatar">K</div>
        </div>
      </div>
    </header>
  )
}

export default Header

