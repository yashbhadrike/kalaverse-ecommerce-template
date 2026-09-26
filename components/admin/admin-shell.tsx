"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, FolderOpen, ImageIcon, Sparkles, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/catalog", label: "Catalog", icon: FolderOpen },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/content", label: "Homepage Content", icon: Sparkles },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  async function signOut() { await authClient.signOut(); window.location.href = "/admin/login" }
  return (
    <div className="min-h-dvh bg-[#f5f1e8] text-[#29221d]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#e4d9c7] bg-[#fffdf8] px-5 py-6 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between gap-3 px-2"><Link href="/admin" className="block max-w-[190px]" aria-label="KalaVerse Digital admin home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KalaVerse%20Digital%20Logo-rgpmr8Pl9MrD43aqSJOr97XeoqMnRh.png" alt="KalaVerse Digital" className="h-auto w-full object-contain" /></Link><button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button></div>
        <p className="mt-1 px-2 text-[10px] uppercase tracking-[0.22em] text-[#9b8975]">Studio CMS</p>
        <nav className="mt-10 space-y-1">{nav.map((item) => { const Icon = item.icon; const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)); return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${active ? "bg-[#641b2a] text-[#fffaf1]" : "text-[#6b5a4a] hover:bg-[#f1e9dc]"}`}><Icon className="h-4 w-4" />{item.label}</Link> })}</nav>
        <div className="absolute bottom-6 left-5 right-5 border-t border-[#e4d9c7] pt-5"><p className="px-3 text-xs text-[#9b8975]">Signed in as</p><p className="truncate px-3 pt-1 text-sm font-medium">{userName}</p><button onClick={signOut} className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#8a2a2a] hover:bg-[#f9e9e5]"><LogOut className="h-4 w-4" />Sign out</button></div>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-[#29221d]/20 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation" />}
      <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#e4d9c7] bg-[#fffdf8]/90 px-5 backdrop-blur sm:px-8"><button onClick={() => setOpen(true)} className="lg:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button><div className="hidden text-sm text-[#9b8975] lg:block">Good to see you, <span className="text-[#29221d]">{userName.split(" ")[0]}</span></div><Link href="/" target="_blank" className="text-sm text-[#641b2a] hover:underline">View public site ↗</Link></header><main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">{children}</main></div>
    </div>
  )
}
