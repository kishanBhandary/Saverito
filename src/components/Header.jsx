"use client"

import { ShoppingCart, User, LogOut } from "lucide-react"
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
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <a href="#" onClick={() => onTabChange("home")} className="header-brand">
            <span className="brand-logo">🍽️</span>
            <span className="brand-text">Saverito</span>
          </a>
        </div>
        
        <div className="header-right">
          <nav className="header-nav">
            {!isAuthenticated ? (
              <>
                <button onClick={handleSignInClick} className="nav-item">
                  <User size={18} />
                  Sign In
                </button>
                <button onClick={handleSignUpClick} className="nav-item signup-btn">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <a href="#" onClick={() => onTabChange("favorites")} className="nav-item">
                  ❤️ Favorites
                </a>
                <a href="#" onClick={() => onTabChange("history")} className="nav-item">
                  📋 Orders
                </a>
                {isAdmin && (
                  <a href="#" onClick={() => onTabChange("dashboard")} className="nav-item admin-link">
                    📊 Dashboard
                  </a>
                )}
                <a href="#" onClick={() => onTabChange("cart")} className="nav-item cart-link">
                  <div className="cart-icon-container">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                  </div>
                  Cart
                </a>
              </>
            )}
          </nav>
          
          {isAuthenticated && (
            <div className="user-menu-container">
              <button onClick={handleUserMenuToggle} className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </button>
              
              {showUserMenu && (
                <div className="user-menu">
                  <div className="user-menu-header">
                    <div className="user-info">
                      <p className="user-name">{user?.name || 'User'}</p>
                      <p className="user-email">{user?.email || ''}</p>
                    </div>
                  </div>
                  <div className="user-menu-divider"></div>
                  <div className="user-menu-items">
                    <button onClick={handleProfileClick} className="user-menu-item">
                      <User size={16} />
                      Profile
                    </button>
                    <button onClick={() => { onTabChange("history"); setShowUserMenu(false); }} className="user-menu-item">
                      📋 Order History
                    </button>
                    <button onClick={() => { onTabChange("favorites"); setShowUserMenu(false); }} className="user-menu-item">
                      ❤️ Favorites
                    </button>
                    {isAdmin && (
                      <button onClick={() => { onTabChange("dashboard"); setShowUserMenu(false); }} className="user-menu-item admin-menu-item">
                        📊 Dashboard
                      </button>
                    )}
                    <div className="user-menu-divider"></div>
                    <button onClick={handleSignOutClick} className="user-menu-item logout">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

