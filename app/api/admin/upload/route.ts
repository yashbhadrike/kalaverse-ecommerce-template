import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export async function POST(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const form = await request.formData(); const file = form.get("file"); if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file first" }, { status: 400 }); const max = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 10 * 1024 * 1024; if (file.size > max) return NextResponse.json({ error: "That file is too large" }, { status: 400 }); const blob = await put(`kavyaverse/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`, file, { access: "public", addRandomSuffix: true }); return NextResponse.json({ url: blob.url }) }
