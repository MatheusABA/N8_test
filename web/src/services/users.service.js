// Obs: Trocar endpoint 
import { API_URL } from "../utils/api"

class UserService {

  static async payCheckout(payload) {
    const response = await fetch(`${API_URL}/sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error("Erro ao processar compra")
    }
    return await response.json()
  }

  static async getUserSales(anonUserId) {
    const response = await fetch(`${API_URL}/sales?anonUserId=${anonUserId}`)
    if (!response.ok) {
      throw new Error("Erro ao buscar compras do usuário")
    }
    return await response.json()
  }

}

export default UserService