import type { Product } from "@/lib/types"
import { SectionHeading } from "@/components/kavya/section-heading"

export function SeeInMotion({ product }: { product: Product }) {
  const video = product.videos[0]
  if (!video) return null

  return (
    <section id="see-in-motion" className="scroll-mt-24">
      <SectionHeading eyebrow="Watch" title="See It in Motion" />
      <div className="mt-8 overflow-hidden rounded-2xl bg-[var(--charcoal)] kv-shadow">
        <video
          className="aspect-video w-full"
          controls
          playsInline
          preload="metadata"
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
