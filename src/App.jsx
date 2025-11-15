"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import FavoritesPage from "./pages/FavoritesPage"
import ProfilePage from "./pages/ProfilePage"
import HistoryPage from "./pages/HistoryPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import DashboardPage from "./dashboard/DashboardPage"
import AdminLoginPage from "./dashboard/AdminLoginPage"
import { foodItems } from "./data/fooditems"
import { orderHistory } from "./data/orderHistory"
import { userProfile } from "./data/userData"

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    // Check URL path to set initial tab
    const path = window.location.pathname
    if (path === '/dashboard/admin') return "dashboard"
    return "home"
  })
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState("signin") // "signin" or "signup"

  // Check for existing auth on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("saverito_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }

    // Handle URL routing
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/dashboard/admin') {
        setActiveTab("dashboard")
      } else if (path === '/cart') {
        setActiveTab("cart")
      } else if (path === '/favorites') {
        setActiveTab("favorites")
      } else if (path === '/profile') {
        setActiveTab("profile")
      } else if (path === '/history') {
        setActiveTab("history")
      } else {
        setActiveTab("home")
      }
    }

    window.addEventListener('popstate', handlePopState)
    handlePopState() // Handle initial load

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Add to cart
  const addToCart = (item, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  // Update cart item quantity
  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Calculate cart item count
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Get favorite items
  const favoriteItems = foodItems.filter((item) => favorites.includes(item.id))

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    
    // Update URL without page reload
    let path = '/'
    switch (tab) {
      case 'dashboard':
        path = '/dashboard/admin'
        break
      case 'cart':
        path = '/cart'
        break
      case 'favorites':
        path = '/favorites'
        break
      case 'profile':
        path = '/profile'
        break
      case 'history':
        path = '/history'
        break
      default:
        path = '/'
    }
    
    window.history.pushState(null, '', path)
  }

  // Handle sign in success
  const handleSignInSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setActiveTab("home")
    localStorage.setItem("saverito_user", JSON.stringify(userData))
  }

  // Handle sign up success
  const handleSignUpSuccess = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setActiveTab("home")
    localStorage.setItem("saverito_user", JSON.stringify(userData))
  }

  // Handle admin logout
  const handleAdminLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveTab("home")
    localStorage.removeItem("saverito_user")
    // Navigate back to main site
    window.history.pushState({}, '', '/')
  }

  // Handle going to main site from dashboard
  const handleGoToMainSite = () => {
    setActiveTab("home")
    window.history.pushState({}, '', '/')
  }

  // Handle sign out
  const handleSignOut = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveTab("home")
    localStorage.removeItem("saverito_user")
  }

  // Handle admin login success
  const handleAdminLoginSuccess = (adminData) => {
    const adminUser = {
      id: adminData.id,
      name: adminData.name,
      email: adminData.email,
      isAdmin: true,
      role: adminData.role,
      permissions: adminData.permissions
    }
    
    setUser(adminUser)
    setIsAuthenticated(true)
    localStorage.setItem("saverito_user", JSON.stringify(adminUser))
    
    // Navigate to dashboard
    window.history.pushState({}, '', '/dashboard/admin')
    setActiveTab('dashboard')
  }

  // Switch between sign in and sign up
  const switchToSignUp = () => {
    setAuthMode("signup")
    setActiveTab("auth")
  }

  const switchToSignIn = () => {
    setAuthMode("signin")
    setActiveTab("auth")
  }

  // Render different content based on active tab
  const renderContent = () => {
    // Handle direct URL access
    const currentPath = window.location.pathname
    
    // Admin login routes
    if (currentPath === '/admin/login' || currentPath === '/admin' || currentPath === '/dashboard/admin/login') {
      return <AdminLoginPage onAdminLoginSuccess={handleAdminLoginSuccess} />
    }
    
    // Dashboard route - check authentication
    if (currentPath === '/dashboard' || currentPath === '/dashboard/admin') {
      if (user && user.isAdmin) {
        return <DashboardPage 
          user={user} 
          onLogout={handleAdminLogout}
          onGoToMainSite={handleGoToMainSite}
        />
      } else {
        // Redirect to admin login if not authenticated as admin
        window.history.pushState({}, '', '/admin/login')
        return <AdminLoginPage onAdminLoginSuccess={handleAdminLoginSuccess} />
      }
    }

    // Show auth pages if not authenticated and on auth tab
    if (activeTab === "auth") {
      if (authMode === "signup") {
        return (
          <SignUpPage
            onSwitchToSignIn={switchToSignIn}
            onSignUpSuccess={handleSignUpSuccess}
          />
        )
      } else {
        return (
          <SignInPage
            onSwitchToSignUp={switchToSignUp}
            onSignInSuccess={handleSignInSuccess}
          />
        )
      }
    }

    // Main app content
    switch (activeTab) {
      case "home":
        return <HomePage 
          toggleFavorite={toggleFavorite} 
          favorites={favorites} 
          addToCart={addToCart}
        />
      case "cart":
        return <CartPage 
          cartItems={cart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          clearCart={clearCart}
          getCartTotal={getCartTotal}
        />
      case "favorites":
        return (
          <FavoritesPage
            favoriteItems={favoriteItems}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            handleTabChange={handleTabChange}
          />
        )
      case "dashboard":
        return <DashboardPage 
          user={user} 
          onLogout={handleAdminLogout}
          onGoToMainSite={handleGoToMainSite}
        />
      case "profile":
        return <ProfilePage userProfile={user || userProfile} />
      case "history":
        return <HistoryPage orderHistory={orderHistory} />
      default:
        return <HomePage 
          toggleFavorite={toggleFavorite} 
          favorites={favorites} 
          addToCart={addToCart}
        />
    }
  }

  // Check if we're in admin dashboard mode
  const isAdminDashboard = (user && user.isAdmin && (activeTab === "dashboard" || window.location.pathname.includes('/dashboard')))

  return (
    <div className="app-container">
      {/* Only show main website header if not in admin dashboard */}
      {!isAdminDashboard && (
        <Header 
          user={user}
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
          onSwitchToSignIn={switchToSignIn}
          onSwitchToSignUp={switchToSignUp}
          onTabChange={handleTabChange}
          cartCount={getCartCount()}
        />
      )}
      <main>{renderContent()}</main>
    </div>
  )
}

export default App

