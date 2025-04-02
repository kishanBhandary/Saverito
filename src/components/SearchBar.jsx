"use client"

import { Search } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar

