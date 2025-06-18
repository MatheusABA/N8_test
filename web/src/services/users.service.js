

class UserService {

  static async payCheckout(payload) {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error("Erro ao processar compra")
    }
    return await response.json()
  }

  
}

export default UserService