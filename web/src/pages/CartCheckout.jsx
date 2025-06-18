import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import UserService from "../services/users.service"

export default function CartCheckout() {
  const { cart, anonUserId, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleCheckout = async () => {
    setLoading(true)
    setError("")
    const payload = {
      anonUserId,
      items: cart.map(({ id, nome, name, preco, price, quantity }) => ({
        id,
        nome: nome || name,
        preco: preco || price,
        quantity,
      })),
    }
    // Log do payload para análise do backend
    console.log("Payload enviado para o backend no checkout:", payload)
    setLoading(false)
    try {
      const response = await UserService.payCheckout(payload)
      if (!response.ok) throw new Error("Erro ao processar compra")
      setSuccess(true)
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Compra realizada com sucesso!</h2>
        <p>Obrigado por comprar conosco.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-4"> */}
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline text-sm mb-2"
        >
          ← Voltar
        </button>
      {/* </div> */}
      <h2 className="text-2xl font-bold mb-4">Finalizar Compra</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.nome || item.name} x {item.quantity}</span>
                <span>R$ {(Number(item.preco || item.price) * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Processando..." : "Confirmar Compra"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}