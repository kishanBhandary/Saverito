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
  Star,
  Settings,
  Bell,
  LogOut,
  Home,
  Menu,
  X
} from "lucide-react"
import MenuManagement from "./components/MenuManagement"
import OrderManagement from "./components/OrderManagement"
import Analytics from "./components/Analytics"
import CustomerManagement from "./components/CustomerManagement"

const DashboardPage = ({ user, onLogout, onGoToMainSite }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

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

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout() // Call parent logout function
    } else {
      // Fallback for direct access
      localStorage.removeItem('saverito_user')
      window.location.href = '/'
    }
  }

  // Handle going back to main site
  const handleGoToMainSite = () => {
    if (onGoToMainSite) {
      onGoToMainSite() // Call parent navigation function
    } else {
      // Fallback for direct access
      window.location.href = '/'
    }
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
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>🍽️ Welcome back, {user?.name || 'Admin'}!</h2>
          <p>Here's what's happening at Saverito today. Your restaurant is performing great!</p>
        </div>
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-number">47</span>
            <span className="stat-label">Today's Orders</span>
          </div>
          <div className="quick-stat">
            <span className="stat-number">₹12.5K</span>
            <span className="stat-label">Revenue</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-card-${stat.color}`}>
            <div className="stat-content">
              <div className="stat-icon-wrapper">
                <stat.icon size={28} />
              </div>
              <div className="stat-text">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <div className="stat-trend">
                  <span className="stat-change positive">{stat.change}</span>
                  <span className="stat-period">vs last week</span>
                </div>
              </div>
            </div>
            <div className="stat-background"></div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="section-header">
          <h3>⚡ Quick Actions</h3>
          <p>Manage your restaurant efficiently with these shortcuts</p>
        </div>
        <div className="action-buttons">
          <button 
            className="action-btn action-btn-primary"
            onClick={() => setActiveTab("menu")}
          >
            <Plus size={20} />
            <span>Add New Dish</span>
            <small>Create menu item</small>
          </button>
          <button 
            className="action-btn action-btn-secondary"
            onClick={() => setActiveTab("orders")}
          >
            <Eye size={20} />
            <span>View All Orders</span>
            <small>Manage orders</small>
          </button>
          <button 
            className="action-btn action-btn-tertiary"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 size={20} />
            <span>View Analytics</span>
            <small>Business insights</small>
          </button>
          <button 
            className="action-btn action-btn-quaternary"
            onClick={() => setActiveTab("customers")}
          >
            <Users size={20} />
            <span>Customer Data</span>
            <small>Manage customers</small>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="section-header">
          <div>
            <h3>📋 Recent Orders</h3>
            <p>Latest customer orders and their status</p>
          </div>
          <button 
            className="view-all-btn"
            onClick={() => setActiveTab("orders")}
          >
            View All Orders
          </button>
        </div>
        <div className="orders-container">
          {recentOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">{order.id}</div>
                <div className={`order-status status-${order.status}`}>
                  <span className="status-dot"></span>
                  {order.status === 'preparing' ? '👨‍🍳 Preparing' :
                   order.status === 'ready' ? '✅ Ready' :
                   order.status === 'delivered' ? '🚀 Delivered' : '❌ Cancelled'}
                </div>
              </div>
              <div className="order-details">
                <div className="customer-info">
                  <h4>{order.customer}</h4>
                  <p>{order.items}</p>
                </div>
                <div className="order-meta">
                  <span className="order-amount">{order.amount}</span>
                  <span className="order-time">{order.time}</span>
                </div>
              </div>
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
      {/* Professional Admin Navbar */}
      <nav className="admin-navbar">
        <div className="navbar-left">
          {/* Brand Logo */}
          <div className="admin-brand">
            <div className="brand-icon">🍽️</div>
            <div className="brand-text">
              <span className="brand-name">Saverito</span>
              <span className="brand-subtitle">Admin Panel</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`navbar-center ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
          <button 
            className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("overview")
              setIsMobileNavOpen(false)
            }}
          >
            <BarChart3 size={20} />
            <span>Overview</span>
          </button>
          <button 
            className={`nav-link ${activeTab === "menu" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("menu")
              setIsMobileNavOpen(false)
            }}
          >
            <Edit3 size={20} />
            <span>Menu</span>
          </button>
          <button 
            className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("orders")
              setIsMobileNavOpen(false)
            }}
          >
            <ShoppingBag size={20} />
            <span>Orders</span>
            <span className="notification-badge">3</span>
          </button>
          <button 
            className={`nav-link ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("analytics")
              setIsMobileNavOpen(false)
            }}
          >
            <TrendingUp size={20} />
            <span>Analytics</span>
          </button>
          <button 
            className={`nav-link ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("customers")
              setIsMobileNavOpen(false)
            }}
          >
            <Users size={20} />
            <span>Customers</span>
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-right">
          {/* Notifications */}
          <div className="notification-dropdown">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            {showNotifications && (
              <div className="notification-panel">
                <div className="notification-header">
                  <h4>Notifications</h4>
                </div>
                <div className="notification-list">
                  <div className="notification-item">
                    <div className="notification-icon preparing">👨‍🍳</div>
                    <div className="notification-content">
                      <p>3 orders are being prepared</p>
                      <span>2 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon ready">✅</div>
                    <div className="notification-content">
                      <p>Order #ORD002 is ready for pickup</p>
                      <span>5 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon customer">👥</div>
                    <div className="notification-content">
                      <p>New customer registered</p>
                      <span>10 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="admin-profile">
            <div className="profile-info">
              <span className="admin-name">{user?.name || 'Admin'}</span>
              <span className="admin-role">Restaurant Admin</span>
            </div>
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="navbar-actions">
            <button 
              className="action-button home-btn"
              onClick={handleGoToMainSite}
              title="Go to Main Site"
            >
              <Home size={18} />
            </button>
            <button 
              className="action-button settings-btn"
              title="Settings"
            >
              <Settings size={18} />
            </button>
            <button 
              className="action-button logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-main-content">
        {renderContent()}
      </main>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default DashboardPage