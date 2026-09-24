import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories, products } from "@/lib/db/schema"
import { AdminShell } from "@/components/admin/admin-shell"
import { ProductEditor } from "@/components/admin/product-editor"
import Link from "next/link"
import { Plus, Pencil, ExternalLink } from "lucide-react"
import { eq } from "drizzle-orm"

export default async function ProductsAdmin({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login")
  const { edit } = await searchParams
  const [rows, categoryRows] = await Promise.all([db.select().from(products).orderBy(products.updatedAt), db.select().from(categories).where(eq(categories.active, true)).orderBy(categories.displayOrder)])
  const editing = edit ? rows.find((p) => p.id === edit) : undefined
  return <AdminShell userName={session.user.name}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Catalog</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Products</h1><p className="mt-2 text-[#806f5c]">Add and update the invitations shown on your website.</p></div><Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#641b2a] px-4 py-3 text-sm font-medium text-white"><Plus className="h-4 w-4" />Add product</Link></div><div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">{editing && <div className="lg:order-2"><div className="mb-3 flex items-center justify-between"><h2 className="font-serif text-2xl text-[#3b2a20]">Edit invitation</h2><Link href="/admin/products" className="text-sm text-[#641b2a]">Close</Link></div><ProductEditor product={editing} categories={categoryRows} /></div>}<div className={editing ? "lg:order-1" : "lg:col-span-2"}><div className="overflow-hidden rounded-2xl border border-[#e4d9c7] bg-[#fffdf8]"><div className="grid grid-cols-[1fr_100px_90px_80px] border-b border-[#e4d9c7] px-5 py-3 text-xs uppercase tracking-wider text-[#9b8975]"><span>Invitation</span><span>Occasion</span><span>Status</span><span /></div>{rows.length === 0 ? <div className="p-10 text-center text-sm text-[#806f5c]">No products yet. Add your first invitation to get started.</div> : rows.map((p) => <div key={p.id} className="grid grid-cols-[1fr_100px_90px_80px] items-center border-b border-[#eee5d8] px-5 py-4 last:border-0"><div className="min-w-0"><p className="truncate font-medium text-[#3b2a20]">{p.title}</p><p className="mt-1 text-xs text-[#9b8975]">₹{p.price.toLocaleString("en-IN")}</p></div><span className="text-xs text-[#806f5c]">{p.occasion}</span><span className={`text-xs font-medium ${p.status === "active" ? "text-emerald-700" : "text-[#9b8975]"}`}>{p.status === "active" ? "Live" : "Draft"}</span><div className="flex items-center gap-2"><Link href={`/admin/products?edit=${p.id}`} aria-label={`Edit ${p.title}`} className="text-[#641b2a] hover:text-[#b58a3a]"><Pencil className="h-4 w-4" /></Link>{p.status === "active" && <Link href={`/product/${p.slug}`} target="_blank" aria-label={`View ${p.title}`} className="text-[#806f5c] hover:text-[#641b2a]"><ExternalLink className="h-4 w-4" /></Link>}</div></div>)}</div></div></div></AdminShell>
}
