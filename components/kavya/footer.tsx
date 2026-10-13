"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Mail, Instagram } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const nav = [
  { label: "Home", href: "/" },
  { label: "Invitations", href: "/invitations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
]

const legal = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund-cancellation" },
]

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="bg-[var(--brown)] text-[var(--ivory)]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="block w-44" aria-label="KalaVerse Digital home">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KalaVerse%20Digital%20Logo-ploK8vw1lMOVJ9uSKXUP1dTpamSAoh.png"
                alt="KalaVerse Digital"
                className="h-auto w-full object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs font-serif text-lg italic text-[var(--ivory)]/70">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold tracking-label text-accent uppercase">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--ivory)]/75 transition-colors hover:text-[var(--ivory)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-xs font-semibold tracking-label text-accent uppercase">Legal</h3>
            <ul className="mt-5 space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--ivory)]/75 transition-colors hover:text-[var(--ivory)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold tracking-label text-accent uppercase">Get in Touch</h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[var(--ivory)]/75 transition-colors hover:text-[var(--ivory)]"
                >
                  <MessageCircle className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 text-sm text-[var(--ivory)]/75 transition-colors hover:text-[var(--ivory)]"
                >
                  <Mail className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm text-[var(--ivory)]/75 transition-colors hover:text-[var(--ivory)]"
                >
                  <Instagram className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--ivory)]/15 pt-6">
          <p className="text-center text-xs text-[var(--ivory)]/50">
            © 2026 KalaVerse Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
