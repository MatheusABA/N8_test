import Navbar from './Navbar'

export default function Layout({ children }) {
  // Navbar global
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  )
}