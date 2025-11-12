"use client"

import { useState } from "react"
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus,
  Edit3,
  Trash2,
  Eye,
  DollarSign,
  Clock,
  Star
} from "lucide-react"
import MenuManagement from "./components/MenuManagement"
import OrderManagement from "./components/OrderManagement"
import Analytics from "./components/Analytics"
import CustomerManagement from "./components/CustomerManagement"

const DashboardPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("overview")

  // Check if accessing via direct URL
  const isDirectAccess = window.location.pathname === '/dashboard/admin'

  // Check if user has admin privileges or is accessing directly
  const isAdmin = user?.role === "admin" || user?.email === "admin@saverito.com" || isDirectAccess

  if (!isAdmin && !isDirectAccess) {
    return (
      <div className="dashboard-access-denied">
        <div className="access-denied-content">
          <div className="access-denied-icon">🔒</div>
          <h2>Access Denied</h2>
          <p>You don't have permission to access the restaurant dashboard.</p>
          <p>Please contact an administrator for access.</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Today's Orders",
      value: "47",
      change: "+12%",
      icon: ShoppingBag,
      color: "blue"
    },
    {
      title: "Revenue",
      value: "₹12,485",
      change: "+8%",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Active Customers",
      value: "1,234",
      change: "+5%",
      icon: Users,
      color: "purple"
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "orange"
    }
  ]

  const recentOrders = [
    { id: "#ORD001", customer: "John Doe", items: "2x Pizza, 1x Coke", amount: "₹850", time: "5 min ago", status: "preparing" },
    { id: "#ORD002", customer: "Sarah Wilson", items: "1x Burger, 1x Fries", amount: "₹450", time: "12 min ago", status: "ready" },
    { id: "#ORD003", customer: "Mike Johnson", items: "3x Chinese Combo", amount: "₹1,200", time: "18 min ago", status: "delivered" },
    { id: "#ORD004", customer: "Emma Davis", items: "2x Italian Pasta", amount: "₹750", time: "25 min ago", status: "cancelled" },
    { id: "#ORD005", customer: "Alex Brown", items: "1x Pizza, 2x Drinks", amount: "₹650", time: "32 min ago", status: "delivered" }
  ]

  const renderOverview = () => (
    <div className="dashboard-overview">
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-card-${stat.color}`}>
            <div className="stat-content">
              <div className="stat-text">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-change positive">{stat.change}</span>
              </div>
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button 
            className="action-btn action-btn-primary"
            onClick={() => setActiveTab("menu")}
          >
            <Plus size={20} />
            Add New Dish
          </button>
          <button 
            className="action-btn action-btn-secondary"
            onClick={() => setActiveTab("orders")}
          >
            <Eye size={20} />
            View All Orders
          </button>
          <button 
            className="action-btn action-btn-tertiary"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={20} />
            View Analytics
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button 
            className="view-all-btn"
            onClick={() => setActiveTab("orders")}
          >
            View All
          </button>
        </div>
        <div className="orders-table">
          <div className="table-header">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Items</span>
            <span>Amount</span>
            <span>Time</span>
            <span>Status</span>
          </div>
          {recentOrders.map((order) => (
            <div key={order.id} className="table-row">
              <span className="order-id">{order.id}</span>
              <span className="customer-name">{order.customer}</span>
              <span className="order-items">{order.items}</span>
              <span className="order-amount">{order.amount}</span>
              <span className="order-time">{order.time}</span>
              <span className={`order-status status-${order.status}`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview()
      case "menu":
        return <MenuManagement />
      case "orders":
        return <OrderManagement />
      case "analytics":
        return <Analytics />
      case "customers":
        return <CustomerManagement />
      default:
        return renderOverview()
    }
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Restaurant Dashboard</h1>
          <p>Welcome back, {user?.name || 'Admin'}! Here's what's happening at Saverito today.</p>
        </div>
        <div className="dashboard-user">
          <div className="user-avatar-large">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name || 'Admin User'}</p>
            <p className="user-role">Restaurant Admin</p>
          </div>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <BarChart3 size={20} />
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === "menu" ? "active" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          <Edit3 size={20} />
          Menu Management
        </button>
        <button 
          className={`nav-tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingBag size={20} />
          Orders
        </button>
        <button 
          className={`nav-tab ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <TrendingUp size={20} />
          Analytics
        </button>
        <button 
          className={`nav-tab ${activeTab === "customers" ? "active" : ""}`}
          onClick={() => setActiveTab("customers")}
        >
          <Users size={20} />
          Customers
        </button>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default DashboardPage