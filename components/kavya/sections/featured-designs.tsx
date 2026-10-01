import Link from "next/link"
import Image from "next/image"
import { getFeaturedProducts } from "@/lib/products"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

export function FeaturedDesigns() {
  const featured = getFeaturedProducts().slice(0, 4)

  return (
    <section id="featured" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <SectionHeading eyebrow="A considered collection" title="Featured Designs" description="A few invitations that bring together expressive typography, Indian detail, and an effortless digital experience." />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-6 sm:gap-6">
        {featured.map((product, i) => {
          // Asymmetric editorial layout
          const spans = [
            "sm:col-span-4 sm:row-span-2 aspect-[4/5] sm:aspect-[16/13]",
            "sm:col-span-2 aspect-[4/5]",
            "sm:col-span-2 aspect-[4/5]",
            "sm:col-span-6 aspect-[16/10] sm:aspect-[16/7]",
          ]
          return (
            <Reveal
              key={product.id}
              as="article"
              delay={(i % 4) * 90}
              className={spans[i % spans.length]}
            >
              <Link
                href={`/product/${product.slug}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-secondary kv-shadow"
              >
                <Image
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brown)]/70 via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <h3 className="font-serif text-xl text-[var(--ivory)]">{product.title}</h3>
                  <span className="rounded-full bg-[var(--ivory)]/95 px-3 py-1 text-sm font-medium text-primary">
                    ₹{product.price}
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
