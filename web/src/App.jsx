import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/ui/Layout"
import ProductsPage from "./pages/ProductsPage"
import { CartProvider } from "./context/CartContext"
import ShoppingCartPage from "./pages/ShoppingCartPage"


function App() {

  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>    {/* Layout com navbar acima das paginas */}
          <Routes>
            {/* Aqui vão as rotas do projeto */}
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>  
    </CartProvider>
  )
}

export default App
