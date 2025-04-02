"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CategoryFilter = ({ categories, activeCategory, handleCategoryChange }) => {
  const categoryRef = useRef(null)
  const [showScrollLeft, setShowScrollLeft] = useState(false)
  const [showScrollRight, setShowScrollRight] = useState(false)

  // Scroll to category function
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

  // Add this after component mounts to ensure active category is visible
  useEffect(() => {
    // Ensure active category is visible on initial load
    if (activeCategory) {
      setTimeout(() => {
        scrollToCategory(activeCategory)
      }, 300)
    }
  }, [activeCategory])

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

  return (
    <div className="category-wrapper">
      {showScrollLeft && (
        <button className="category-scroll-button left" onClick={scrollLeft} aria-label="Scroll categories left">
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="category-filters" ref={categoryRef}>
        {categories.map((category) => (
          <button
            key={category}
            id={`category-${category}`}
            className={`category-button ${activeCategory === category ? "active" : ""}`}
            onClick={() => {
              handleCategoryChange(category)
              scrollToCategory(category)
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {showScrollRight && (
        <button className="category-scroll-button right" onClick={scrollRight} aria-label="Scroll categories right">
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  )
}

export default CategoryFilter

