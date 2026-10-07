"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Invitations", href: "/invitations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  if (pathname.startsWith("/admin")) return null
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-500",
        scrolled || open
          ? "border-border/70 bg-background/90 shadow-[0_8px_30px_rgba(46,28,22,0.06)] backdrop-blur-md"
          : "border-transparent bg-background/60",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <Link href="/" className="block w-36 sm:w-44" aria-label="Digital Nimantran Studio home">
          <img
            src="/images/digital-nimantran-studio-logo.png"
            alt="Digital Nimantran Studio"
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
                  active && "text-primary",
                )}
              >
                {link.label}
                {active && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-accent" />}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:block">
          <Link
            href="/invitations"
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Invitations
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 sm:px-8">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 font-serif text-2xl text-foreground/90 transition-colors hover:text-primary",
                    active && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/invitations"
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground"
            >
              Explore Invitations
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-5 py-3.5 text-sm font-medium text-foreground"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
