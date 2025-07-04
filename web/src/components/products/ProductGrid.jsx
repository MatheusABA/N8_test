import ProductCard from "./ProductCard"

export default function ProductsGrid({ products, provider }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} provider={provider} />
      ))}
    </div>
  )
}