"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { occasions } from "@/lib/occasions"
import { Icon } from "@/components/kavya/icon"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

export function OccasionSelector() {
  const scrollerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const timer = window.setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const isScrollable = scroller.scrollWidth > scroller.clientWidth
      if (!isScrollable) return
      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 8
      scroller.scrollTo({ left: atEnd ? 0 : scroller.scrollLeft + 148, behavior: "smooth" })
    }, 3600)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="every-occasion" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Every Occasion"
          title="What Are You Celebrating?"
          description="Find an invitation designed for your moment."
        />
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <ul ref={scrollerRef} className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-5 lg:grid-cols-9">
          {occasions.map((occasion) => (
            <li key={occasion.id} className="min-w-[8rem] flex-shrink-0 snap-start sm:min-w-0">
              <Link
                href={`/invitations/${occasion.slug}`}
                className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-6 text-center transition-colors duration-300 hover:border-primary hover:bg-primary"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary-foreground/10 group-hover:text-accent">
                  <Icon name={occasion.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
                  {occasion.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
