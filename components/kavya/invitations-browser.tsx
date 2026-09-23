"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import type { Product } from "@/lib/types"
import { occasions } from "@/lib/occasions"
import { ProductCard } from "@/components/kavya/product-card"
import { cn } from "@/lib/utils"

type SortKey = "featured" | "price-asc" | "price-desc"

const filters = [{ name: "All", slug: "all" }, ...occasions.map((o) => ({ name: o.name, slug: o.slug }))]

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]

export function InvitationsBrowser({
  products,
  initialOccasion = "all",
}: {
  products: Product[]
  initialOccasion?: string
}) {
  const [occasion, setOccasion] = useState(initialOccasion)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("featured")

  const results = useMemo(() => {
    let list = products.slice()
    if (occasion !== "all") list = list.filter((p) => p.occasion === occasion)
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q),
      )
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder)
    return list
  }, [products, occasion, query, sort])

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invitations"
              aria-label="Search invitations"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => {
            const active = occasion === f.slug
            return (
              <button
                key={f.slug}
                type="button"
                onClick={() => setOccasion(f.slug)}
                aria-pressed={active}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50",
                )}
              >
                {f.name}
              </button>
            )
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "design" : "designs"}
      </p>

      <div className="mt-6">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
            <p className="font-serif text-2xl text-foreground">No results found</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Try a different occasion or clear your search to see all designs.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setOccasion("all")
              }}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
