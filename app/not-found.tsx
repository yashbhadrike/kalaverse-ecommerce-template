import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
      <span className="text-xs font-semibold tracking-label text-accent uppercase">Error 404</span>
      <h1 className="mt-4 font-serif text-4xl tracking-editorial text-foreground sm:text-5xl">
        This page couldn&apos;t be found.
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        The page you&apos;re looking for may have moved. Let&apos;s get you back to something beautiful.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
        <Link
          href="/invitations"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Explore Invitations
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
