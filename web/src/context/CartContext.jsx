/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children, anonUserId }) {
  // Armazenando carrinho no localStorage para persistência
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart")
    return stored ? JSON.parse(stored) : []
  })

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("cart", JSON.stringify(cart))
  //   } catch (e) {
  //     console.error("Erro ao salvar carrinho no localStorage:", e)
  //   }
  // }, [cart])

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

  function updateQuantity(productId, quantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, anonUserId }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}