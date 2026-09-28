import React, { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from "@/lib/site-config"
import { Navbar } from "@/components/kavya/navbar"
import { Footer } from "@/components/kavya/footer"
import InvitationLoader from "@/components/kavya/invitation-loader"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  generator: "v0.app",
  keywords: [
    "digital invitations",
    "wedding invitations",
    "Indian invitations",
    "e-invites",
    "WhatsApp invitations",
    "engagement invitation",
    "baby shower invitation",
    "pooja invitation",
  ],
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#F7F3EA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <InvitationLoader />
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={null}>{children}</Suspense>
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
