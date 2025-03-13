/* eslint-disable no-unused-vars */
"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"
import {
  Menu,
  ShoppingCart,
  Home,
  Heart,
  User,
  History,
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [animating, setAnimating] = useState(false)
  const [activeFooterTab, setActiveFooterTab] = useState("home")
  const [favorites, setFavorites] = useState([])
  const [showScrollLeft, setShowScrollLeft] = useState(false)
  const [showScrollRight, setShowScrollRight] = useState(false)
  const categoryRef = useRef(null)

  // Categories for food filtering
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = ["All", "BreakFast", "Snaks", "Lunch", "Special", "Desserts", "Drinks", "Combos"]

  // Updated food items with images and prices
  const foodItems = [
    {
      id: 1,
      name: "Veg Noodles",
      category: "Lunch",
      price: 50.0,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-03-11%2022-27-59-CfqSopFsvZATKquO7sMNPuQEbqhEhF.png",
    },
    {
      id: 2,
      name: "Chicken Noodles",
      category: "Lunch",
      price: 70.0,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-03-11%2022-27-59-CfqSopFsvZATKquO7sMNPuQEbqhEhF.png",
    },
    {
      id: 3,
      name: "Chicken Fried Rice",
      category: "Lunch",
      price: 70.0,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-03-11%2022-27-59-CfqSopFsvZATKquO7sMNPuQEbqhEhF.png",
    },
    {
      id: 4,
      name: "Veg Fried Rice",
      category: "Lunch",
      price: 50.0,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20From%202025-03-11%2022-27-59-CfqSopFsvZATKquO7sMNPuQEbqhEhF.png",
    },
  ]

  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (categoryRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current
        setShowScrollLeft(scrollLeft > 0)
        setShowScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    // Initial check
    checkScroll()

    // Add event listener for scroll
    const currentRef = categoryRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll)
    }

    // Cleanup
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll)
      }
    }
  }, [categories])

  // Handle category change with animation
  const handleCategoryChange = (category) => {
    setAnimating(true)
    setActiveCategory(category)

    // Scroll the selected category into view
    scrollToCategory(category)

    setTimeout(() => setAnimating(false), 300)
  }

  // Scroll to specific category
  const scrollToCategory = (category) => {
    const categoryElement = document.getElementById(`category-${category}`)
    if (categoryElement && categoryRef.current) {
      const container = categoryRef.current
      const scrollLeft = categoryElement.offsetLeft - container.offsetWidth / 2 + categoryElement.offsetWidth / 2

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Scroll categories left
  const scrollLeft = () => {
    if (categoryRef.current) {
      const container = categoryRef.current
      const newScrollLeft = container.scrollLeft - 200

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Scroll categories right
  const scrollRight = () => {
    if (categoryRef.current) {
      const container = categoryRef.current
      const newScrollLeft = container.scrollLeft + 200

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Handle footer tab change
  const handleFooterTabChange = (tab) => {
    setActiveFooterTab(tab)
    // If switching to home from favorites, reset search and category
    if (tab === "home" && activeFooterTab === "favorites") {
      setSearchQuery("")
      setActiveCategory("All")
    }
  }

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Filter food items based on category and search
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get favorite items
  const favoriteItems = foodItems.filter((item) => favorites.includes(item.id))

  return (
    <div className="app-container">
      <header className="header">
        {activeFooterTab === "favorites" ? (
          <button className="back-button" onClick={() => handleFooterTabChange("home")} aria-label="Back to menu">
            <ArrowLeft size={27} />
          </button>
        ) : (
          <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <Menu size={27} />
          </button>
        )}

        <button className="cart-button" aria-label="Shopping Cart">
          <ShoppingCart size={27} />
        </button>
      </header>

      <main className="main-content">
        {activeFooterTab === "favorites" ? (
          // Favorites View
          <>
            <h1 className="title">
              Your Favorites
              <br />
              <span className="subtitle">{favoriteItems.length} items</span>
            </h1>

            {favoriteItems.length > 0 ? (
              <div className="favorites-container">
                {favoriteItems.map((item) => (
                  <div key={item.id} className="food-item favorite-item">
                    <div className="food-item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      <button
                        className="favorite-button active"
                        onClick={() => toggleFavorite(item.id)}
                        aria-label="Remove from favorites"
                      >
                        <Heart className="filled" size={20} />
                      </button>
                    </div>
                    <div className="food-item-details">
                      <h3>{item.name}</h3>
                      <p className="price">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-favorites">
                <Heart size={64} />
                <p>No favorites yet</p>
                <button className="browse-menu-button" onClick={() => handleFooterTabChange("home")}>
                  Browse Menu
                </button>
              </div>
            )}
          </>
        ) : (
          // Home View
          <>
            <h1 className="title">
              Saverito
              <br />
              <span className="subtitle">just for you</span>
            </h1>

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

            <div className="category-wrapper">
              {showScrollLeft && (
                <button
                  className="category-scroll-button left"
                  onClick={scrollLeft}
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

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

              {showScrollRight && (
                <button
                  className="category-scroll-button right"
                  onClick={scrollRight}
                  aria-label="Scroll categories right"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            <div className="food-items-container">
              {filteredItems.map((item) => (
                <div key={item.id} className="food-item">
                  <div className="food-item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    <button
                      className={`favorite-button ${favorites.includes(item.id) ? "active" : ""}`}
                      onClick={() => toggleFavorite(item.id)}
                      aria-label={favorites.includes(item.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart className={favorites.includes(item.id) ? "filled" : ""} size={20} />
                    </button>
                  </div>
                  <div className="food-item-details">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
            {favorites.length > 0 && <span className="favorite-count">{favorites.length}</span>}
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

