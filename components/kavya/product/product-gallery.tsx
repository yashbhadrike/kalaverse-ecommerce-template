"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play, Expand, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string }

export function ProductGallery({ product }: { product: Product }) {
  const media: MediaItem[] = [
    ...product.images.map((src) => ({ type: "image" as const, src })),
    ...product.videos.map((v) => ({ type: "video" as const, src: v.src, poster: v.poster })),
  ]

  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const current = media[active] ?? media[0]

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % media.length)
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + media.length) % media.length)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox, media.length])

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      {media.length > 1 && (
        <div className="no-scrollbar order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:w-20 lg:flex-col lg:overflow-visible">
          {media.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${item.type} ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-secondary transition-colors",
                i === active ? "border-primary" : "border-transparent hover:border-border",
              )}
            >
              <Image
                src={item.type === "image" ? item.src : item.poster}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-[var(--brown)]/30">
                  <Play className="h-5 w-5 fill-[var(--ivory)] text-[var(--ivory)]" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="order-1 relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary kv-shadow lg:order-2 lg:flex-1">
        {current.type === "image" ? (
          <>
            <Image
              src={current.src || "/placeholder.svg"}
              alt={`${product.title} — view ${active + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label="View fullscreen"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <Expand className="h-4 w-4" />
            </button>
          </>
        ) : (
          <video
            key={current.src}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={current.poster}
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>


      {lightbox && current.type === "image" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--charcoal)]/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.title} image viewer`}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ivory)]/10 text-[var(--ivory)] transition-colors hover:bg-[var(--ivory)]/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActive((a) => (a - 1 + media.length) % media.length)
            }}
            aria-label="Previous"
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ivory)]/10 text-[var(--ivory)] transition-colors hover:bg-[var(--ivory)]/20 sm:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setActive((a) => (a + 1) % media.length)
            }}
            aria-label="Next"
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ivory)]/10 text-[var(--ivory)] transition-colors hover:bg-[var(--ivory)]/20 sm:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  )
}
