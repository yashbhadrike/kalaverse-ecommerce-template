import type { Product } from "@/lib/types"
import { SectionHeading } from "@/components/kavya/section-heading"

export function DesignDetails({ product }: { product: Product }) {
  return (
    <section>
      <SectionHeading eyebrow="The Design" title="Design Details" />
      <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {product.designDetails.map((d) => (
          <div key={d.label} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-xs font-semibold tracking-label text-accent uppercase">{d.label}</dt>
            <dd className="text-base text-foreground sm:text-right">{d.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
