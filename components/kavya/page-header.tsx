import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mx-auto max-w-7xl px-5 pb-4 pt-10 sm:px-8 sm:pt-14", className)}>
      {children}
      <div className="mt-6 flex flex-col gap-4">
        {eyebrow && <span className="text-xs font-semibold tracking-label text-accent uppercase">{eyebrow}</span>}
        <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] tracking-editorial text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && <p className="max-w-xl text-pretty text-lg text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
