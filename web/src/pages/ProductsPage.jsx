import { useEffect, useState } from "react"
import productsService from "../services/products.service"
import ProductsGrid from "../components/products/ProductGrid"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const PRODUCTS_PER_PAGE = 12 // Definindo constante para número de produtos por página
  const [currentPage, setCurrentPage] = useState(1) // Estado para controlar a página atual

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      try {
        const data = await productsService.fetchProducts();
        setProducts(data)
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
        setProducts([]) // Array vazio caso dê erro
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  if (loading) return <div>Carregando produtos...</div>

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
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
      </div>
    </div>
  )
}