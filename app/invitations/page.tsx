import type { Metadata } from "next"
import { getAllProducts } from "@/lib/products"
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

export default function InvitationsPage() {
  const products = getAllProducts()

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
