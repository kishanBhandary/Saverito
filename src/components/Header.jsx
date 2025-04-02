"use client"

import { Menu, ShoppingCart } from "lucide-react"

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="header">
      <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
        <Menu size={27} />
      </button>

      <button className="cart-button" aria-label="Shopping Cart">
        <ShoppingCart size={27} />
      </button>
    </header>
  )
}

export default Header

