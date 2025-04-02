"use client"

import { Home, Heart, User, History } from "lucide-react"

const Footer = ({ activeFooterTab, handleFooterTabChange, favorites }) => {
  return (
    <footer className="footer">
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
  )
}

export default Footer

