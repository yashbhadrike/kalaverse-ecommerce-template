export type OccasionSlug =
  | "wedding"
  | "engagement"
  | "birthday"
  | "baby-shower"
  | "naming-ceremony"
  | "pooja"
  | "housewarming"
  | "anniversary"
  | "other"

export interface Occasion {
  id: string
  name: string
  slug: OccasionSlug
  /** lucide-react icon name */
  icon: string
  description: string
  displayOrder: number
}

export interface ProductMediaVideo {
  src: string
  poster: string
  label?: string
}

export type ShowcaseSection =
  | { type: "image-text"; image: string; heading: string; body: string; imageSide?: "left" | "right" }
  | { type: "video-text"; video: string; poster: string; heading: string; body: string }
  | { type: "gallery"; heading?: string; images: string[] }
  | { type: "full-video"; video: string; poster: string; heading?: string }
  | { type: "full-image"; image: string; heading?: string }
  | { type: "text"; heading: string; body: string }

export interface DesignDetail {
  label: string
  value: string
}

export interface Product {
  id: string
  title: string
  slug: string
  price: number
  description: string
  shortDescription: string
  occasion: OccasionSlug
  thumbnail: string
  images: string[]
  videos: ProductMediaVideo[]
  features: string[]
  designDetails: DesignDetail[]
  showcase: ShowcaseSection[]
  format: string
  status: "active" | "draft"
  featured: boolean
  displayOrder: number
  seoTitle: string
  seoDescription: string
  createdAt: string
  updatedAt: string
}
