import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary kv-shadow transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:kv-shadow-lg">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="object-cover leading-[2] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg leading-snug text-foreground">{product.title}</h3>
        <p className="whitespace-nowrap pt-0.5 text-base font-medium text-primary">₹{product.price}</p>
      </div>
    </Link>
  )
}
