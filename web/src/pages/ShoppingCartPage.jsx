import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function ShoppingCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const subtotal = cart.reduce((acc, item) => acc + item.quantity * Number(item.preco || item.price), 0)
  const navigate = useNavigate()
  
  
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={product.id} className="flex py-6">
              <img src={product.imagem || product.imageSrc} alt={product.nome || product.name} className="w-24 h-24 object-cover rounded" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{product.nome || product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <label htmlFor={`qtd-${product.id}`} className="text-gray-500">Qtd:</label>
                  <input
                    id={`qtd-${product.id}`}
                    type="number"
                    min={1}
                    value={product.quantity}
                    onChange={e => updateQuantity(product.id, Number(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
                <p className="text-gray-900 font-semibold">R$ {(Number(product.preco || product.price) * product.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 mt-2"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        <div className="mt-6 flex justify-between text-lg font-bold">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Ir para o pagamento
        </button>
        </ul>
      )}
    </div>
  )
}