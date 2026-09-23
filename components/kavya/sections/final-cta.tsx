import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { Reveal } from "@/components/kavya/reveal"

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 45%), radial-gradient(circle at 80% 80%, var(--gold) 0, transparent 45%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center">
          <span className="text-xs font-semibold tracking-label text-accent uppercase">Begin Your Celebration</span>
          <h2 className="mt-4 text-balance font-serif text-3xl leading-tight tracking-editorial sm:text-5xl">
            Your Moment Deserves a Beautiful Beginning.
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-base text-primary-foreground/80">
            Choose a design, personalise your details, and share your celebration beautifully.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/invitations"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ivory)] px-7 py-4 text-sm font-medium text-primary transition-colors hover:bg-[var(--ivory)]/90"
            >
              Explore Invitations
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ivory)]/30 px-7 py-4 text-sm font-medium text-[var(--ivory)] transition-colors hover:bg-[var(--ivory)]/10"
            >
              Talk to Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
