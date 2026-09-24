import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { AdminAuthForm } from "@/components/admin/auth-form"

export default async function AdminLogin() {
  const session = await auth.api.getSession({ headers: await headers() }); if (session?.user) redirect("/admin")
  return <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f3ea] px-5 py-16"><div className="w-full max-w-md rounded-3xl border border-[#e4d9c7] bg-[#fffdf8] p-8 shadow-xl sm:p-10"><div className="mb-8 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#641b2a] font-serif text-xl text-[#fffaf1]">K</div><p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#b58a3a]">Private studio</p><h1 className="mt-2 font-serif text-3xl text-[#3b2a20]">Welcome back</h1><p className="mt-2 text-sm text-[#806f5c]">Sign in to manage your KavyaVerse invitations.</p></div><AdminAuthForm /><p className="mt-6 text-center text-xs leading-relaxed text-[#9b8975]">This area is private. If you need access, contact the site owner.</p></div></main>
}
