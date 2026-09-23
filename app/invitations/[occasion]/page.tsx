import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { occasions, getOccasion } from "@/lib/occasions"
import { getProductsByOccasion } from "@/lib/products"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"
import { ProductGrid } from "@/components/kavya/product-grid"
import { Icon } from "@/components/kavya/icon"

export function generateStaticParams() {
  return occasions.map((o) => ({ occasion: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ occasion: string }>
}): Promise<Metadata> {
  const { occasion: slug } = await params
  const occasion = getOccasion(slug)
  if (!occasion) return { title: "Invitations" }
  return {
    title: `${occasion.name} Invitations`,
    description: `${occasion.description} Browse digital ${occasion.name.toLowerCase()} invitations by KavyaVerse Digital.`,
    openGraph: {
      title: `${occasion.name} Invitations — KavyaVerse Digital`,
      description: occasion.description,
    },
  }
}

export default async function OccasionPage({
  params,
}: {
  params: Promise<{ occasion: string }>
}) {
  const { occasion: slug } = await params
  const occasion = getOccasion(slug)
  if (!occasion) notFound()

  const products = getProductsByOccasion(occasion.slug)
  const related = occasions.filter((o) => o.slug !== occasion.slug).slice(0, 5)

  return (
    <div className="pb-20">
      <PageHeader eyebrow={`${occasion.name} Collection`} title={`${occasion.name} Invitations`} description={occasion.description}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Invitations", href: "/invitations" },
            { label: occasion.name },
          ]}
        />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <ProductGrid products={products} />
      </div>

      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <h2 className="font-serif text-2xl text-foreground">Related Occasions</h2>
        <ul className="no-scrollbar mt-6 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
          {related.map((o) => (
            <li key={o.id} className="flex-shrink-0">
              <Link
                href={`/invitations/${o.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name={o.icon} className="h-4 w-4 text-accent transition-colors group-hover:text-primary-foreground" />
                {o.name}
                <ArrowRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
