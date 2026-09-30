import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products"
import { db } from "@/lib/db"
import { products as productTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getOccasion } from "@/lib/occasions"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { ProductGallery } from "@/components/kavya/product/product-gallery"
import { ProductInfo } from "@/components/kavya/product/product-info"
import { DesignDetails } from "@/components/kavya/product/design-details"
import { WhatYouGet } from "@/components/kavya/product/what-you-get"
import { SeeInMotion } from "@/components/kavya/product/see-in-motion"
import { ShowcaseSections } from "@/components/kavya/product/showcase-sections"
import { RelatedDesigns } from "@/components/kavya/product/related-designs"
import { SectionHeading } from "@/components/kavya/section-heading"
import { HowItWorks } from "@/components/kavya/sections/how-it-works"
import { FinalCta } from "@/components/kavya/sections/final-cta"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return []
}

async function getLiveProduct(slug: string) {
  const row = await db.select().from(productTable).where(eq(productTable.slug, slug)).limit(1)
  if (!row[0] || row[0].status !== "active") return undefined
  const fallback = getProductBySlug(slug) ?? getAllProducts()[0]
  return {
    ...fallback,
    ...row[0],
    status: "active" as const,
    occasion: row[0].occasion as typeof fallback.occasion,
    images: row[0].images.flatMap((src) => String(src).split(/\r?\n|\\n/).map((value) => value.trim()).filter(Boolean)),
    thumbnail: String(row[0].thumbnail || row[0].images[0] || "").split(/\r?\n|\\n/)[0].trim(),
    videos: (row[0].videos as Array<{ src?: string; poster?: string; label?: string }>).filter((video) => Boolean(video?.src)).map((video) => ({ src: String(video.src), poster: String(video.poster || ""), label: video.label })),
    features: row[0].features,
    designDetails: row[0].designDetails as typeof fallback.designDetails,
    showcase: row[0].showcase as typeof fallback.showcase,
    createdAt: row[0].createdAt.toISOString(),
    updatedAt: row[0].updatedAt.toISOString(),
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = (await getLiveProduct(slug)) ?? getProductBySlug(slug)
  if (!product) return { title: "Invitation Not Found" }
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.thumbnail }],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = (await getLiveProduct(slug)) ?? getProductBySlug(slug)
  if (!product) notFound()

  const occasion = getOccasion(product.occasion)
  const related = getRelatedProducts(product, 3)

  return (
    <div className="pb-8">
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Invitations", href: "/invitations" },
            ...(occasion ? [{ label: occasion.name, href: `/invitations/${occasion.slug}` }] : []),
            { label: product.title },
          ]}
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery product={product} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl px-5 sm:mt-28 sm:px-8">
        <SectionHeading eyebrow="The Story" title="About This Invitation" />
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-5 sm:mt-28 sm:px-8">
        <ShowcaseSections sections={product.showcase} />
      </div>

      <div className="mx-auto mt-20 max-w-5xl px-5 sm:mt-28 sm:px-8">
        <SeeInMotion product={product} />
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-16 px-5 sm:mt-28 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <DesignDetails product={product} />
        <WhatYouGet product={product} />
      </div>

      <div className="mt-8">
        <HowItWorks />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <RelatedDesigns products={related} />
      </div>

      <FinalCta />
    </div>
  )
}
