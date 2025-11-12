"use client"

import { Heart } from "lucide-react"
import PageHeader from "../components/PageHeader"
import FoodItem from "../components/FoodItem"

const FavoritesPage = ({ favoriteItems, toggleFavorite, addToCart, handleTabChange }) => {
  return (
    <>
      <PageHeader title="Favorites" subtitle={`${favoriteItems.length} items saved`} />

      {favoriteItems.length > 0 ? (
        <div className="favorites-container">
          {favoriteItems.map((item) => (
            <FoodItem 
              key={item.id} 
              item={item} 
              isFavorite={true} 
              toggleFavorite={toggleFavorite} 
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <Heart size={64} />
          <p>No favorites yet</p>
          <button className="browse-menu-button" onClick={() => handleTabChange("home")}>
            Browse Menu
          </button>
        </div>
      )}
    </>
  )
}

export default FavoritesPage

