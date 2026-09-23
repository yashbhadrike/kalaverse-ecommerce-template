import Image from "next/image"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

export function InvitationShowcase() {
  return (
    <section className="bg-[var(--brown)] text-[var(--ivory)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-label text-accent uppercase">The Experience</span>
            <h2 className="max-w-2xl text-balance font-serif text-3xl leading-tight tracking-editorial sm:text-4xl md:text-5xl">
              See the Details.
            </h2>
            <p className="max-w-xl text-pretty text-base text-[var(--ivory)]/70">
              Every element is designed to look beautiful on screen and feel personal when shared.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-6 sm:gap-6">
          <Reveal className="sm:col-span-4 aspect-[16/11] overflow-hidden rounded-2xl bg-[var(--charcoal)]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/showcase-detail.png"
            >
              <source src="/images/boty-hero.mp4" type="video/mp4" />
            </video>
          </Reveal>

          <Reveal delay={120} className="sm:col-span-2 aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--charcoal)]">
            <Image
              src="/images/showcase-mobile.png"
              alt="A digital invitation shown on a smartphone"
              width={600}
              height={800}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <Reveal delay={80} className="sm:col-span-2 aspect-square overflow-hidden rounded-2xl bg-[var(--charcoal)]">
            <Image
              src="/images/showcase-detail.png"
              alt="Antique-gold foil detail on a maroon invitation"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </Reveal>

          <Reveal delay={160} className="sm:col-span-4 aspect-[16/8] overflow-hidden rounded-2xl bg-[var(--charcoal)]">
            <Image
              src="/images/hero-invitation.png"
              alt="Full view of a premium Indian wedding invitation"
              width={1200}
              height={600}
              className="h-full w-full object-cover object-top"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
