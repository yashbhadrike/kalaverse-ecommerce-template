import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/kavya/product-card"

export function RelatedDesigns({ products }: { products: Product[] }) {
  if (products.length === 0) return null
  return (
    <section>
      <h2 className="font-serif text-2xl tracking-editorial text-foreground sm:text-3xl">
        More Invitations You May Like
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
