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

      let scrollLeft
      if (isMobile) {
        scrollLeft = categoryElement.offsetLeft - 20
      } else {
        scrollLeft = categoryElement.offsetLeft - container.offsetWidth / 2 + categoryElement.offsetWidth / 2
      }

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Check if scroll buttons should be shown
  useEffect(() => {
    const checkScroll = () => {
      if (categoryRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current
        const threshold = 5

        setShowScrollLeft(scrollLeft > threshold)
        setShowScrollRight(scrollLeft < scrollWidth - clientWidth - threshold)
      }
    }

    checkScroll()
    const currentRef = categoryRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll)
      }
      window.removeEventListener("resize", checkScroll)
    }
  }, [categories])

  useEffect(() => {
    if (activeCategory) {
      setTimeout(() => {
        scrollToCategory(activeCategory)
      }, 300)
    }
  }, [activeCategory])

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
    <div className="premium-category-wrapper">
      {showScrollLeft && (
        <button className="premium-scroll-button left" onClick={scrollLeft} aria-label="Scroll categories left">
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="premium-category-container">
        <div className="premium-category-filters" ref={categoryRef}>
          {categories.map((category) => (
            <button
              key={category}
              id={`category-${category}`}
              className={`premium-category-button ${activeCategory === category ? "premium-active" : ""}`}
              onClick={() => {
                handleCategoryChange(category)
                scrollToCategory(category)
              }}
            >
              <span className="category-text">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {showScrollRight && (
        <button className="premium-scroll-button right" onClick={scrollRight} aria-label="Scroll categories right">
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  )
}

export default CategoryFilter

