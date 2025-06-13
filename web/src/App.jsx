import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/ui/Layout"
import ProductsPage from "./pages/ProductsPage"


function App() {

  return (
    <BrowserRouter>
      <Layout>    {/* Layout com navbar acima das paginas */}
        <Routes>
          {/* Aqui vão as rotas do projeto */}
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
