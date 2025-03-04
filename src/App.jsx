"use client"

import { useState } from "react"
import "./App.css"
import { Menu, ShoppingCart, Home, Heart, User, History } from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app-container">
      <header className="header">
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <Menu size={27} />
        </button>

        <button className="cart-button" aria-label="Shopping Cart">
          <ShoppingCart size={27} />
        </button>
      </header>

      <main className="main-content">
        <h1 className="title">
          Quick Bites
          <br />
          <span className="subtitle">just for you</span>
        </h1>

        {/* Content would go here */}
      </main>

      <footer className="footer">
        <nav className="footer-nav">
          <button className="footer-button active">
            <Home size={24} />
          </button>
          <button className="footer-button">
            <Heart size={24} />
          </button>
          <button className="footer-button">
            <User size={24} />
          </button>
          <button className="footer-button">
            <History size={24} />
          </button>
        </nav>
      </footer>
    </div>
  )
}

export default App

