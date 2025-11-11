"use client"

import { useState, useEffect } from "react"

import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import FoodItem from "../components/FoodItem";
import { foodItems } from "../data/fooditems";

const HomePage = ({ toggleFavorite, favorites }) => {
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
    <div className="main-content">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Order food online from restaurants</h1>
          <p className="hero-subtitle">Discover the best food & drinks in your city</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines or dishes"
              className="hero-search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="content-container">
        {/* Categories Section */}
        <section className="categories-section">
          <h2 className="section-title">What's on your mind?</h2>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Search Bar for filtering */}
        {searchQuery && (
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        )}

        {/* Food Items Section */}
        <section className="food-items-section">
          <h2 className="section-title">
            {activeCategory === "All" 
              ? "Restaurants with online food delivery" 
              : `${activeCategory} Restaurants`
            }
            <span className="results-count">({filteredItems.length} restaurants)</span>
          </h2>
          
          <div className="food-items-container">
            {filteredItems.map((item) => (
              <FoodItem
                key={item.id}
                item={item}
                isFavorite={favorites.includes(item.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="no-results">
              <h3>No restaurants found</h3>
              <p>Try adjusting your search or browse our categories</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage

