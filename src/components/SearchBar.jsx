"use client"

import { Search, X } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="search-container">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder="Search for delicious food..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="clear-search-button" onClick={clearSearch} aria-label="Clear search">
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default SearchBar

