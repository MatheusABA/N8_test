import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    console.log("Adicionando ao carrinho:", product)
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        // Se já existe, aumenta a quantidade
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      // Se não existe, adiciona com quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}