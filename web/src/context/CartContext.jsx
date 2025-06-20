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

function addToCart(product, provider) {
  const produtoComProvider = { ...product, provider }
  setCart((prevCart) => {
    const index = prevCart.findIndex(
      (item) => item.id === produtoComProvider.id && item.provider === produtoComProvider.provider
    )
    if (index !== -1) {
      // Produto já está no carrinho, atualize a quantidade
      const updatedCart = [...prevCart]
      updatedCart[index].quantity += 1
      return updatedCart
    }
    // Produto novo, adicione ao carrinho
    return [...prevCart, { ...produtoComProvider, quantity: 1 }]
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