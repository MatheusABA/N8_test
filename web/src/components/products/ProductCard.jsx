import { useCart } from "../../context/CartContext"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group relative bg-white rounded-lg shadow p-4 flex flex-col">
      <img
        alt={product.nome || product.name}
        src={product.imagem}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
      />
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-700 font-semibold">
            {product.nome || product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.categoria}</p>
          <p className="text-sm font-medium text-gray-900">
            R$ {Number(product.preco).toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="ml-2 p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
          title="Adicionar ao carrinho"
        >
          <ShoppingCartIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}