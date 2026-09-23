import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

const testimonials = [
  {
    quote: "Everything felt so personal and beautifully designed. Our family loved the invitation.",
    name: "Ananya & Rohan",
    occasion: "Wedding",
  },
  {
    quote: "The gold detailing was stunning on WhatsApp. Guests kept asking where we got it made.",
    name: "Priya Nair",
    occasion: "Engagement",
  },
  {
    quote: "They captured exactly the warmth we wanted for our little one's naming ceremony.",
    name: "Karthik & Meera",
    occasion: "Naming Ceremony",
  },
  {
    quote: "Elegant, quick and completely stress-free. The video invitation was the highlight.",
    name: "Sanjana Reddy",
    occasion: "Birthday",
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading eyebrow="Kind Words" title="Loved by People Celebrating Something Special" />
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.name}
            as="article"
            delay={(i % 2) * 100}
            className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-7 kv-shadow sm:p-9"
          >
            <p className="font-serif text-xl leading-relaxed text-foreground text-pretty">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs font-medium tracking-label text-accent uppercase">{t.occasion}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
