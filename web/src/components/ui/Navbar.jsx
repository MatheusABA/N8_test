import { Link } from "react-router-dom";



export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-xl">N8 E-commerce</span>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Produtos</Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">Carrinho</Link>
        <Link to="/orders" className="text-gray-700 hover:text-blue-600">Compras</Link>
      </div>
    </nav>
  )
}