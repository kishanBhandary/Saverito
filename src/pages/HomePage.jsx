"use client"

import { useState, useEffect } from "react"
import { Search, Star, Clock, MapPin, Award, Zap, TrendingUp, Shield, Sparkles, ChefHat, Heart, ShoppingCart } from "lucide-react"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import FoodItem from "../components/FoodItem";
import { foodItems } from "../data/fooditems";

const HomePage = ({ toggleFavorite, favorites, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [animating, setAnimating] = useState(false)

  // Categories for food filtering
  const categories = ["All", "BreakFast", "Snaks", "Lunch", "Special", "Desserts", "Drinks", "Combos"]

  // Handle category change with animation
  const handleCategoryChange = (category) => {
    setAnimating(true)
    setActiveCategory(category)
    setTimeout(() => setAnimating(false), 300)
  }

  // Filter food items based on category and search
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>Campus Food Hub</span>
            </div>
            
            <h1 className="hero-title">
              Skip the <span className="text-gradient">Queue</span>
              <br />
              Order <span className="text-gradient">Ahead</span>
            </h1>
            
            <p className="hero-description">
              Book your favorite meals from college canteens and food courts. 
              Order ahead, skip the wait, and enjoy fresh campus food!
            </p>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">5min</span>
                <span className="stat-label">Average Wait</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">4.8★</span>
                <span className="stat-label">Student Rating</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">8+</span>
                <span className="stat-label">Campus Outlets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container fade-in">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse <span className="text-gradient">Menu</span></h2>
            <p className="section-subtitle">
              Explore delicious options from all campus food outlets
            </p>
          </div>
          
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      </section>

      {/* Food Grid Section */}
      <section className="food-section">
        <div className="container">
          {searchQuery && (
            <div className="search-results-info">
              <h3>Found {filteredItems.length} dishes for "{searchQuery}"</h3>
            </div>
          )}
          
          <div className={`food-grid ${animating ? 'loading' : ''}`}>
            {filteredItems.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="empty-state">
              <p>No dishes found. Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Moved after food menu */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Students <span className="text-gradient">Love</span> Saverito</h2>
            <p className="section-subtitle">
              Making campus dining convenient, fast, and enjoyable for busy student life
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3 className="feature-title">Skip the Queue</h3>
              <p className="feature-description">
                Order ahead and avoid long canteen lines. Perfect for busy class schedules.
              </p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3 className="feature-title">Fresh & Safe</h3>
              <p className="feature-description">
                Daily fresh ingredients with strict hygiene standards for safe campus dining.
              </p>
            </div>
            
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3 className="feature-title">Student Friendly</h3>
              <p className="feature-description">
                Affordable prices designed specifically for college budgets and student life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage