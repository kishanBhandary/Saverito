"use client"

import { useState } from "react"
import { Plus, Edit3, Trash2, Search, Filter, Upload } from "lucide-react"

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", category: "Pizza", price: 450, status: "available", image: "/placeholder.svg" },
    { id: 2, name: "Chicken Burger", category: "Burger", price: 350, status: "available", image: "/placeholder.svg" },
    { id: 3, name: "Veg Fried Rice", category: "Chinese", price: 280, status: "unavailable", image: "/placeholder.svg" },
    { id: 4, name: "Pasta Alfredo", category: "Italian", price: 420, status: "available", image: "/placeholder.svg" },
    { id: 5, name: "Chicken Biryani", category: "Indian", price: 380, status: "available", image: "/placeholder.svg" }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "Pizza", "Burger", "Chinese", "Italian", "Indian"]

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: menuItems.length + 1,
      status: "available"
    }
    setMenuItems([...menuItems, item])
    setShowAddModal(false)
  }

  const handleEditItem = (updatedItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ))
    setEditItem(null)
  }

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id))
    }
  }

  const toggleItemStatus = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id 
        ? { ...item, status: item.status === "available" ? "unavailable" : "available" }
        : item
    ))
  }

  return (
    <div className="menu-management">
      <div className="menu-header">
        <h2>Menu Management</h2>
        <button 
          className="add-item-btn"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="menu-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search delicious food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={20} />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === "All" ? "🍽️ All Items" : 
                 cat === "Pizza" ? "🍕 Pizza" :
                 cat === "Burger" ? "🍔 Burger" :
                 cat === "Chinese" ? "🥡 Chinese" :
                 cat === "Italian" ? "🍝 Italian" :
                 cat === "Indian" ? "🍛 Indian" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3>No menu items found</h3>
          <p>
            {searchTerm || filterCategory !== "All" 
              ? "Try adjusting your search or filter criteria" 
              : "Start by adding your first delicious menu item!"}
          </p>
          {!searchTerm && filterCategory === "All" && (
            <button 
              className="add-item-btn"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={20} />
              Add Your First Item
            </button>
          )}
        </div>
      ) : (
        <div className="menu-items-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item-card">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                <div className="item-actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => setEditItem(item)}
                    title="Edit Item"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteItem(item.id)}
                    title="Delete Item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-category">
                  {item.category === "Pizza" ? "🍕" :
                   item.category === "Burger" ? "🍔" :
                   item.category === "Chinese" ? "🥡" :
                   item.category === "Italian" ? "🍝" :
                   item.category === "Indian" ? "🍛" : "🍽️"} {item.category}
                </p>
                <div className="item-details">
                  <span className="item-price">₹{item.price}</span>
                  <button 
                    className={`status-toggle ${item.status}`}
                    onClick={() => toggleItemStatus(item.id)}
                  >
                    {item.status === "available" ? "✅ Available" : "❌ Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editItem) && (
        <div className="modal-overlay" onClick={() => {
          setShowAddModal(false)
          setEditItem(null)
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ItemForm 
              item={editItem}
              onSubmit={editItem ? handleEditItem : handleAddItem}
              onCancel={() => {
                setShowAddModal(false)
                setEditItem(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const ItemForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "Pizza",
    price: item?.price || "",
    description: item?.description || "",
    image: item?.image || "/placeholder.svg"
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Item name is required"
    } else if (formData.name.length < 2) {
      newErrors.name = "Item name must be at least 2 characters"
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call delay
    setTimeout(() => {
      onSubmit({ ...item, ...formData, price: Number(formData.price) })
      setIsSubmitting(false)
    }, 800)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h3>
        {item ? "✏️ Edit Menu Item" : "➕ Add New Menu Item"}
      </h3>
      
      <div className="form-group">
        <label>
          🍽️ Item Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="e.g., Margherita Pizza"
          required
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>
          📂 Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          required
        >
          <option value="Pizza">🍕 Pizza</option>
          <option value="Burger">🍔 Burger</option>
          <option value="Chinese">🥡 Chinese</option>
          <option value="Italian">🍝 Italian</option>
          <option value="Indian">🍛 Indian</option>
          <option value="Dessert">🍰 Dessert</option>
          <option value="Beverages">🥤 Beverages</option>
        </select>
      </div>

      <div className="form-group">
        <label>
          💰 Price (₹)
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          placeholder="250"
          required
          min="1"
          step="1"
        />
        {errors.price && <span className="form-error">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>
          📝 Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your delicious dish..."
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>
          🖼️ Image URL (Optional)
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="cancel-btn" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          ❌ Cancel
        </button>
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>
              ⏳ {item ? "Updating..." : "Adding..."}
            </span>
          ) : (
            <span>
              {item ? "✅ Update Item" : "✨ Add Item"}
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

export default MenuManagement