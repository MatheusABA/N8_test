import { useEffect, useState } from "react"
import UserService from "../services/users.service"

export default function UserSalesPage() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const anonUserId = localStorage.getItem("anonUserId")

  useEffect(() => {
    async function fetchSales() {
      setLoading(true)
      try {
        const data = await UserService.getUserSales(anonUserId);
        setSales(data)
      } catch (err) {
        setSales([])
        console.error("Erro ao buscar compras do usuário:", err)
      } finally {
        setLoading(false)
      }
    }
    if (anonUserId) fetchSales()
  }, [anonUserId])

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Minhas Compras</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : sales.length === 0 ? (
        <p>Você ainda não realizou nenhuma compra.</p>
      ) : (
        <ul className="space-y-4">
          {sales.map((sale) => (
            <li key={sale.id} className="border rounded p-4">
              <div className="text-gray-600 text-sm mb-2">
                Compra em: {new Date(sale.createdAt).toLocaleString()}
              </div>
              <ul>
                {sale.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>Produto: {item.nome}</span>
                    <span>Qtd: {item.quantity}</span>
                    <span>R$ {Number(item.preco).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end font-bold mt-2">
                Total: R$ {Number(sale.total).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}