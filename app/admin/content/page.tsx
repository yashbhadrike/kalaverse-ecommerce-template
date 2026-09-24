import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function ContentPage() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login"); return <AdminShell userName={session.user.name}><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Content</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Homepage content</h1><p className="mt-2 max-w-xl text-[#806f5c]">Manage your featured invitations and occasion categories here. Product editing is ready now; homepage content controls are coming next.</p><div className="mt-8 rounded-2xl border border-dashed border-[#decfb9] bg-[#fffdf8] p-10 text-center text-sm text-[#806f5c]">Your homepage currently uses the curated studio content. Add products from the Products section to grow your catalog.</div></AdminShell> }
