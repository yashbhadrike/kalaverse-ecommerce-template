import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllProducts } from "@/lib/products"
import { ProductGrid } from "@/components/kavya/product-grid"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

export function ChooseInvitation() {
  const products = getAllProducts().slice(0, 8)

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Ready to Make Yours"
            title="Choose Your Invitation"
            description="Designed for your occasion. Ready to make it yours."
          />
          <Link
            href="/invitations"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  )
}
