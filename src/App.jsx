"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import FavoritesPage from "./pages/FavoritesPage"
import ProfilePage from "./pages/ProfilePage"
import HistoryPage from "./pages/HistoryPage"
import { foodItems } from "./data/fooditems"
import { orderHistory } from "./data/orderHistory"
import { userProfile } from "./data/userData"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [favorites, setFavorites] = useState([])

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Get favorite items
  const favoriteItems = foodItems.filter((item) => favorites.includes(item.id))

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage toggleFavorite={toggleFavorite} favorites={favorites} />
      case "favorites":
        return (
          <FavoritesPage
            favoriteItems={favoriteItems}
            toggleFavorite={toggleFavorite}
            handleTabChange={handleTabChange}
          />
        )
      case "profile":
        return <ProfilePage userProfile={userProfile} />
      case "history":
        return <HistoryPage orderHistory={orderHistory} />
      default:
        return <HomePage toggleFavorite={toggleFavorite} favorites={favorites} />
    }
  }

  return (
    <div className="app-container">
      <Header />
      <main>{renderContent()}</main>
      
      {/* Website Footer */}
      <footer className="website-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-brand-text">🍽️ Saverito</span>
              </div>
              <p className="footer-description">
                Order food online from your favorite restaurants and get it delivered fast to your doorstep.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">📘</a>
                <a href="#" className="social-link" aria-label="Instagram">📷</a>
                <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#" onClick={() => handleTabChange("home")}>Home</a></li>
                <li><a href="#" onClick={() => handleTabChange("favorites")}>Favorites</a></li>
                <li><a href="#" onClick={() => handleTabChange("history")}>Order History</a></li>
                <li><a href="#" onClick={() => handleTabChange("profile")}>Profile</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Live Chat</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Saverito. All rights reserved.</p>
            <div className="footer-links-bottom">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

