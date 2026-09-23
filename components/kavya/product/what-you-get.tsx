import type { Product } from "@/lib/types"
import { Icon } from "@/components/kavya/icon"
import { SectionHeading } from "@/components/kavya/section-heading"

const iconFor: Record<string, string> = {
  "HD Digital Invitation": "Image",
  "Personalised Details": "UserRoundPen",
  "WhatsApp Ready Version": "MessageCircle",
  "PDF Version": "FileText",
  "Revision Support": "RefreshCw",
  "Final Delivery": "PackageCheck",
}

export function WhatYouGet({ product }: { product: Product }) {
  return (
    <section>
      <SectionHeading eyebrow="Everything Included" title="What You Get" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon name={iconFor[feature] ?? "Star"} className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
