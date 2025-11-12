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
            placeholder="Search menu items..."
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
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Items Grid */}
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
              <p className="item-category">{item.category}</p>
              <div className="item-details">
                <span className="item-price">₹{item.price}</span>
                <button 
                  className={`status-toggle ${item.status}`}
                  onClick={() => toggleItemStatus(item.id)}
                >
                  {item.status === "available" ? "Available" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...item, ...formData, price: Number(formData.price) })
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h3>{item ? "Edit Menu Item" : "Add New Menu Item"}</h3>
      
      <div className="form-group">
        <label>Item Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Indian">Indian</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price (₹)</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Description (Optional)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {item ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  )
}

export default MenuManagement