"use client"

import { Search, X, Sparkles, Zap } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="ultra-search-wrapper">
      <div className="ultra-search-container">
        <div className="search-icon-container">
          <Search size={20} className="ultra-search-icon" />
        </div>
        
        <input
          type="text"
          placeholder="Search campus food & snacks..."
          className="ultra-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {searchQuery && (
          <button className="ultra-clear-button" onClick={clearSearch} aria-label="Clear search">
            <X size={16} />
          </button>
        )}
        
        {!searchQuery && (
          <div className="search-enhancement-icons">
            <Sparkles size={14} className="enhancement-icon" />
            <Zap size={14} className="enhancement-icon" />
          </div>
        )}
      </div>
      
      <div className="search-suggestion-hint">
        <span>Try searching for "samosa", "thali", or "biryani"</span>
      </div>
    </div>
  )
}

export default SearchBar

