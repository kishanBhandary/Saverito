"use client"

import { useState, useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import FavoritesPage from "./pages/FavoritesPage"
import ProfilePage from "./pages/ProfilePage"
import HistoryPage from "./pages/HistoryPage"
import { foodItems } from "./data/foodItems"
import { orderHistory } from "./data/orderHistory"
import { userProfile } from "./data/userData"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFooterTab, setActiveFooterTab] = useState("home")
  const [favorites, setFavorites] = useState([])

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Get favorite items
  const favoriteItems = foodItems.filter((item) => favorites.includes(item.id))

  // Update the handleFooterTabChange function to add the sliding indicator class
  const handleFooterTabChange = (tab) => {
    // Add transition animation
    document.querySelector(".main-content")?.classList.add("page-transition")

    // Update the footer nav class for the sliding indicator
    const footerNav = document.querySelector(".footer-nav")
    if (footerNav) {
      footerNav.classList.remove("home-active", "favorites-active", "profile-active", "history-active")
      footerNav.classList.add(`${tab}-active`)
    }

    setTimeout(() => {
      setActiveFooterTab(tab)
      // Remove transition class after changing tab
      setTimeout(() => {
        document.querySelector(".main-content")?.classList.remove("page-transition")
      }, 50)
    }, 300)
  }

  // Add this useEffect to set the initial footer nav class
  useEffect(() => {
    // Set initial footer nav class
    const footerNav = document.querySelector(".footer-nav")
    if (footerNav) {
      footerNav.classList.add(`${activeFooterTab}-active`)
    }
  }, [])

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeFooterTab) {
      case "home":
        return <HomePage toggleFavorite={toggleFavorite} favorites={favorites} />
      case "favorites":
        return (
          <FavoritesPage
            favoriteItems={favoriteItems}
            toggleFavorite={toggleFavorite}
            handleFooterTabChange={handleFooterTabChange}
          />
        )
      case "profile":
        return <ProfilePage userProfile={userProfile} />
      case "history":
        return <HistoryPage orderHistory={orderHistory} />
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="main-content">{renderContent()}</main>
      <Footer activeFooterTab={activeFooterTab} handleFooterTabChange={handleFooterTabChange} favorites={favorites} />
    </div>
  )
}

export default App

