import { Play } from "lucide-react"
import type { Product } from "@/lib/types"
import { buildProductOrderMessage } from "@/lib/site-config"
import { WhatsAppButton } from "@/components/kavya/whatsapp-button"

export function ProductInfo({ product }: { product: Product }) {
  const hasVideo = product.videos.length > 0
  const message = buildProductOrderMessage(product.title, product.price)

  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold tracking-label text-accent uppercase">
        {product.designDetails.find((d) => d.label === "Style")?.value ?? "Digital Invitation"}
      </span>
      <h1 className="mt-3 text-balance font-serif text-3xl leading-tight tracking-editorial text-foreground sm:text-4xl">
        {product.title}
      </h1>
      <p className="mt-4 text-3xl font-medium text-primary">₹{product.price}</p>
      <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">{product.shortDescription}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <WhatsAppButton message={message} label="Order on WhatsApp" className="w-full sm:w-auto" />
        {hasVideo && (
          <a
            href="#see-in-motion"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
          >
            <Play className="h-4 w-4" strokeWidth={1.75} />
            Watch Invitation
          </a>
        )}
      </div>

      <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-8">
        {product.designDetails.slice(0, 4).map((d) => (
          <div key={d.label}>
            <dt className="text-xs font-medium tracking-label text-muted-foreground uppercase">{d.label}</dt>
            <dd className="mt-1 text-sm text-foreground">{d.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
