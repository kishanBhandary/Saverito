"use client"

import { Heart, Plus, Star } from "lucide-react"

const FoodItem = ({ item, isFavorite, toggleFavorite }) => {
  const rating = 4.5 + (item.id % 10) * 0.1 // Generate pseudo-random ratings

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <div className="food-item-image">
          <img src={item.image || "/placeholder.svg"} alt={item.name} />
          <div className="image-overlay">
            <button className="quick-add-button" aria-label="Quick add to cart">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(item.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={isFavorite ? "filled" : ""} size={16} />
        </button>
      </div>
      
      <div className="food-item-content">
        <div className="food-item-header">
          <div className="food-item-info">
            <h3 className="food-item-name">{item.name}</h3>
            <span className="food-item-category">{item.category}</span>
          </div>
          <div className="food-item-price">₹{item.price.toFixed(0)}</div>
        </div>
        
        <div className="food-item-footer">
          <div className="rating">
            <Star size={14} className="star-icon" />
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="rating-count">({Math.floor(Math.random() * 100) + 50})</span>
          </div>
          <div className="delivery-time">
            <span>🚀 {15 + (item.id % 20)} min</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodItem

