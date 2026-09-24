import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { AdminShell } from "@/components/admin/admin-shell"
import { ProductEditor } from "@/components/admin/product-editor"
import Link from "next/link"

export default async function NewProductPage() {
  const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login")
  const categoryRows = await db.select().from(categories).where(eq(categories.active, true)).orderBy(categories.displayOrder)
  return <AdminShell userName={session.user.name}><div className="mx-auto max-w-3xl"><Link href="/admin/products" className="text-sm text-[#641b2a]">← Back to products</Link><p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Catalog</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Add an invitation</h1><p className="mt-2 text-[#806f5c]">Fill in the simple details below. You can refine everything later.</p><div className="mt-8"><ProductEditor categories={categoryRows} /></div></div></AdminShell>
}
