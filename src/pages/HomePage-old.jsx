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

      {/* Features Section */}
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
    </div>
  )
}

export default HomePage
      {/* Next-Gen Hero Section */}
      <section className={`next-gen-hero ${heroLoaded ? 'hero-loaded' : ''}`}>
        {/* Advanced Background Effects */}
        <div className="hero-background-complex">
          <div className="gradient-mesh"></div>
          <div className="floating-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
            <div className="orb orb-5"></div>
          </div>
          <div className="mesh-pattern"></div>
          <div 
            className="cursor-glow"
            style={{ 
              left: mousePosition.x - 150, 
              top: mousePosition.y - 150 
            }}
          ></div>
        </div>
        
        <div className="hero-content-premium">
          {/* Left Content */}
          <div className="hero-text-premium">
            <div className="premium-badge">
              <div className="badge-glow"></div>
              <Sparkles size={16} />
              <span>College Campus</span>
              <div className="badge-shine"></div>
            </div>
            
            <h1 className="hero-title-next-gen">
              <span className="title-line-1">Campus</span>
              <span className="title-line-2">Food</span>
              <span className="title-accent">Booking</span>
            </h1>
            
            <p className="hero-description-premium">
              Skip the queues and book your favorite meals from college canteens, 
              cafeterias, and food courts. Order ahead and pick up when convenient!
            </p>
            
            {/* Premium Stats */}
            <div className="premium-stats-grid">
              <div className="premium-stat">
                <div className="stat-icon-premium">
                  <Clock size={20} />
                </div>
                <div className="stat-content-premium">
                  <span className="stat-number">5min</span>
                  <span className="stat-label">Prep Time</span>
                </div>
                <div className="stat-glow stat-glow-blue"></div>
              </div>
              <div className="premium-stat">
                <div className="stat-icon-premium">
                  <Star size={20} />
                </div>
                <div className="stat-content-premium">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Student Rating</span>
                </div>
                <div className="stat-glow stat-glow-gold"></div>
              </div>
              <div className="premium-stat">
                <div className="stat-icon-premium">
                  <ChefHat size={20} />
                </div>
                <div className="stat-content-premium">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Campus Outlets</span>
                </div>
                <div className="stat-glow stat-glow-green"></div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Interactive Cards */}
          <div className="hero-interactive-section">
            <div className="search-card-premium">
              <div className="card-glow"></div>
              <div className="search-header">
                <Search size={24} className="search-icon-premium" />
                <h3>Find Your Campus Favorites</h3>
              </div>
              <div className="premium-search-container">
                <input
                  type="text"
                  placeholder="Search canteen dishes..."
                  className="premium-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn-premium">
                  <Zap size={18} />
                </button>
              </div>
              <div className="search-suggestions">
                <span>Popular: </span>
                {["Masala Dosa", "Veg Thali", "Chicken Biryani", "Samosa"].map((item, index) => (
                  <button 
                    key={index} 
                    className="suggestion-pill"
                    onClick={() => setSearchQuery(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Floating Feature Cards */}
            <div className="floating-features">
              <div className="feature-card-float feature-card-1">
                <Shield size={20} />
                <span>No Queue Wait</span>
              </div>
              <div className="feature-card-float feature-card-2">
                <TrendingUp size={20} />
                <span>Student Favorite</span>
              </div>
              <div className="feature-card-float feature-card-3">
                <Award size={20} />
                <span>Best Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Features Showcase */}
      <section className="features-showcase-premium">
        <div className="features-container-premium">
          <div className="feature-item-premium feature-delivery">
            <div className="feature-visual">
              <div className="feature-icon-container">
                <Zap size={32} />
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Quick Pickup</h3>
              <p>Book ahead and skip the long queues</p>
            </div>
          </div>
          
          <div className="feature-item-premium feature-quality">
            <div className="feature-visual">
              <div className="feature-icon-container">
                <Award size={32} />
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Fresh & Hygienic</h3>
              <p>Daily fresh ingredients from trusted vendors</p>
            </div>
          </div>
          
          <div className="feature-item-premium feature-experience">
            <div className="feature-visual">
              <div className="feature-icon-container">
                <Sparkles size={32} />
                <div className="icon-pulse"></div>
              </div>
            </div>
            <div className="feature-content">
              <h3>Student Friendly</h3>
              <p>Affordable prices designed for college budgets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Content Container */}
      <div className="premium-content-wrapper">
        {/* Modern Categories Section */}
        <section className="categories-section-premium">
          <div className="section-header-premium">
            <h2 className="section-title-premium">Campus Food Menu</h2>
            <p className="section-subtitle-premium">
              Browse delicious options from all campus food outlets
            </p>
          </div>
          
          <div className="categories-wrapper-premium">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </section>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="search-results-premium">
            <div className="search-results-card">
              <h3>Search Results for "{searchQuery}"</h3>
              <div className="results-count-premium">
                <span className="count-number">{filteredItems.length}</span>
                <span className="count-text">campus dishes found</span>
              </div>
            </div>
          </div>
        )}

        {/* Premium Food Grid Section */}
        <section className="food-section-premium">
          <div className="food-header-premium">
            <h2 className="food-title-premium">
              {activeCategory === "All" 
                ? "Complete Collection" 
                : `${activeCategory} Specialties`
              }
            </h2>
            <div className="collection-stats">
              <div className="stat-pill">
                <span>{filteredItems.length}</span>
                <span>Dishes</span>
              </div>
            </div>
          </div>
          
          <div className={`premium-food-grid ${animating ? 'grid-animating' : ''}`}>
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="premium-food-item-wrapper" 
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="food-item-enhanced">
                  <FoodItem
                    item={item}
                    isFavorite={favorites.includes(item.id)}
                    toggleFavorite={toggleFavorite}
                    addToCart={addToCart}
                  />
                  <div className="item-overlay-effects">
                    <button 
                      className="quick-add-btn"
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart size={16} />
                      Quick Add
                    </button>
                    <button 
                      className="favorite-btn"
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Heart size={16} fill={favorites.includes(item.id) ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="no-results-premium">
              <div className="no-results-visual">
                <div className="empty-state-icon">
                  <Search size={48} />
                </div>
                <div className="empty-state-glow"></div>
              </div>
              <h3>No dishes found</h3>
              <p>Try exploring our other collections or adjust your search</p>
              <div className="empty-state-actions">
                <button 
                  className="reset-btn-premium"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("All")
                  }}
                >
                  <span>Reset Filters</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage

