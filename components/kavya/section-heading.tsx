import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold tracking-label text-accent uppercase">{eyebrow}</span>
      )}
      <h2 className="max-w-2xl text-balance font-serif text-3xl leading-tight tracking-editorial text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl text-pretty text-base text-muted-foreground", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  )
}
