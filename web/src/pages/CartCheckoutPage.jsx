import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import UserService from "../services/users.service"

export default function CartCheckoutPage() {
  const { cart, anonUserId, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const navigate = useNavigate()

  const items = cart.map(({ id, nome, name, preco, price, quantity }) => ({
    id,
    nome: nome || name,
    preco: preco || price,
    quantity,
  }))

  const isCardFilled =
    cardNumber.trim() &&
    cardName.trim() &&
    cardExpiry.trim() &&
    cardCvv.trim()

  const total = Math.round(
    items.reduce((sum, item) => sum + Number(item.preco) * item.quantity, 0) * 100) / 100
  
  const handleCheckout = async () => {
    setLoading(true)
    setError("")


    const payload = {
      anonUserId,
      items,
      total,
    }
    // Log do payload para análise de como está sendo enviado ao backend
    console.log("Payload enviado para o backend no checkout:", payload)
    setLoading(false)
    try {
      await UserService.payCheckout(payload)
      setSuccess(true)
      clearCart()
    } catch (err) {
      setError('Não foi possível processar a compra. Tente novamente mais tarde.')
      console.error("Erro ao processar compra:", err)
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
          <div className="flex justify-between font-bold text-lg mb-4 border-t pt-4">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <form
            className="space-y-3 mb-4"
            onSubmit={e => {
              e.preventDefault()
              if (isCardFilled && !loading) handleCheckout()
            }}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Número do cartão</label>
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nome no cartão</label>
              <input
                type="text"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                className="w-full border rounded px-2 py-1"
                placeholder="Nome impresso"
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Validade</label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={e => setCardExpiry(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  value={cardCvv}
                  onChange={e => setCardCvv(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!isCardFilled || loading}
              className={`w-full bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 ${(!isCardFilled || loading) ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processando..." : "Confirmar Compra"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}