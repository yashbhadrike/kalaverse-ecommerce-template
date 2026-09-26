import type { Metadata } from "next"
import { MessageCircle, Mail, Instagram, ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KalaVerse Digital. Chat with us on WhatsApp, send an email, or follow along on Instagram.",
}

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us directly",
    href: siteConfig.social.whatsapp,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@kavyaverse.digital",
    href: siteConfig.social.instagram,
    external: true,
  },
]

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Say Hello"
        title="Let's Create Something Beautiful."
        description="Tell us about your celebration and we'll help you find or design the perfect invitation."
      >
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      </PageHeader>

      <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50 kv-shadow"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                <c.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="flex items-center gap-1 font-serif text-xl text-foreground">
                  {c.label}
                  <ArrowUpRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="text-balance font-serif text-3xl tracking-editorial sm:text-4xl">
            The fastest way to reach us
          </h2>
          <p className="max-w-md text-primary-foreground/80">
            Message us on WhatsApp with your occasion and details, and we&apos;ll take it from there.
          </p>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ivory)] px-7 py-4 text-sm font-medium text-primary transition-colors hover:bg-[var(--ivory)]/90"
          >
            <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
