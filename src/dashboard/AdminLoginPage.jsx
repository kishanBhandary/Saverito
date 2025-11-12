"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, Lock, User, ArrowRight } from "lucide-react"

const AdminLoginPage = ({ onAdminLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      // Admin credentials check
      if (formData.email === "admin@saverito.com" && formData.password === "admin123") {
        const adminData = {
          name: "Admin User",
          email: formData.email,
          role: "admin",
          id: 1,
          permissions: ["dashboard", "menu", "orders", "analytics", "customers"]
        }
        
        onAdminLoginSuccess(adminData)
      } else {
        setErrors({ submit: "Invalid admin credentials" })
      }
      setIsLoading(false)
    }, 1200)
  }

  const handleDemoLogin = () => {
    setFormData({
      email: "admin@saverito.com",
      password: "admin123"
    })
  }

  return (
    <div className="admin-login-container">
      {/* Background Elements */}
      <div className="admin-bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        <div className="bg-gradient-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="admin-login-content">
        {/* Left Side - Branding */}
        <div className="admin-branding">
          <div className="admin-logo">
            <Shield size={48} className="logo-icon" />
            <span className="logo-text">Saverito Admin</span>
          </div>
          
          <div className="admin-welcome">
            <h1>Welcome Back</h1>
            <p>Access your restaurant dashboard with secure admin credentials</p>
          </div>

          <div className="admin-features">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>Analytics Dashboard</h3>
                <p>Track sales, orders, and customer insights</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🍽️</div>
              <div className="feature-text">
                <h3>Menu Management</h3>
                <p>Add, edit, and manage your restaurant menu</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📋</div>
              <div className="feature-text">
                <h3>Order Tracking</h3>
                <p>Monitor and update order status in real-time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="admin-form-section">
          <div className="admin-form-container">
            <div className="form-header">
              <div className="admin-shield">
                <Lock size={24} />
              </div>
              <h2>Admin Access</h2>
              <p>Sign in to your restaurant dashboard</p>
            </div>

            {errors.submit && (
              <div className="admin-error-banner">
                <span className="error-icon">⚠️</span>
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label htmlFor="email" className="admin-label">
                  <User size={16} />
                  Admin Email
                </label>
                <div className="admin-input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`admin-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your admin email"
                  />
                </div>
                {errors.email && <span className="admin-error">{errors.email}</span>}
              </div>

              <div className="admin-form-group">
                <label htmlFor="password" className="admin-label">
                  <Lock size={16} />
                  Password
                </label>
                <div className="admin-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`admin-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="admin-error">{errors.password}</span>}
              </div>

              <button 
                type="submit" 
                className={`admin-submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="admin-loading-spinner"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Dashboard
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Demo Access */}
            <div className="admin-demo-section">
              <div className="demo-divider">
                <span>Quick Demo Access</span>
              </div>
              
              <button 
                type="button" 
                className="admin-demo-btn"
                onClick={handleDemoLogin}
              >
                <Shield size={18} />
                Use Demo Admin Credentials
                <span className="demo-hint">admin@saverito.com</span>
              </button>
            </div>

            {/* Security Notice */}
            <div className="admin-security-notice">
              <Shield size={16} />
              <span>Your session is secured with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage