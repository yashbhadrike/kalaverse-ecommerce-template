import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { buildWhatsAppUrl } from "@/lib/site-config"

export function WhatsAppButton({
  message,
  label = "Order on WhatsApp",
  variant = "primary",
  className,
}: {
  message: string
  label?: string
  variant?: "primary" | "outline"
  className?: string
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border bg-transparent text-foreground hover:bg-secondary",
        className,
      )}
    >
      <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
      {label}
    </a>
  )
}
