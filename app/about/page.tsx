import type { Metadata } from "next"
import Image from "next/image"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"
import { Reveal } from "@/components/kavya/reveal"
import { FinalCta } from "@/components/kavya/sections/final-cta"

export const metadata: Metadata = {
  title: "About",
  description:
    "KalaVerse Digital is a premium Indian digital invitation studio, designing personal, polished invitations for moments that matter.",
}

const values = [
  {
    title: "Why Digital",
    body: "Digital invitations are effortless to share, kind to the planet, and can carry motion, music and personality that paper never could — without losing a sense of occasion.",
  },
  {
    title: "Our Design Philosophy",
    body: "We believe restraint is luxury. Every ornament, colour and line is placed with intention so your invitation feels refined, warm and unmistakably personal.",
  },
  {
    title: "Rooted in Indian Celebration",
    body: "From weddings to naming ceremonies, our designs honour the richness of Indian traditions while feeling modern and beautifully at home on screen.",
  },
  {
    title: "Attention to Detail",
    body: "Names, dates, venues and the little details that make your event yours — we get them right, and refine until everything feels just so.",
  },
]

export default function AboutPage() {
  return (
    <div className="pb-8">
      <PageHeader
        eyebrow="Our Story"
        title="Designed for Moments That Matter."
        description="KalaVerse Digital is a premium studio crafting digital invitations that feel as personal as the celebrations they announce."
      >
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </PageHeader>

      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <Reveal className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-secondary kv-shadow-lg sm:aspect-[16/8]">
          <Image
            src="/images/about-studio.png"
            alt="A premium Indian invitation design studio with maroon and gold cards"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-5 sm:mt-24 sm:px-8">
        <Reveal>
          <p className="text-pretty font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
            KalaVerse Digital began with a simple belief — that an invitation is the very first impression of a
            celebration, and it deserves to feel as beautiful and personal as the moment itself.
          </p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            We design digital invitations for weddings, engagements, birthdays, baby showers, naming ceremonies,
            poojas, housewarmings, anniversaries and every occasion in between. Each design blends traditional Indian
            warmth with a modern, editorial aesthetic — ready to share on WhatsApp in moments.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 px-5 sm:mt-24 sm:grid-cols-2 sm:px-8">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={(i % 2) * 100} className="flex flex-col gap-3">
            <h2 className="font-serif text-2xl text-foreground">{v.title}</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{v.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 sm:mt-28">
        <FinalCta />
      </div>
    </div>
  )
}
