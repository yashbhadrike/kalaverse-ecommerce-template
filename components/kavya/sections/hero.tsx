import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-fade-in flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-label text-accent uppercase">
            Premium Digital Invitations
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl leading-[1.05] tracking-editorial text-foreground sm:text-6xl lg:text-7xl">
            Invitations Made to Feel Like You.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Beautiful digital invitations for weddings, celebrations, milestones and every moment worth remembering.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/invitations"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Invitations
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/#featured"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              View Featured Designs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-secondary kv-shadow-lg">
            <Image
              src="/images/hero-invitation.png"
              alt="Premium maroon and antique-gold Indian digital wedding invitation"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-2xl border border-accent/40 sm:-right-5 sm:-top-5"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
