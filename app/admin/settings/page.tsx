import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function SettingsPage() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login"); return <AdminShell userName={session.user.name}><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Studio</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Settings</h1><div className="mt-8 max-w-2xl rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-6"><h2 className="font-serif text-2xl text-[#3b2a20]">KalaVerse Digital</h2><p className="mt-2 text-sm leading-relaxed text-[#806f5c]">Your studio settings are connected to the public site. WhatsApp and contact details can be updated in the site configuration while the CMS settings panel is expanded.</p></div></AdminShell> }
