"use client"

import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react"

const CartPage = ({ 
  cartItems, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart, 
  getCartTotal 
}) => {
  const deliveryFee = 40
  const taxes = Math.round(getCartTotal() * 0.05) // 5% tax
  const finalTotal = getCartTotal() + deliveryFee + taxes

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={80} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some delicious food items to get started!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Cart</h1>
          <button 
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear All
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <div className="cart-item-price">₹{item.price}</div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    className="remove-item-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </div>
              </div>
            ))}
          </div>

          {/* Bill Summary */}
          <div className="bill-summary">
            <h3>Bill Summary</h3>
            
            <div className="bill-item">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(0)}</span>
            </div>
            
            <div className="bill-item">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            
            <div className="bill-item">
              <span>Taxes & Fees</span>
              <span>₹{taxes}</span>
            </div>
            
            <div className="bill-divider"></div>
            
            <div className="bill-total">
              <span>Total Amount</span>
              <span>₹{finalTotal.toFixed(0)}</span>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <div className="delivery-info">
              <p>🚚 Estimated delivery: 25-30 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage