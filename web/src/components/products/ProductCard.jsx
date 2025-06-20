import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function ProductCard({ product, provider }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const nome = product.nome || product.name || "Produto sem nome"
  const preco = product.preco || product.price || 0
  const imagem = product.imagem || (product.gallery && product.gallery[0])
  const categoria = product.categoria || (product.details && product.details.adjective)
  const id = product.id

  const handleAddToCart = (e) => {
    // Previne o comportamento padrão do link de redirecionamento
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, provider)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link to={`/products/${provider}/${id}`}>
      <div className="group relative bg-white rounded-lg shadow p-4 flex flex-col">
        <img
          alt={nome}
          src={imagem}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
        />
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h3 className="text-sm text-gray-700 font-semibold">{nome}</h3>
            <p className="mt-1 text-sm text-gray-500">{categoria}</p>
            <p className="text-sm font-medium text-gray-900">
              R$ {Number(preco).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`ml-2 p-2 rounded-full ${added ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"} text-white transition-colors`}
            title="Adicionar ao carrinho"
          >
            {added ? <CheckCircleIcon className="w-5 h-5" /> : <ShoppingCartIcon className="w-5 h-5" />}
          </button>
        </div>
        {added && (
          <span className="text-green-600 text-xs mt-2 flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1" /> Adicionado ao carrinho!
          </span>
        )}
      </div>
    </Link>
  )
}