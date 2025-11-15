"use client"

import { ShoppingCart, User, LogOut, Heart, History, BarChart3 } from "lucide-react"
import { useState } from "react"

const Header = ({ 
  user, 
  isAuthenticated, 
  onSignOut, 
  onSwitchToSignIn, 
  onSwitchToSignUp, 
  onTabChange,
  cartCount = 0
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Check if user has admin privileges
  const isAdmin = user?.role === "admin" || user?.email === "admin@saverito.com"

  const handleSignInClick = () => {
    onSwitchToSignIn()
    onTabChange("auth")
  }

  const handleSignUpClick = () => {
    onSwitchToSignUp()
    onTabChange("auth")
  }

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu)
  }

  const handleProfileClick = () => {
    onTabChange("profile")
    setShowUserMenu(false)
  }

  const handleSignOutClick = () => {
    onSignOut()
    setShowUserMenu(false)
  }

  return (
    <header className="modern-header">
      <div className="modern-header-container">
        <div className="header-left">
          <a href="#" onClick={() => onTabChange("home")} className="modern-brand">
            <div className="brand-icon">
              <span className="brand-emoji">🍽️</span>
            </div>
            <div className="brand-content">
              <span className="brand-name">Saverito</span>
              <span className="brand-tagline">Campus Food Hub</span>
            </div>
          </a>
        </div>
        
        <div className="header-center">
          {isAuthenticated && (
            <nav className="modern-nav">
              <a href="#" onClick={() => onTabChange("favorites")} className="modern-nav-item favorites">
                <Heart size={18} />
                <span>Favorites</span>
              </a>
              <a href="#" onClick={() => onTabChange("history")} className="modern-nav-item history">
                <History size={18} />
                <span>Orders</span>
              </a>
              {isAdmin && (
                <a href="#" onClick={() => onTabChange("dashboard")} className="modern-nav-item dashboard">
                  <BarChart3 size={18} />
                  <span>Dashboard</span>
                </a>
              )}
            </nav>
          )}
        </div>
        
        <div className="header-right">
          {!isAuthenticated ? (
            <div className="auth-buttons">
              <button onClick={handleSignInClick} className="auth-btn signin-btn">
                <User size={18} />
                Sign In
              </button>
              <button onClick={handleSignUpClick} className="auth-btn signup-btn">
                Sign Up
              </button>
            </div>
          ) : (
            <div className="authenticated-section">
              <a href="#" onClick={() => onTabChange("cart")} className="cart-button">
                <div className="cart-icon-wrapper">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <div className="cart-badge-modern">
                      <span>{cartCount}</span>
                    </div>
                  )}
                </div>
                <span className="cart-text">Cart</span>
              </a>
              
              <div className="user-section">
                <button onClick={handleUserMenuToggle} className="modern-user-avatar">
                  <div className="avatar-content">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="user-info-preview">
                    <span className="user-name-preview">{user?.name || 'User'}</span>
                    <span className="user-status">Online</span>
                  </div>
                </button>
                
                {showUserMenu && (
                  <>
                    <div className="menu-backdrop" onClick={() => setShowUserMenu(false)}></div>
                    <div className="modern-user-menu">
                      <div className="user-menu-header-modern">
                        <div className="user-avatar-large">
                          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="user-details">
                          <h4 className="user-name-large">{user?.name || 'User'}</h4>
                          <p className="user-email-modern">{user?.email || ''}</p>
                          <div className="user-badge">Student Member</div>
                        </div>
                      </div>
                      
                      <div className="menu-divider"></div>
                      
                      <div className="menu-items-modern">
                        <button onClick={handleProfileClick} className="menu-item-modern">
                          <User size={18} />
                          <span>My Profile</span>
                        </button>
                        <button onClick={() => { onTabChange("history"); setShowUserMenu(false); }} className="menu-item-modern">
                          <History size={18} />
                          <span>Order History</span>
                        </button>
                        <button onClick={() => { onTabChange("favorites"); setShowUserMenu(false); }} className="menu-item-modern">
                          <Heart size={18} />
                          <span>Saved Favorites</span>
                        </button>
                        {isAdmin && (
                          <button onClick={() => { onTabChange("dashboard"); setShowUserMenu(false); }} className="menu-item-modern admin-item">
                            <BarChart3 size={18} />
                            <span>Admin Dashboard</span>
                          </button>
                        )}
                        
                        <div className="menu-divider"></div>
                        
                        <button onClick={handleSignOutClick} className="menu-item-modern logout-item">
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

