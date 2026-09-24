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
  const row = { id, title, slug, price: Number(formData.get("price") || 0), shortDescription: String(formData.get("shortDescription") || ""), description: String(formData.get("description") || ""), occasion: String(formData.get("occasion") || "other"), thumbnail: String(formData.get("thumbnail") || ""), images: String(formData.get("images") || "").split("\n").map((s) => s.trim()).filter(Boolean), format: String(formData.get("format") || "Animated"), status: String(formData.get("status") || "draft"), featured: formData.get("featured") === "on", updatedAt: new Date() }
  const existing = await db.select({ id: products.id }).from(products).where(eq(products.id, id)).limit(1)
  if (existing.length) await db.update(products).set(row).where(eq(products.id, id)); else await db.insert(products).values({ ...row, createdAt: new Date(), features: [], videos: [], designDetails: [], showcase: [], displayOrder: 0, seoTitle: title, seoDescription: row.shortDescription })
  revalidatePath("/admin/products"); revalidatePath(`/product/${slug}`); revalidatePath("/invitations")
}

export async function deleteProduct(id: string) { await requireAdmin(); await db.delete(products).where(eq(products.id, id)); revalidatePath("/admin/products"); revalidatePath("/invitations") }
