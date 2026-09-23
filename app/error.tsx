"use client"

import { useEffect } from "react"
import { RefreshCw } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
      <span className="text-xs font-semibold tracking-label text-accent uppercase">Something went wrong</span>
      <h1 className="mt-4 font-serif text-4xl tracking-editorial text-foreground sm:text-5xl">
        A small hiccup on our end.
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        Please try again. If the issue continues, reach out to us and we&apos;ll help right away.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  )
}
