import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { asc } from "drizzle-orm"
import { AdminShell } from "@/components/admin/admin-shell"

async function createCategory(formData: FormData) {
  "use server"
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/login")
  const name = String(formData.get("name") || "").trim()
  if (!name) return
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  await db.insert(categories).values({ id: crypto.randomUUID(), name, slug, description: String(formData.get("description") || "").trim(), displayOrder: Number(formData.get("displayOrder") || 0) }).onConflictDoNothing({ target: categories.slug })
  revalidatePath("/admin/catalog")
  revalidatePath("/admin/categories")
}

export default async function CategoriesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/login")
  const rows = await db.select().from(categories).orderBy(asc(categories.displayOrder), asc(categories.name))
  return <AdminShell userName={session.user.name}><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Catalog setup</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Categories</h1><p className="mt-2 max-w-xl text-[#806f5c]">Create the categories that appear on your public invitation catalog.</p></div><a href="/admin/catalog" className="text-sm text-[#641b2a] hover:underline">Back to catalog</a></div><form action={createCategory} className="mt-8 grid gap-4 rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-6 sm:grid-cols-[1fr_1fr_120px_auto] sm:items-end"><label className="text-sm text-[#6b5a4a]">Name<input name="name" required placeholder="Wedding invitations" className="mt-2 w-full rounded-xl border border-[#dfd2c0] bg-white px-3 py-2.5 outline-none focus:border-[#641b2a]" /></label><label className="text-sm text-[#6b5a4a]">Description<input name="description" placeholder="Elegant wedding designs" className="mt-2 w-full rounded-xl border border-[#dfd2c0] bg-white px-3 py-2.5 outline-none focus:border-[#641b2a]" /></label><label className="text-sm text-[#6b5a4a]">Order<input name="displayOrder" type="number" defaultValue="0" className="mt-2 w-full rounded-xl border border-[#dfd2c0] bg-white px-3 py-2.5 outline-none focus:border-[#641b2a]" /></label><button className="rounded-xl bg-[#641b2a] px-4 py-3 text-sm font-medium text-white hover:bg-[#4f1420]">Create category</button></form><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rows.map((row) => <div key={row.id} className="rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-5"><div className="flex items-center justify-between"><h2 className="font-serif text-xl text-[#3b2a20]">{row.name}</h2><span className="rounded-full bg-[#e7f2e6] px-2 py-1 text-xs text-[#35613a]">{row.active ? "Active" : "Hidden"}</span></div><p className="mt-2 text-sm text-[#806f5c]">{row.description || "No description"}</p><p className="mt-4 text-xs text-[#9b8975]">/{row.slug}</p></div>)}</div></AdminShell>
}

export const dynamic = "force-dynamic"
