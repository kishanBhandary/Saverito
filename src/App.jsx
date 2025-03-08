"use client"

import { useState } from "react"
import "./App.css"
import { Menu, ShoppingCart, Home, Heart, User, History, Search } from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const categories = ["All", "BreakFast", "Snaks","Lunch","Special"]
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
         Saverito
          <br />
          <span className="subtitle">just for you</span>
        </h1>

        {/* Search bar */}
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Food items would go here */}
        <div className="food-items-container">{/* This is where you would map through filtered food items */}</div>
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

