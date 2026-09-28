import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const MAX_VIDEO_SIZE = 100 * 1024 * 1024

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get("file")
  const kind = formData.get("kind") === "video" ? "video" : "image"
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file" }, { status: 400 })
  if (kind === "image" && (!file.type.startsWith("image/") || file.size > MAX_IMAGE_SIZE)) return NextResponse.json({ error: "Images must be under 10 MB" }, { status: 400 })
  if (kind === "video" && (!file.type.startsWith("video/") || file.size > MAX_VIDEO_SIZE)) return NextResponse.json({ error: "Videos must be under 100 MB" }, { status: 400 })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
  const blob = await put(`products/${crypto.randomUUID()}-${safeName}`, file, { access: "public", addRandomSuffix: false })
  return NextResponse.json({ url: blob.url })
}
