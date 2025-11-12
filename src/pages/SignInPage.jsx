"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

const SignInPage = ({ onSwitchToSignUp, onSignInSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
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
    
    // Simulate API call
    setTimeout(() => {
      // Demo credentials - in real app, this would be API validation
      if ((formData.email === "test@test.com" && formData.password === "password") ||
          (formData.email === "admin@saverito.com" && formData.password === "password")) {
        
        const userData = {
          name: formData.email === "admin@saverito.com" ? "Admin User" : "Test User",
          email: formData.email,
          role: formData.email === "admin@saverito.com" ? "admin" : "user",
          id: formData.email === "admin@saverito.com" ? 1 : 2
        }
        
        onSignInSuccess(userData)
      } else {
        setErrors({ submit: "Invalid email or password" })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleDemoLogin = (type) => {
    if (type === "admin") {
      setFormData({
        email: "admin@saverito.com",
        password: "password"
      })
    } else {
      setFormData({
        email: "test@test.com",
        password: "password"
      })
    }
  }

  const handleForgotPassword = () => {
    // Placeholder for forgot password functionality
    alert("Forgot password functionality will be implemented")
  }

  return (
    <div className="auth-page">
      <div className="auth-container signin">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Saverito account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-container">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="forgot-password-btn"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Login Buttons */}
        <div className="demo-login-section">
          <p className="demo-login-title">Quick Demo Access:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-btn demo-admin"
              onClick={() => handleDemoLogin("admin")}
            >
              🔑 Admin Dashboard Access
              <span className="demo-hint">admin@saverito.com</span>
            </button>
            <button 
              type="button" 
              className="demo-btn demo-user"
              onClick={() => handleDemoLogin("user")}
            >
              👤 Regular User Access
              <span className="demo-hint">test@test.com</span>
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>Don't have an account? 
            <button 
              type="button"
              onClick={onSwitchToSignUp}
              className="auth-link-btn"
            >
              Sign Up
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <div className="social-auth">
          <button type="button" className="social-auth-btn google">
            <span className="social-icon">🔍</span>
            Continue with Google
          </button>
          <button type="button" className="social-auth-btn facebook">
            <span className="social-icon">📘</span>
            Continue with Facebook
          </button>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <p className="demo-info">Email: demo@saverito.com</p>
          <p className="demo-info">Password: demo123</p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage