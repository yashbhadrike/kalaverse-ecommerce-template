"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteProduct } from "@/app/admin/products/actions"

export function DeleteProductButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleDelete() {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return
    startTransition(async () => {
      await deleteProduct(id)
      router.refresh()
    })
  }

  return <button type="button" onClick={handleDelete} disabled={pending} aria-label={`Delete ${title}`} className="inline-flex items-center justify-center rounded-lg p-2 text-[#9b8975] hover:bg-red-50 hover:text-red-700 disabled:cursor-wait disabled:opacity-50"><Trash2 className="h-4 w-4" /></button>
}
