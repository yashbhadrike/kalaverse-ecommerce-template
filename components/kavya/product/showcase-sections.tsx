import Image from "next/image"
import type { ShowcaseSection } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/kavya/reveal"

export function ShowcaseSections({ sections }: { sections: ShowcaseSection[] }) {
  return (
    <div className="flex flex-col gap-16 sm:gap-24">
      {sections.map((section, i) => (
        <Reveal key={i} as="section">
          <ShowcaseBlock section={section} />
        </Reveal>
      ))}
    </div>
  )
}

function ShowcaseBlock({ section }: { section: ShowcaseSection }) {
  switch (section.type) {
    case "image-text":
      return (
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary kv-shadow", section.imageSide === "right" && "md:order-2")}>
            <Image src={section.image || "/placeholder.svg"} alt={section.heading} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className={cn(section.imageSide === "right" && "md:order-1")}>
            <h3 className="text-balance font-serif text-2xl leading-tight tracking-editorial text-foreground sm:text-3xl">
              {section.heading}
            </h3>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        </div>
      )

    case "video-text":
      return (
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-2xl bg-[var(--charcoal)] kv-shadow">
            <video className="aspect-video w-full" controls playsInline preload="metadata" poster={section.poster}>
              <source src={section.video} type="video/mp4" />
            </video>
          </div>
          <div>
            <h3 className="text-balance font-serif text-2xl leading-tight tracking-editorial text-foreground sm:text-3xl">
              {section.heading}
            </h3>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">{section.body}</p>
          </div>
        </div>
      )

    case "gallery":
      return (
        <div>
          {section.heading && (
            <h3 className="mb-8 font-serif text-2xl tracking-editorial text-foreground sm:text-3xl">{section.heading}</h3>
          )}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {section.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-xl bg-secondary kv-shadow">
                <Image src={img || "/placeholder.svg"} alt={`${section.heading ?? "Detail"} ${idx + 1}`} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )

    case "full-video":
      return (
        <div>
          {section.heading && (
            <h3 className="mb-8 text-center font-serif text-2xl tracking-editorial text-foreground sm:text-3xl">{section.heading}</h3>
          )}
          <div className="overflow-hidden rounded-2xl bg-[var(--charcoal)] kv-shadow">
            <video className="aspect-video w-full" controls playsInline preload="metadata" poster={section.poster}>
              <source src={section.video} type="video/mp4" />
            </video>
          </div>
        </div>
      )

    case "full-image":
      return (
        <div>
          {section.heading && (
            <h3 className="mb-8 text-center font-serif text-2xl tracking-editorial text-foreground sm:text-3xl">{section.heading}</h3>
          )}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-secondary kv-shadow">
            <Image src={section.image || "/placeholder.svg"} alt={section.heading ?? "Invitation detail"} fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      )

    case "text":
      return (
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-balance font-serif text-2xl leading-tight tracking-editorial text-foreground sm:text-3xl">
            {section.heading}
          </h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{section.body}</p>
        </div>
      )

    default:
      return null
  }
}
