import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Link from "next/link"
import { and, asc, count, desc, eq } from "drizzle-orm"
import { ArrowRight, FolderOpen, ImageIcon, Package, Plus, Video } from "lucide-react"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { categories, products } from "@/lib/db/schema"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminCatalogPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/login")

  const [categoryRows, productRows, [{ value: productCount }], [{ value: liveCount }]] = await Promise.all([
    db.select().from(categories).where(eq(categories.active, true)).orderBy(asc(categories.displayOrder), asc(categories.name)),
    db.select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      thumbnail: products.thumbnail,
      occasion: products.occasion,
      status: products.status,
      price: products.price,
      images: products.images,
      videos: products.videos,
      categoryId: products.categoryId,
    }).from(products).orderBy(desc(products.updatedAt)),
    db.select({ value: count() }).from(products),
    db.select({ value: count() }).from(products).where(eq(products.status, "active")),
  ])

  const categoryCounts = new Map<string | null, number>()
  for (const product of productRows) categoryCounts.set(product.categoryId, (categoryCounts.get(product.categoryId) ?? 0) + 1)

  return (
    <AdminShell userName={session.user.name}>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Catalog manager</p>
          <h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Your invitation catalog</h1>
          <p className="mt-2 max-w-2xl text-[#806f5c]">Manage the categories and products that appear across your public website. Changes are saved directly to the live database.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#641b2a] px-4 py-3 text-sm font-medium text-white hover:bg-[#4f1420]"><Plus className="h-4 w-4" />Create product</Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Products", productCount, Package],
          ["Live products", liveCount, ImageIcon],
          ["Categories", categoryRows.length, FolderOpen],
        ].map(([label, value, Icon]) => {
          const StatIcon = Icon as typeof Package
          return <div key={String(label)} className="rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-5"><div className="flex items-center justify-between"><span className="text-sm text-[#806f5c]">{label}</span><StatIcon className="h-4 w-4 text-[#b58a3a]" /></div><p className="mt-3 text-3xl font-semibold text-[#3b2a20]">{value}</p></div>
        })}
      </div>

      <section className="mt-8">
        <div className="flex items-end justify-between"><div><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Browse by type</p><h2 className="mt-2 font-serif text-2xl text-[#3b2a20]">Categories</h2></div><Link href="/admin/content" className="text-sm text-[#641b2a] hover:underline">Manage categories ↗</Link></div>
        {categoryRows.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-[#d7c9b5] bg-[#fffdf8] p-8 text-center text-sm text-[#806f5c]">No categories have been added yet. Add your first category from Homepage Content.</div> : <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{categoryRows.map((category) => <Link key={category.id} href={`/admin/products?category=${category.id}`} className="group rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-5 transition hover:-translate-y-0.5 hover:border-[#b58a3a] hover:shadow-lg"><div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e9dc] text-[#641b2a]"><FolderOpen className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-[#b58a3a] transition group-hover:translate-x-1" /></div><h3 className="mt-5 font-serif text-xl text-[#3b2a20]">{category.name}</h3><p className="mt-1 text-sm text-[#806f5c]">{categoryCounts.get(category.id) ?? 0} products</p></Link>)}</div>}
      </section>

      <section className="mt-10 rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Everything in one place</p><h2 className="mt-2 font-serif text-2xl text-[#3b2a20]">Products</h2></div><Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-[#641b2a] hover:underline">Open full product manager <ArrowRight className="h-4 w-4" /></Link></div>
        {productRows.length === 0 ? <div className="mt-6 rounded-xl bg-[#f7f3ea] p-8 text-center text-sm text-[#806f5c]">Your catalog is empty. Create a product to make it available for the public site.</div> : <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className="border-b border-[#e4d9c7] text-xs uppercase tracking-[0.14em] text-[#9b8975]"><th className="pb-3 font-medium">Product</th><th className="pb-3 font-medium">Category</th><th className="pb-3 font-medium">Assets</th><th className="pb-3 font-medium">Status</th><th className="pb-3" /></tr></thead><tbody>{productRows.map((product) => <tr key={product.id} className="border-b border-[#f0e8dc] last:border-0"><td className="py-4"><div className="flex items-center gap-3">{product.thumbnail ? <img src={product.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f1e9dc] text-[#b58a3a]"><ImageIcon className="h-5 w-5" /></div>}<div><p className="font-medium text-[#3b2a20]">{product.title}</p><p className="text-xs text-[#9b8975]">₹{product.price}</p></div></div></td><td className="py-4 text-sm text-[#806f5c]">{categoryRows.find((category) => category.id === product.categoryId)?.name ?? product.occasion}</td><td className="py-4"><div className="flex items-center gap-3 text-xs text-[#806f5c]"><span>{product.images.length} images</span><span className="inline-flex items-center gap-1">{product.videos.length}<Video className="h-3.5 w-3.5" /></span></div></td><td className="py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.status === "active" ? "bg-[#e7f2e6] text-[#35613a]" : "bg-[#f1e9dc] text-[#806f5c]"}`}>{product.status === "active" ? "Live" : "Draft"}</span></td><td className="py-4 text-right"><Link href={`/admin/products/${product.id}`} className="text-sm text-[#641b2a] hover:underline">Edit</Link></td></tr>)}</tbody></table></div>}
      </section>
    </AdminShell>
  )
}

export const dynamic = "force-dynamic"
