


export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-xl">N8 E-commerce</span>
      <div className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-600">Produtos</a>
        <a href="/cart" className="text-gray-700 hover:text-blue-600">Carrinho</a>
        <a href="/orders" className="text-gray-700 hover:text-blue-600">Compras</a>
      </div>
    </nav>
  )
}