import type { Metadata } from "next"
import { getAllProducts } from "@/lib/products"
import { db } from "@/lib/db"
import { products as productTable } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"
import { InvitationsBrowser } from "@/components/kavya/invitations-browser"

export const metadata: Metadata = {
  title: "Digital Invitations",
  description:
    "Beautiful digital invitations for weddings, celebrations and every special occasion. Browse, personalise and order on WhatsApp.",
  openGraph: {
    title: "Digital Invitations — KalaVerse Digital",
    description: "Beautiful digital invitations for weddings, celebrations and every special occasion.",
  },
}

export default async function InvitationsPage() {
  const fallbackProducts = getAllProducts()
  const liveRows = await db.select().from(productTable).where(eq(productTable.status, "active")).orderBy(asc(productTable.displayOrder))
  const products = liveRows.length ? liveRows.map((row) => ({ ...fallbackProducts[0], ...row, status: row.status as "active" | "draft", occasion: row.occasion as typeof fallbackProducts[number]["occasion"], images: row.images, videos: row.videos as typeof fallbackProducts[number]["videos"], features: row.features, designDetails: row.designDetails as typeof fallbackProducts[number]["designDetails"], showcase: row.showcase as typeof fallbackProducts[number]["showcase"], createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() })) : fallbackProducts

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="The Collection"
        title="Digital Invitations"
        description="Beautiful designs for weddings, celebrations and every special occasion."
      >
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Invitations" }]} />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <InvitationsBrowser products={products} />
      </div>
    </div>
  )
}
