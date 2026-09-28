"use client"

import { useState } from "react"
import type { CategoryRow, ProductRow } from "@/lib/db/schema"
import { saveProduct } from "@/app/admin/products/actions"

export function ProductEditor({ product, categories = [] }: { product?: ProductRow; categories?: CategoryRow[] }) {
  const [images, setImages] = useState((product?.images ?? []).join("\n"))
  const [video, setVideo] = useState(Array.isArray(product?.videos) && product.videos[0] && typeof product.videos[0] === "object" ? String((product.videos[0] as { src?: string }).src ?? "") : "")
  const [uploading, setUploading] = useState<string | null>(null)
  async function upload(file: File, kind: "image" | "video") {
    setUploading(kind)
    try {
      const body = new FormData(); body.append("file", file); body.append("kind", kind)
      const response = await fetch("/api/admin/upload", { method: "POST", body })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Upload failed")
      if (kind === "image") setImages((current) => [...current.split("\\n").filter(Boolean), result.url].slice(0, 4).join("\\n"))
      else setVideo(result.url)
    } catch (error) { window.alert(error instanceof Error ? error.message : "Upload failed") }
    finally { setUploading(null) }
  }
  return <form action={saveProduct} className="space-y-7 rounded-2xl border border-[#e4d9c7] bg-[#fffdf8] p-6">
    <input type="hidden" name="id" value={product?.id || ""} />
    <div><h2 className="font-serif text-2xl text-[#3b2a20]">Product details</h2><p className="mt-1 text-sm text-[#806f5c]">Everything you enter here appears on the public website automatically when the product is Live.</p></div>
    <div className="grid gap-5 sm:grid-cols-2"><Field name="title" label="Product title" defaultValue={product?.title} placeholder="Royal Maroon Wedding" required /><Field name="slug" label="URL slug" defaultValue={product?.slug} placeholder="royal-maroon-wedding" /><Field name="categoryId" label="Homepage category" defaultValue={product?.categoryId ?? ""} options={[{ value: "", label: "Select a category" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]} /><Field name="occasion" label="Occasion filter" defaultValue={product?.occasion} placeholder="wedding" /><Field name="price" label="Price (₹)" type="number" defaultValue={product?.price ?? 0} /><Field name="format" label="Format" defaultValue={product?.format} placeholder="Image + Video + PDF" /></div>
    <Field name="shortDescription" label="Short description" defaultValue={product?.shortDescription} placeholder="A graceful celebration of two hearts." />
    <TextArea name="description" label="Full description" defaultValue={product?.description} rows={5} />
    <div className="rounded-xl border border-[#e4d9c7] bg-[#fffaf1] p-4"><p className="font-medium text-[#3b2a20]">Product media</p><p className="mt-1 text-xs text-[#806f5c]">Upload up to four images and one video. Uploaded files are saved to the shared media store and their URLs are added automatically.</p><div className="mt-4 space-y-4"><div><TextArea name="images" label="Images (up to 4)" value={images} onChange={(event) => setImages(event.target.value)} rows={4} placeholder="Upload files or paste URLs, one per line" /><label className="mt-2 inline-flex cursor-pointer items-center rounded-lg border border-[#decfb9] bg-white px-3 py-2 text-xs font-medium text-[#641b2a]">{uploading === "image" ? "Uploading…" : "Upload images"}<input type="file" accept="image/*" multiple className="sr-only" disabled={Boolean(uploading)} onChange={(event) => { Array.from(event.target.files ?? []).slice(0, 4 - images.split("\\n").filter(Boolean).length).forEach((file) => void upload(file, "image")); event.currentTarget.value = "" }} /></label></div><div><Field name="video" label="Video URL (one)" value={video} onChange={(event) => setVideo(event.target.value)} placeholder="Upload a video or paste its URL" /><label className="mt-2 inline-flex cursor-pointer items-center rounded-lg border border-[#decfb9] bg-white px-3 py-2 text-xs font-medium text-[#641b2a]">{uploading === "video" ? "Uploading…" : "Upload video"}<input type="file" accept="video/*" className="sr-only" disabled={Boolean(uploading)} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file, "video"); event.currentTarget.value = "" }} /></label></div></div></div>
    <TextArea name="features" label="What is included (one per line)" defaultValue={(product?.features ?? []).join("\n")} rows={4} placeholder="HD Digital Invitation\nPersonalised Details" />
    <div className="grid gap-5 sm:grid-cols-2"><Field name="seoTitle" label="SEO title" defaultValue={product?.seoTitle} /><Field name="seoDescription" label="SEO description" defaultValue={product?.seoDescription} /></div>
    <div className="flex flex-wrap items-center gap-5"><label className="text-sm text-[#6b5a4a]">Status <select name="status" defaultValue={product?.status || "active"} className="ml-2 rounded-lg border border-[#decfb9] bg-white px-3 py-2"><option value="draft">Draft</option><option value="active">Live on website</option></select></label><label className="text-sm text-[#6b5a4a]">Display order <input name="displayOrder" type="number" defaultValue={product?.displayOrder ?? 0} className="ml-2 w-20 rounded-lg border border-[#decfb9] bg-white px-3 py-2" /></label><label className="flex items-center gap-2 text-sm text-[#6b5a4a]"><input name="featured" type="checkbox" defaultChecked={product?.featured} /> Show in Featured Designs</label></div>
    <button type="submit" className="rounded-xl bg-[#641b2a] px-5 py-3 text-sm font-medium text-white">{product ? "Save product" : "Create product"}</button>
  </form>
}
function Field({ name, label, defaultValue, value, onChange, placeholder, type = "text", options, required }: { name: string; label: string; defaultValue?: string | number; value?: string; onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string; options?: { value: string; label: string }[]; required?: boolean }) { return <label className="block text-sm font-medium text-[#3b2a20]">{label}{options ? <select name={name} defaultValue={String(defaultValue ?? "")} className="mt-2 h-11 w-full rounded-xl border border-[#decfb9] bg-white px-3 text-sm outline-none focus:border-[#b58a3a]">{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select> : <input name={name} required={required} type={type} defaultValue={value === undefined ? defaultValue : undefined} value={value} onChange={onChange} placeholder={placeholder} className="mt-2 h-11 w-full rounded-xl border border-[#decfb9] bg-white px-3 text-sm outline-none focus:border-[#b58a3a]" />}</label> }
function TextArea({ name, label, defaultValue, value, onChange, rows, placeholder }: { name: string; label: string; defaultValue?: string; value?: string; onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; rows: number; placeholder?: string }) { return <label className="block text-sm font-medium text-[#3b2a20]">{label}<textarea name={name} defaultValue={value === undefined ? defaultValue : undefined} value={value} onChange={onChange} rows={rows} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-[#decfb9] bg-white px-4 py-3 text-sm outline-none focus:border-[#b58a3a]" /></label> }

const _ = ProductEditor
void _
