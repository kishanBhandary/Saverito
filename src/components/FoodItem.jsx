"use client"

import { Heart } from "lucide-react"

const FoodItem = ({ item, isFavorite, toggleFavorite }) => {
  return (
    <div className="food-item">
      <div className="food-item-image">
        <img src={item.image || "/placeholder.svg"} alt={item.name} />
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(item.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={isFavorite ? "filled" : ""} size={20} />
        </button>
      </div>
      <div className="food-item-details">
        <h3>{item.name}</h3>
        <p className="price">₹{item.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default FoodItem

