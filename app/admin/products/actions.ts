"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

async function requireAdmin() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) throw new Error("Unauthorized"); return session.user }

export async function saveProduct(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") || crypto.randomUUID())
  const title = String(formData.get("title") || "Untitled invitation")
  const slug = String(formData.get("slug") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
  const imageList = String(formData.get("images") || "").split(/\r?\n|\\n/).map((s) => s.trim()).filter(Boolean)
  const video = String(formData.get("video") || "").trim()
  const categoryId = String(formData.get("categoryId") || "").trim() || null
  const row = { id, title, slug, categoryId, price: Number(formData.get("price") || 0), shortDescription: String(formData.get("shortDescription") || ""), description: String(formData.get("description") || ""), occasion: String(formData.get("occasion") || "other"), thumbnail: String(formData.get("thumbnail") || imageList[0] || ""), images: imageList.slice(0, 4), videos: video ? [{ src: video, poster: imageList[0] || "", label: "Product preview" }] : [], features: String(formData.get("features") || "").split("\n").map((s) => s.trim()).filter(Boolean), format: String(formData.get("format") || "Animated"), status: String(formData.get("status") || "draft"), featured: formData.get("featured") === "on", displayOrder: Number(formData.get("displayOrder") || 0), seoTitle: String(formData.get("seoTitle") || title), seoDescription: String(formData.get("seoDescription") || formData.get("shortDescription") || ""), updatedAt: new Date() }
  const existing = await db.select({ id: products.id }).from(products).where(eq(products.id, id)).limit(1)
  if (existing.length) await db.update(products).set(row).where(eq(products.id, id)); else await db.insert(products).values({ ...row, createdAt: new Date(), designDetails: [], showcase: [] })
  revalidatePath("/admin/products"); revalidatePath(`/product/${slug}`); revalidatePath("/invitations")
}

export async function deleteProduct(id: string) { await requireAdmin(); await db.delete(products).where(eq(products.id, id)); revalidatePath("/admin/products"); revalidatePath("/invitations") }
