"use client"

import { useState, useRef } from "react"
import "./App.css"
import { Menu, ShoppingCart, Home, Heart, User, History, Search } from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [, setAnimating] = useState(false)
  const [activeFooterTab, setActiveFooterTab] = useState("home")
  const categoryRef = useRef(null)

  // Categories for food filtering - added Lunch and Special
  const categories = ["All", "BreakFast", "Snaks", "Lunch", "Special"]

  // Sample food items (you can replace with your actual data)
  const foodItems = [
    { id: 1, name: "Pancakes", category: "BreakFast" },
    { id: 2, name: "Eggs Benedict", category: "BreakFast" },
    { id: 3, name: "Chips", category: "Snaks" },
    { id: 4, name: "Cookies", category: "Snaks" },
    { id: 5, name: "Fruit Salad", category: "All" },
    { id: 6, name: "Burger", category: "Lunch" },
    { id: 7, name: "Pasta", category: "Lunch" },
    { id: 8, name: "Chef's Special", category: "Special" },
    { id: 9, name: "Weekend Platter", category: "Special" },
  ]

  // Handle category change with animation
  const handleCategoryChange = (category) => {
    setAnimating(true)
    setActiveCategory(category)

    // Scroll the selected category into view
    const categoryElement = document.getElementById(`category-${category}`)
    if (categoryElement && categoryRef.current) {
      const container = categoryRef.current
      const scrollLeft = categoryElement.offsetLeft - container.offsetWidth / 2 + categoryElement.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: "smooth" })
    }

    setTimeout(() => setAnimating(false), 300)
  }

  // Handle footer tab change
  const handleFooterTabChange = (tab) => {
    setActiveFooterTab(tab)
  }

  // Filter food items based on category and search
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
        <div className="category-filters" ref={categoryRef}>
          {categories.map((category) => (
            <button
              key={category}
              id={`category-${category}`}
              className={`category-button ${activeCategory === category ? "active" : ""}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Food items */}
        <div className="food-items-container">
          {filteredItems.map((item) => (
            <div key={item.id} className="food-item">
              {item.name} - {item.category}
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <nav className="footer-nav">
          <button
            className={`footer-button ${activeFooterTab === "home" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("home")}
          >
            <Home size={24} />
          </button>
          <button
            className={`footer-button ${activeFooterTab === "favorites" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("favorites")}
          >
            <Heart size={24} />
          </button>
          <button
            className={`footer-button ${activeFooterTab === "profile" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("profile")}
          >
            <User size={24} />
          </button>
          <button
            className={`footer-button ${activeFooterTab === "history" ? "active" : ""}`}
            onClick={() => handleFooterTabChange("history")}
          >
            <History size={24} />
          </button>
        </nav>
      </footer>
    </div>
  )
}

export default App

