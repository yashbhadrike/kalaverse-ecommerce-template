import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { occasions } from "@/lib/occasions"
import { getAllProducts } from "@/lib/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes = [
    "",
    "/invitations",
    "/about",
    "/contact",
    "/faq",
    "/terms",
    "/privacy",
    "/refund-cancellation",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }))

  const occasionRoutes = occasions.map((o) => ({
    url: `${base}/invitations/${o.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const productRoutes = getAllProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...occasionRoutes, ...productRoutes]
}
