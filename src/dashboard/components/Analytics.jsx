"use client"

import { useState } from "react"
import { BarChart, TrendingUp, TrendingDown, Calendar, Download } from "lucide-react"

const Analytics = () => {
  const [dateRange, setDateRange] = useState("7days")
  
  const salesData = [
    { day: "Mon", orders: 45, revenue: 12500 },
    { day: "Tue", orders: 38, revenue: 9800 },
    { day: "Wed", orders: 52, revenue: 14200 },
    { day: "Thu", orders: 41, revenue: 11200 },
    { day: "Fri", orders: 67, revenue: 18500 },
    { day: "Sat", orders: 78, revenue: 22100 },
    { day: "Sun", orders: 69, revenue: 19800 }
  ]

  const topItems = [
    { name: "Margherita Pizza", sold: 145, revenue: 65250, trend: "+12%" },
    { name: "Chicken Burger", sold: 123, revenue: 43050, trend: "+8%" },
    { name: "Chicken Biryani", sold: 98, revenue: 37240, trend: "-3%" },
    { name: "Pasta Alfredo", sold: 87, revenue: 36540, trend: "+15%" },
    { name: "Veg Fried Rice", sold: 76, revenue: 21280, trend: "+5%" }
  ]

  const categoryData = [
    { category: "Pizza", percentage: 35, orders: 287, color: "#2563eb" },
    { category: "Burger", percentage: 25, orders: 205, color: "#3b82f6" },
    { category: "Chinese", percentage: 20, orders: 164, color: "#06b6d4" },
    { category: "Italian", percentage: 15, orders: 123, color: "#0ea5e9" },
    { category: "Indian", percentage: 5, orders: 41, color: "#84cc16" }
  ]

  const timeSlotData = [
    { time: "9-11 AM", orders: 23, percentage: 8 },
    { time: "11 AM-1 PM", orders: 89, percentage: 31 },
    { time: "1-3 PM", orders: 76, percentage: 26 },
    { time: "3-6 PM", orders: 45, percentage: 16 },
    { time: "6-9 PM", orders: 98, percentage: 34 },
    { time: "9-11 PM", orders: 67, percentage: 23 }
  ]

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0)
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0)
  const avgOrderValue = Math.round(totalRevenue / totalOrders)

  const getMaxRevenue = () => Math.max(...salesData.map(d => d.revenue))
  const getMaxOrders = () => Math.max(...salesData.map(d => d.orders))

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>Analytics & Reports</h2>
        <div className="header-controls">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="year">This Year</option>
          </select>
          <button className="download-btn">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="metric-value">₹{totalRevenue.toLocaleString()}</p>
            <span className="metric-change positive">
              <TrendingUp size={16} />
              +12% vs last week
            </span>
          </div>
          <div className="card-icon revenue">
            <BarChart size={24} />
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <h3>Total Orders</h3>
            <p className="metric-value">{totalOrders}</p>
            <span className="metric-change positive">
              <TrendingUp size={16} />
              +8% vs last week
            </span>
          </div>
          <div className="card-icon orders">
            <Calendar size={24} />
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <h3>Avg Order Value</h3>
            <p className="metric-value">₹{avgOrderValue}</p>
            <span className="metric-change negative">
              <TrendingDown size={16} />
              -2% vs last week
            </span>
          </div>
          <div className="card-icon avg">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <h3>Peak Day</h3>
            <p className="metric-value">Saturday</p>
            <span className="metric-change neutral">
              78 orders, ₹22.1k revenue
            </span>
          </div>
          <div className="card-icon peak">
            <Calendar size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Chart */}
        <div className="chart-container">
          <h3>Daily Revenue</h3>
          <div className="bar-chart">
            {salesData.map((day, index) => (
              <div key={index} className="bar-item">
                <div 
                  className="bar revenue-bar"
                  style={{ 
                    height: `${(day.revenue / getMaxRevenue()) * 200}px`,
                    background: `linear-gradient(135deg, #2563eb, #3b82f6)`
                  }}
                  title={`₹${day.revenue}`}
                ></div>
                <span className="bar-label">{day.day}</span>
                <span className="bar-value">₹{(day.revenue / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="chart-container">
          <h3>Daily Orders</h3>
          <div className="bar-chart">
            {salesData.map((day, index) => (
              <div key={index} className="bar-item">
                <div 
                  className="bar orders-bar"
                  style={{ 
                    height: `${(day.orders / getMaxOrders()) * 200}px`,
                    background: `linear-gradient(135deg, #06b6d4, #0ea5e9)`
                  }}
                  title={`${day.orders} orders`}
                ></div>
                <span className="bar-label">{day.day}</span>
                <span className="bar-value">{day.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="analytics-grid">
        <div className="category-chart">
          <h3>Category Performance</h3>
          <div className="category-bars">
            {categoryData.map((item, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <span className="category-name">{item.category}</span>
                  <span className="category-orders">{item.orders} orders</span>
                </div>
                <div className="category-bar-container">
                  <div 
                    className="category-bar"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                  <span className="category-percentage">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-items">
          <h3>Top Selling Items</h3>
          <div className="items-list">
            {topItems.map((item, index) => (
              <div key={index} className="item-row">
                <div className="item-rank">#{index + 1}</div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-stats">{item.sold} sold • ₹{item.revenue.toLocaleString()}</p>
                </div>
                <div className={`item-trend ${item.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.trend.startsWith('+') ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Analysis */}
      <div className="time-analysis">
        <h3>Peak Hours Analysis</h3>
        <div className="time-slots">
          {timeSlotData.map((slot, index) => (
            <div key={index} className="time-slot">
              <div className="slot-header">
                <span className="slot-time">{slot.time}</span>
                <span className="slot-orders">{slot.orders} orders</span>
              </div>
              <div className="slot-bar-container">
                <div 
                  className="slot-bar"
                  style={{ width: `${slot.percentage}%` }}
                ></div>
              </div>
              <span className="slot-percentage">{slot.percentage}% of total</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analytics