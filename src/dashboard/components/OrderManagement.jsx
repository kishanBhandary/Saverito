"use client"

import { useState } from "react"
import { Search, Filter, Eye, Check, X, Clock, Truck } from "lucide-react"

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      phone: "+91 98765 43210",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 450 },
        { name: "Coke", quantity: 1, price: 50 }
      ],
      total: 950,
      status: "preparing",
      orderTime: "2025-11-12T10:30:00",
      address: "123 Main Street, Bangalore"
    },
    {
      id: "ORD002",
      customer: "Sarah Wilson",
      phone: "+91 87654 32109",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 350 },
        { name: "French Fries", quantity: 1, price: 100 }
      ],
      total: 450,
      status: "ready",
      orderTime: "2025-11-12T10:18:00",
      address: "456 Park Avenue, Bangalore"
    },
    {
      id: "ORD003",
      customer: "Mike Johnson",
      phone: "+91 76543 21098",
      items: [
        { name: "Chinese Combo", quantity: 3, price: 400 }
      ],
      total: 1200,
      status: "delivered",
      orderTime: "2025-11-12T10:12:00",
      address: "789 Lake View, Bangalore"
    },
    {
      id: "ORD004",
      customer: "Emma Davis",
      phone: "+91 65432 10987",
      items: [
        { name: "Pasta Alfredo", quantity: 2, price: 420 }
      ],
      total: 840,
      status: "cancelled",
      orderTime: "2025-11-12T10:05:00",
      address: "321 Hill Station, Bangalore"
    },
    {
      id: "ORD005",
      customer: "Alex Brown",
      phone: "+91 54321 09876",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 450 },
        { name: "Drinks", quantity: 2, price: 100 }
      ],
      total: 650,
      status: "delivered",
      orderTime: "2025-11-12T09:58:00",
      address: "654 Garden Street, Bangalore"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const statuses = ["All", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "preparing": return <Clock size={16} />
      case "ready": return <Check size={16} />
      case "out-for-delivery": return <Truck size={16} />
      case "delivered": return <Check size={16} />
      case "cancelled": return <X size={16} />
      default: return <Clock size={16} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing": return "orange"
      case "ready": return "blue"
      case "out-for-delivery": return "purple"
      case "delivered": return "green"
      case "cancelled": return "red"
      default: return "gray"
    }
  }

  const formatTime = (timeString) => {
    const time = new Date(timeString)
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getTimeAgo = (timeString) => {
    const now = new Date()
    const orderTime = new Date(timeString)
    const diffMs = now - orderTime
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}h ${diffMins % 60}m ago`
  }

  return (
    <div className="order-management">
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="order-stats">
          <div className="stat-item">
            <span className="stat-number">{orders.filter(o => o.status === "preparing").length}</span>
            <span className="stat-label">Preparing</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{orders.filter(o => o.status === "ready").length}</span>
            <span className="stat-label">Ready</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{orders.filter(o => o.status === "out-for-delivery").length}</span>
            <span className="stat-label">Out for Delivery</span>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="orders-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by order ID or customer name..."
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
                {status === "All" ? "All Orders" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id-time">
                <h3>{order.id}</h3>
                <span className="order-time">{getTimeAgo(order.orderTime)}</span>
              </div>
              <div className="order-actions">
                <span className={`order-status status-${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.replace("-", " ")}
                </span>
                <button 
                  className="view-btn"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <div className="order-content">
              <div className="customer-info">
                <p className="customer-name">{order.customer}</p>
                <p className="customer-phone">{order.phone}</p>
              </div>
              <div className="order-items">
                <p>{order.items.map(item => `${item.quantity}x ${item.name}`).join(", ")}</p>
              </div>
              <div className="order-total">
                <span className="total-amount">₹{order.total}</span>
              </div>
            </div>

            {order.status === "preparing" && (
              <div className="order-quick-actions">
                <button 
                  className="action-btn ready"
                  onClick={() => updateOrderStatus(order.id, "ready")}
                >
                  Mark Ready
                </button>
                <button 
                  className="action-btn cancel"
                  onClick={() => updateOrderStatus(order.id, "cancelled")}
                >
                  Cancel Order
                </button>
              </div>
            )}

            {order.status === "ready" && (
              <div className="order-quick-actions">
                <button 
                  className="action-btn delivery"
                  onClick={() => updateOrderStatus(order.id, "out-for-delivery")}
                >
                  Send for Delivery
                </button>
              </div>
            )}

            {order.status === "out-for-delivery" && (
              <div className="order-quick-actions">
                <button 
                  className="action-btn delivered"
                  onClick={() => updateOrderStatus(order.id, "delivered")}
                >
                  Mark Delivered
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content order-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details - {selectedOrder.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="order-detail-content">
              <div className="detail-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Address:</strong> {selectedOrder.address}</p>
                <p><strong>Order Time:</strong> {formatTime(selectedOrder.orderTime)}</p>
              </div>

              <div className="detail-section">
                <h4>Order Items</h4>
                <div className="order-items-detail">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="item-row">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="total-row">
                    <span><strong>Total:</strong></span>
                    <span></span>
                    <span><strong>₹{selectedOrder.total}</strong></span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Order Status</h4>
                <div className="status-buttons">
                  {["preparing", "ready", "out-for-delivery", "delivered", "cancelled"].map(status => (
                    <button
                      key={status}
                      className={`status-btn ${selectedOrder.status === status ? "active" : ""}`}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, status)
                        setSelectedOrder({...selectedOrder, status})
                      }}
                    >
                      {getStatusIcon(status)}
                      {status.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement