import {
  HeartHandshake,
  Heart,
  Cake,
  Baby,
  Sparkles,
  Flame,
  House,
  Star,
  PenTool,
  Image as ImageIcon,
  MessageCircle,
  FileText,
  UserRoundPen,
  RefreshCw,
  Zap,
  Video,
  MousePointerClick,
  Send,
  Palette,
  PackageCheck,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Heart,
  Cake,
  Baby,
  Sparkles,
  Flame,
  House,
  Star,
  PenTool,
  Image: ImageIcon,
  MessageCircle,
  FileText,
  UserRoundPen,
  RefreshCw,
  Zap,
  Video,
  MousePointerClick,
  Send,
  Palette,
  PackageCheck,
}

export function Icon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string
  className?: string
  strokeWidth?: number
}) {
  const Cmp = iconMap[name] ?? Star
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
