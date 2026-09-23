import { Icon } from "@/components/kavya/icon"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

const steps = [
  { number: "01", title: "Choose", body: "Find the invitation that fits your occasion.", icon: "MousePointerClick" },
  { number: "02", title: "Personalise", body: "Share your details and make it yours.", icon: "Palette" },
  { number: "03", title: "Deliver", body: "Receive your finished invitation, ready to share.", icon: "PackageCheck" },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <SectionHeading eyebrow="Simple Process" title="How It Works" align="center" className="mx-auto" />
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 120} className="relative flex flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between">
              <span className="font-serif text-5xl text-accent/50">{step.number}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
            </div>
            <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
