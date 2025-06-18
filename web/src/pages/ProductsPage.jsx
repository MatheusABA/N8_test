import { useEffect, useState } from "react"
import productsService from "../services/products.service"
import ProductsGrid from "../components/products/ProductGrid"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState("brazilian")

  const PRODUCTS_PER_PAGE = 12 // Definindo constante para número de produtos por página
  const [currentPage, setCurrentPage] = useState(1) // Estado para controlar a página atual

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      let data = [];
      try {
        if (provider === "brazilian") {
        data = await productsService.fetchBrazilianProducts();
        } else {
          data = await productsService.fetchEuropeanProducts();
        }
        setProducts(data)
        setCurrentPage(1) // Reseta para a primeira página ao carregar novos produtos
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
        setProducts([]) // Array vazio caso dê erro
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [provider])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setProvider("brazilian")}
            className={`px-4 py-2 rounded border transition-colors ${
              provider === "brazilian"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Produtos Nacionais
          </button>
          <button
            onClick={() => setProvider("european")}
            className={`px-4 py-2 rounded border transition-colors ${
              provider === "european"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            Produtos Internacionais
          </button>
        </div>
        {/* Mostra o carregando produtos aqui, abaixo dos filtros */}
        {loading ? (
          <div className="text-gray-500 mb-4">Carregando produtos...</div>
        ) : (
          <>
            <ProductsGrid products={paginatedProducts} />
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="px-3 py-1">{currentPage} / {totalPages}</span>
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}