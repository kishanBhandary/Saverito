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
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Settings,
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

  // Mock order history data
  const orderHistory = [
    {
      id: 101,
      date: "Today, 2:30 PM",
      items: ["Veg Noodles", "Chicken Fried Rice"],
      total: 120.0,
      status: "Delivered",
    },
    {
      id: 102,
      date: "Yesterday, 8:15 PM",
      items: ["Chicken Noodles", "Veg Fried Rice"],
      total: 120.0,
      status: "Delivered",
    },
    {
      id: 103,
      date: "Mar 10, 1:45 PM",
      items: ["Veg Noodles"],
      total: 60.0,
      status: "Cancelled",
    },
    {
      id: 104,
      date: "Mar 10, 1:45 PM",
      items: ["Veg Noodles"],
      total: 60.0,
      status: "Cancelled",
    },
  ]

  // Mock user profile data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Food Street, Flavor Town, FT 12345",
  }

  // Modify the scrollToCategory function to improve mobile scrolling
  const scrollToCategory = (category) => {
    const categoryElement = document.getElementById(`category-${category}`)
    if (categoryElement && categoryRef.current) {
      const container = categoryRef.current
      const isMobile = window.innerWidth <= 767

      // Calculate scroll position
      let scrollLeft
      if (isMobile) {
        // On mobile, position the selected category more to the left
        // for better visibility of subsequent categories
        scrollLeft = categoryElement.offsetLeft - 20
      } else {
        // On desktop, center the category
        scrollLeft = categoryElement.offsetLeft - container.offsetWidth / 2 + categoryElement.offsetWidth / 2
      }

      // Apply smooth scrolling
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })

      // Add a subtle highlight animation for mobile
      if (isMobile) {
        categoryElement.classList.add("mobile-highlight")
        setTimeout(() => {
          categoryElement.classList.remove("mobile-highlight")
        }, 1000)
      }
    }
  }

  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (categoryRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current

        // On mobile, show scroll buttons more aggressively
        const isMobile = window.innerWidth <= 767
        const threshold = isMobile ? 5 : 10

        setShowScrollLeft(scrollLeft > threshold)
        setShowScrollRight(scrollLeft < scrollWidth - clientWidth - threshold)
      }
    }

    // Initial check
    checkScroll()

    // Add event listeners
    const currentRef = categoryRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
    }

    // Cleanup
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll)
      }
      window.removeEventListener("resize", checkScroll)
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
      // If switching to home from another tab, reset search and category
      if (tab === "home" && activeFooterTab !== "home") {
        setSearchQuery("")
        setActiveCategory("All")
      }

      // Remove transition class after changing tab
      setTimeout(() => {
        document.querySelector(".main-content")?.classList.remove("page-transition")
      }, 50)
    }, 300)
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

  // Add this after component mounts to ensure active category is visible
  useEffect(() => {
    // Ensure active category is visible on initial load
    if (activeCategory) {
      setTimeout(() => {
        scrollToCategory(activeCategory)
      }, 300)
    }
  }, []) // Empty dependency array ensures this runs once after mount

  // Adjust layout for better mobile experience
  useEffect(() => {
    const handleResize = () => {
      // Force a small delay to ensure proper layout calculation
      setTimeout(() => {
        const foodItems = document.querySelectorAll(".food-item")
        if (foodItems.length > 0) {
          // Apply a small animation to make the layout adjustment smoother
          foodItems.forEach((item, index) => {
            item.style.opacity = "0"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "translateY(0)"
            }, index * 50)
          })
        }
      }, 100)
    }

    // Call once on mount
    handleResize()

    // Add event listener for orientation changes
    window.addEventListener("orientationchange", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("orientationchange", handleResize)
    }
  }, [activeFooterTab])

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeFooterTab) {
      case "home":
        return (
          <>
            <div className="page-header">
              <h1 className="title">
                Saverito
                <span className="title-accent"></span>
              </h1>
              <p className="subtitle">just for you</p>
            </div>

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
        )

      case "favorites":
        return (
          <>
            <div className="page-header">
              <h1 className="title">
                Favorites
                <span className="title-accent"></span>
              </h1>
              <p className="subtitle">{favoriteItems.length} items saved</p>
            </div>

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
        )

      case "profile":
        return (
          <>
            <div className="page-header">
              <h1 className="title">
                Profile
                <span className="title-accent"></span>
              </h1>
              <p className="subtitle">your account</p>
            </div>

            <div className="profile-container">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>

              <h2 className="profile-name">{userProfile.name}</h2>

              <div className="profile-details">
                <div className="profile-detail-item">
                  <User size={18} />
                  <p>{userProfile.email}</p>
                </div>
                <div className="profile-detail-item">
                  <Phone size={18} />
                  <p>{userProfile.phone}</p>
                </div>
                <div className="profile-detail-item">
                  <MapPin size={18} />
                  <p>{userProfile.address}</p>
                </div>
              </div>

              <div className="profile-actions">
                <button className="profile-action-button">
                  <Settings size={18} />
                  Account Settings
                </button>
                <button className="profile-action-button">
                  <MapPin size={18} />
                  Saved Addresses
                </button>
                <button className="profile-action-button">
                  <CreditCard size={18} />
                  Payment Methods
                </button>
                <button className="profile-action-button logout">
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </div>
          </>
        )

      case "history":
        return (
          <>
            <div className="page-header">
              <h1 className="title">
                History
                <span className="title-accent"></span>
              </h1>
              <p className="subtitle">your orders</p>
            </div>

            <div className="history-container">
              {orderHistory.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-id">Order #{order.id}</div>
                    <div className={`order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                  </div>

                  <div className="order-details">
                    <div className="order-date">
                      <Clock size={16} />
                      <span>{order.date}</span>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <span key={index} className="order-item">
                          {item}
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>

                    <div className="order-total">
                      <span>Total:</span>
                      <span className="price">₹{order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button className="order-action-button">Reorder</button>
                    <button className="order-action-button secondary">Details</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )

      default:
        return null
    }
  }

  // Add this useEffect to set the initial footer nav class
  useEffect(() => {
    // Set initial footer nav class
    const footerNav = document.querySelector(".footer-nav")
    if (footerNav) {
      footerNav.classList.add(`${activeFooterTab}-active`)
    }
  }, [])

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

      <main className="main-content">{renderContent()}</main>

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
    </div>
  )
}

// Import missing icons
const Phone = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const CreditCard = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
)

const LogOut = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

export default App

