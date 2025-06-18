import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/ui/Layout"
import ProductsPage from "./pages/ProductsPage"
import { CartProvider } from "./context/CartContext"
import ShoppingCartPage from "./pages/ShoppingCartPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartCheckoutPage from "./pages/CartCheckoutPage"
import UserSalesPage from "./pages/UserSalesPage"

function App() {

  if (!localStorage.getItem("anonUserId")) {
    localStorage.setItem("anonUserId", crypto.randomUUID());
  }

  /**
    Salva o ID do usuário anônimo no contexto do carrinho no localStorage
    Isso garante que o ID seja persistente entre as sessões do usuário
    e que o carrinho possa ser recuperado mesmo após o fechamento do navegador
    Assim como obter suas compras do servidor quando o usuário voltar
  */
  const anonUserId = localStorage.getItem("anonUserId");

  return (
    <CartProvider anonUserId={anonUserId}>
      <BrowserRouter>
        <Layout>    {/* Layout com navbar acima das paginas */}
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/orders" element={<UserSalesPage />} />
            <Route path="/products/:provider/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CartCheckoutPage />} />

            <Route path="*" element={<div className="text-center p-40 font-bold">404 - Página não encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>  
    </CartProvider>
  )
}

export default App
