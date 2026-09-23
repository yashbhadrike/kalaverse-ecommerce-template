import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"
import { Reveal } from "./reveal"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
        <p className="font-serif text-2xl text-foreground">No invitations found</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          We couldn&apos;t find any designs matching your selection. Try a different occasion or clear your search.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.id} as="article" delay={(i % 4) * 80}>
          <ProductCard product={product} priority={i < 4} />
        </Reveal>
      ))}
    </div>
  )
}
