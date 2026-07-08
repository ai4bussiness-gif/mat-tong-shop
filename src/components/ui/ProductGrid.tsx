export function ProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-[3/4] bg-gray-800" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-800 rounded w-1/2" />
            <div className="h-4 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Import at bottom to avoid circular
import { ProductCard } from "./ProductCard"
