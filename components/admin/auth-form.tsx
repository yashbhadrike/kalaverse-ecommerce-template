"use client"

import { FormEvent, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { LockKeyhole, ArrowRight, Loader2 } from "lucide-react"

export function AdminAuthForm() {
  const [email, setEmail] = useState("admin@kavyaverse.digital")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setError(""); const result = await authClient.signIn.email({ email, password }); if (result.error) { setError("We could not sign you in. Check your email and password."); setLoading(false); return }; window.location.href = "/admin" }
  return <form onSubmit={submit} className="space-y-5"><div><label htmlFor="email" className="mb-2 block text-sm font-medium text-[#3b2a20]">Email address</label><input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 w-full rounded-xl border border-[#decfb9] bg-[#fffdf8] px-4 text-sm outline-none transition focus:border-[#b58a3a] focus:ring-2 focus:ring-[#b58a3a]/15" /></div><div><label htmlFor="password" className="mb-2 block text-sm font-medium text-[#3b2a20]">Password</label><input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 w-full rounded-xl border border-[#decfb9] bg-[#fffdf8] px-4 text-sm outline-none transition focus:border-[#b58a3a] focus:ring-2 focus:ring-[#b58a3a]/15" /></div>{error && <p role="alert" className="rounded-lg bg-[#f9e9e5] px-3 py-2 text-sm text-[#8a2a2a]">{error}</p>}<button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#641b2a] font-medium text-[#fffaf1] transition hover:bg-[#4f1420] disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enter studio <ArrowRight className="h-4 w-4" /></>}</button></form>
}
