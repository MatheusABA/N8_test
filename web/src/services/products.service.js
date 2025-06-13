


class ProductsService {
  /**
   * Fetch de produtos do proveedor brasileiro.
   * @returns {Promise<Array>}
   */
  static async fetchProducts() {
    const res = await fetch("https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider")
    const data = await res.json()
    console.log(`Resposta: ${JSON.stringify(data, null, 2)}`)
    return data
  }


}


export default ProductsService;