import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { products, occasions } from "@/lib/db/schema"
import { AdminShell } from "@/components/admin/admin-shell"
import { count, eq } from "drizzle-orm"
import Link from "next/link"
import { ArrowRight, Package, Sparkles, ImageIcon, Plus } from "lucide-react"

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login")
  const [{ value: productCount }] = await db.select({ value: count() }).from(products)
  const [{ value: occasionCount }] = await db.select({ value: count() }).from(occasions)
  const [{ value: liveCount }] = await db.select({ value: count() }).from(products).where(eq(products.status, "active"))
  const cards = [{ label: "Total products", value: productCount, icon: Package, href: "/admin/products" }, { label: "Live on website", value: liveCount, icon: Sparkles, href: "/admin/products?status=active" }, { label: "Occasions", value: occasionCount, icon: ImageIcon, href: "/admin/content" }]
  return <AdminShell userName={session.user.name}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Studio overview</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Good morning, {session.user.name.split(" ")[0]}</h1><p className="mt-2 text-[#806f5c]">Everything for your invitation studio, in one place.</p></div><Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#641b2a] px-4 py-3 text-sm font-medium text-white hover:bg-[#4f1420]"><Plus className="h-4 w-4" />Add product</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{cards.map(({ label, value, icon: Icon, href }) => <Link key={label} href={href} className="rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1e9dc] text-[#641b2a]"><Icon className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-[#b58a3a]" /></div><p className="mt-5 text-sm text-[#806f5c]">{label}</p><p className="mt-1 text-3xl font-semibold text-[#3b2a20]">{value}</p></Link>)}</div><section className="mt-8 rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-6"><h2 className="font-serif text-2xl text-[#3b2a20]">Your simple workflow</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{[["1", "Add a product", "Upload the invitation images, add a title and price."], ["2", "Make it beautiful", "Add descriptions, features, and occasion details."], ["3", "Publish it", "Change the status to Live and it appears on your website."]].map(([n, title, body]) => <div key={n} className="rounded-xl bg-[#f7f3ea] p-4"><span className="font-serif text-2xl text-[#b58a3a]">{n}</span><h3 className="mt-3 font-medium text-[#3b2a20]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#806f5c]">{body}</p></div>)}</div></section></AdminShell>
}
