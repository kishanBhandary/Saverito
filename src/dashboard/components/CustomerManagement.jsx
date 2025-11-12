"use client"

import { useState } from "react"
import { Search, Filter, Mail, Phone, MapPin, Star, Eye, Gift } from "lucide-react"

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      location: "Bangalore, India",
      totalOrders: 23,
      totalSpent: 8750,
      averageOrder: 380,
      lastOrder: "2025-11-12",
      rating: 4.8,
      status: "active",
      loyaltyPoints: 875,
      joinDate: "2024-08-15"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+91 87654 32109",
      location: "Bangalore, India",
      totalOrders: 18,
      totalSpent: 6240,
      averageOrder: 347,
      lastOrder: "2025-11-11",
      rating: 4.6,
      status: "active",
      loyaltyPoints: 624,
      joinDate: "2024-09-22"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+91 76543 21098",
      location: "Bangalore, India",
      totalOrders: 31,
      totalSpent: 12400,
      averageOrder: 400,
      lastOrder: "2025-11-10",
      rating: 4.9,
      status: "vip",
      loyaltyPoints: 1240,
      joinDate: "2024-06-10"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      phone: "+91 65432 10987",
      location: "Bangalore, India",
      totalOrders: 7,
      totalSpent: 2180,
      averageOrder: 311,
      lastOrder: "2025-10-28",
      rating: 4.3,
      status: "inactive",
      loyaltyPoints: 218,
      joinDate: "2024-10-05"
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@email.com",
      phone: "+91 54321 09876",
      location: "Bangalore, India",
      totalOrders: 45,
      totalSpent: 18900,
      averageOrder: 420,
      lastOrder: "2025-11-12",
      rating: 5.0,
      status: "vip",
      loyaltyPoints: 1890,
      joinDate: "2024-04-12"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false)

  const statuses = ["All", "active", "vip", "inactive"]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = filterStatus === "All" || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "vip": return "gold"
      case "active": return "green"
      case "inactive": return "gray"
      default: return "gray"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "vip": return "👑"
      case "active": return "🟢"
      case "inactive": return "⚫"
      default: return "⚫"
    }
  }

  const handleSendPromotion = (customerId) => {
    alert(`Promotion sent to customer ${customerId}!`)
  }

  const handleRewardLoyalty = (customerId, points) => {
    setCustomers(customers.map(customer => 
      customer.id === customerId 
        ? { ...customer, loyaltyPoints: customer.loyaltyPoints + points }
        : customer
    ))
    setShowLoyaltyModal(false)
    alert(`${points} loyalty points added!`)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === "active").length
  const vipCustomers = customers.filter(c => c.status === "vip").length
  const avgOrderValue = Math.round(customers.reduce((sum, c) => sum + c.averageOrder, 0) / customers.length)

  return (
    <div className="customer-management">
      <div className="customers-header">
        <h2>Customer Management</h2>
        <div className="customer-stats">
          <div className="stat-item">
            <span className="stat-number">{totalCustomers}</span>
            <span className="stat-label">Total Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{activeCustomers}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{vipCustomers}</span>
            <span className="stat-label">VIP Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">₹{avgOrderValue}</span>
            <span className="stat-label">Avg Order Value</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="customers-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={20} />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === "All" ? "All Customers" : status.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="customers-grid">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="customer-card">
            <div className="customer-header">
              <div className="customer-avatar">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div className="customer-basic">
                <h3>{customer.name}</h3>
                <div className="customer-status">
                  <span className={`status-badge status-${getStatusColor(customer.status)}`}>
                    {getStatusIcon(customer.status)} {customer.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="customer-actions">
                <button 
                  className="action-btn view"
                  onClick={() => setSelectedCustomer(customer)}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button 
                  className="action-btn promotion"
                  onClick={() => handleSendPromotion(customer.id)}
                  title="Send Promotion"
                >
                  <Mail size={16} />
                </button>
              </div>
            </div>

            <div className="customer-info">
              <div className="info-row">
                <Mail size={16} />
                <span>{customer.email}</span>
              </div>
              <div className="info-row">
                <Phone size={16} />
                <span>{customer.phone}</span>
              </div>
              <div className="info-row">
                <MapPin size={16} />
                <span>{customer.location}</span>
              </div>
            </div>

            <div className="customer-stats">
              <div className="stat-group">
                <div className="stat">
                  <span className="stat-value">{customer.totalOrders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat">
                  <span className="stat-value">₹{customer.totalSpent.toLocaleString()}</span>
                  <span className="stat-label">Spent</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{customer.loyaltyPoints}</span>
                  <span className="stat-label">Points</span>
                </div>
              </div>
              <div className="customer-rating">
                <Star size={16} className="star-filled" />
                <span>{customer.rating}</span>
              </div>
            </div>

            <div className="customer-footer">
              <span className="last-order">Last order: {customer.lastOrder}</span>
              <button 
                className="reward-btn"
                onClick={() => {
                  setSelectedCustomer(customer)
                  setShowLoyaltyModal(true)
                }}
              >
                <Gift size={16} />
                Reward
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && !showLoyaltyModal && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content customer-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Customer Profile - {selectedCustomer.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedCustomer(null)}
              >
                ×
              </button>
            </div>

            <div className="customer-detail-content">
              <div className="detail-section">
                <h4>Contact Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Email</label>
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone</label>
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Location</label>
                    <span>{selectedCustomer.location}</span>
                  </div>
                  <div className="detail-item">
                    <label>Member Since</label>
                    <span>{selectedCustomer.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Order Statistics</h4>
                <div className="stats-grid">
                  <div className="stats-card">
                    <span className="stats-number">{selectedCustomer.totalOrders}</span>
                    <span className="stats-label">Total Orders</span>
                  </div>
                  <div className="stats-card">
                    <span className="stats-number">₹{selectedCustomer.totalSpent.toLocaleString()}</span>
                    <span className="stats-label">Total Spent</span>
                  </div>
                  <div className="stats-card">
                    <span className="stats-number">₹{selectedCustomer.averageOrder}</span>
                    <span className="stats-label">Avg Order</span>
                  </div>
                  <div className="stats-card">
                    <span className="stats-number">{selectedCustomer.loyaltyPoints}</span>
                    <span className="stats-label">Loyalty Points</span>
                  </div>
                </div>
              </div>

              <div className="detail-actions">
                <button 
                  className="action-button primary"
                  onClick={() => handleSendPromotion(selectedCustomer.id)}
                >
                  <Mail size={16} />
                  Send Promotion
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => setShowLoyaltyModal(true)}
                >
                  <Gift size={16} />
                  Add Loyalty Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loyalty Points Modal */}
      {showLoyaltyModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowLoyaltyModal(false)}>
          <div className="modal-content loyalty-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Loyalty Points</h3>
              <button 
                className="close-btn"
                onClick={() => setShowLoyaltyModal(false)}
              >
                ×
              </button>
            </div>

            <div className="loyalty-content">
              <p>Add loyalty points for <strong>{selectedCustomer.name}</strong></p>
              <p>Current Points: <strong>{selectedCustomer.loyaltyPoints}</strong></p>
              
              <div className="points-options">
                <button 
                  className="points-btn"
                  onClick={() => handleRewardLoyalty(selectedCustomer.id, 50)}
                >
                  +50 Points
                </button>
                <button 
                  className="points-btn"
                  onClick={() => handleRewardLoyalty(selectedCustomer.id, 100)}
                >
                  +100 Points
                </button>
                <button 
                  className="points-btn"
                  onClick={() => handleRewardLoyalty(selectedCustomer.id, 200)}
                >
                  +200 Points
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerManagement