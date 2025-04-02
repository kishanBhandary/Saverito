"use client"

import { useState, useEffect } from "react"

import PageHeader from "../components/PageHeader"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"
import FoodItem from "../components/FoodItem";
import { foodItems } from "../data/foodItems";

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
  }, [])

  return (
    <>
      <PageHeader title="Saverito" subtitle="just for you" />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        handleCategoryChange={handleCategoryChange}
      />

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
    </>
  )
}

export default HomePage

