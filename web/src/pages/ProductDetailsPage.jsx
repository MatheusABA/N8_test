import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import productsService from "../services/products.service"
import { StarIcon } from "@heroicons/react/20/solid"
import { useCart } from "../context/CartContext"
import ProductCard from "../components/products/ProductCard"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function ProductDetailsPage() {
  const { provider, id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [productProvider, setProvider] = useState("")
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      let data
      try {
        if (provider === "brazilian") {
          data = await productsService.fetchBrazilianProductById(id)
          setProduct(data)
          setProvider("Nacionais")
        } else {
          data = await productsService.fetchEuropeanProductById(id)
          setProduct(data)
          setProvider("Internacionais")
        }
        setProduct(data)
      } catch (e) {
        setProduct(null)
        setProvider("")
        console.error("Erro ao carregar produto:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [provider, id])

  if (loading) return <div className="p-8">Carregando...</div>
  if (!product) return <div className="p-8">Produto não encontrado.</div>

  // Normalização dos campos
  const nome = product.nome || product.name || "Produto sem nome"
  const preco = product.preco || product.price || 0
  const imagens = product.imagem
    ? [{ src: product.imagem, alt: nome }]
    : (product.gallery || []).map((src, i) => ({ src, alt: `${nome} imagem ${i + 1}` }))
  const categoria = product.categoria || (product.details && product.details.adjective)
  const descricao = product.descricao || product.description || ""
  const detalhes = product.detalhes || (product.details && product.details.material) || ""
  const highlights = product.highlights || [
    categoria && `Categoria: ${categoria}`,
    detalhes && `Material: ${detalhes}`,
  ].filter(Boolean)
  const reviews = { average: 4, totalCount: 12 }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Botão Voltar */}
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:underline text-sm mb-2"
          >
            ← Voltar
          </button>
        </div>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium text-gray-900">
                  {productProvider}
                </span>
                <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <span className="font-medium text-gray-500">{nome}</span>
            </li>
          </ol>
        </nav>

        {/* Galeria de imagens */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
          {imagens.length > 0 ? (
            imagens.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                alt={img.alt}
                src={img.src}
                className={classNames(
                  "rounded-lg object-cover",
                  idx === 0
                    ? "row-span-2 aspect-3/4 size-full max-lg:hidden"
                    : idx === 3
                    ? "row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4"
                    : "col-start-2 aspect-3/2 size-full max-lg:hidden"
                )}
              />
            ))
          ) : (
            <div className="col-span-3 flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Informações do produto */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{nome}</h1>
            <p className="mt-2 text-sm text-gray-500">{categoria}</p>
          </div>

          {/* Opções e preço */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Informações do produto</h2>
            <p className="text-3xl tracking-tight text-gray-900">R$ {Number(preco).toFixed(2)}</p>

            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? "text-gray-900" : "text-gray-200",
                        "w-5 h-5"
                      )}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm font-medium text-indigo-600">{reviews.totalCount} avaliações</span>
              </div>
            </div>

            <form className="mt-10" onSubmit={handleAddToCart}>
              <button
                type="submit"
                className={classNames(
                  "flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                  added && "bg-green-600"
                )}
                disabled={added}
              >
                {added ? "Adicionado ao carrinho!" : "Adicionar ao carrinho"}
              </button>
            </form>
          </div>

          {/* Descrição e destaques */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="font-bold">Descrição</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{descricao}</p>
              </div>
            </div>

            {highlights && highlights.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Destaques</h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}