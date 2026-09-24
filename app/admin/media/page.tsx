import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { AdminShell } from "@/components/admin/admin-shell"
import { UploadForm } from "@/components/admin/upload-form"

export default async function MediaPage() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) redirect("/admin/login"); return <AdminShell userName={session.user.name}><p className="text-xs uppercase tracking-[0.2em] text-[#b58a3a]">Assets</p><h1 className="mt-2 font-serif text-4xl text-[#3b2a20]">Media Library</h1><p className="mt-2 max-w-xl text-[#806f5c]">Upload invitation images and videos here. Copy the generated URL into a product editor.</p><div className="mt-8 max-w-2xl"><UploadForm /></div></AdminShell> }
