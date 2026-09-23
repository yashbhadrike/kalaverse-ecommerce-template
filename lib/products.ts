import type { OccasionSlug, Product } from "./types"

const PREVIEW_VIDEO = "/images/boty-hero.mp4"
const PREVIEW_POSTER = "/images/showcase-detail.png"

const commonWhatIncluded = [
  "HD Digital Invitation",
  "Personalised Details",
  "WhatsApp Ready Version",
  "PDF Version",
  "Revision Support",
  "Final Delivery",
]

function makeShowcase(mainImage: string, detailImage: string): Product["showcase"] {
  return [
    {
      type: "image-text",
      image: mainImage,
      heading: "Designed Around Your Story",
      body: "Every element is arranged with intention — from the placement of your names to the flourish of each gold accent — so the invitation feels unmistakably yours.",
      imageSide: "right",
    },
    {
      type: "video-text",
      video: PREVIEW_VIDEO,
      poster: PREVIEW_POSTER,
      heading: "Watch the Invitation Come Alive",
      body: "A gentle animated version brings your invitation to life — perfect for sharing on WhatsApp and social media.",
    },
    {
      type: "gallery",
      heading: "In the Details",
      images: [detailImage, mainImage, "/images/showcase-mobile.png"],
    },
    {
      type: "full-image",
      image: detailImage,
      heading: "Crafted for Screens, Made to Be Shared",
    },
  ]
}

export const products: Product[] = [
  {
    id: "p-royal-maroon-wedding",
    title: "Royal Maroon Wedding",
    slug: "royal-maroon-wedding",
    price: 499,
    shortDescription:
      "An elegant maroon and antique-gold digital wedding invitation designed for a timeless celebration.",
    description:
      "Designed with deep maroon tones, warm ivory details and antique-gold accents, this invitation combines traditional Indian celebration with a modern digital aesthetic. Every ornament is drawn to feel refined on screen and personal when shared.",
    occasion: "wedding",
    thumbnail: "/images/invitations/royal-maroon-wedding.png",
    images: [
      "/images/invitations/royal-maroon-wedding.png",
      "/images/showcase-detail.png",
      "/images/showcase-mobile.png",
    ],
    videos: [{ src: PREVIEW_VIDEO, poster: PREVIEW_POSTER, label: "Invitation Preview" }],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Elegant Indian" },
      { label: "Palette", value: "Maroon / Ivory / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Names, dates, venue and event details" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/royal-maroon-wedding.png", "/images/showcase-detail.png"),
    format: "Image + Video + PDF",
    status: "active",
    featured: true,
    displayOrder: 1,
    seoTitle: "Royal Maroon Wedding Invitation — KavyaVerse Digital",
    seoDescription:
      "A timeless maroon and antique-gold digital wedding invitation, personalised with your names, dates and event details.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-golden-mandala-wedding",
    title: "Golden Mandala Wedding",
    slug: "golden-mandala-wedding",
    price: 599,
    shortDescription:
      "A luxurious ivory and antique-gold mandala wedding invitation for a grand celebration.",
    description:
      "Elaborate antique-gold mandala and lotus foil detailing sits on a warm ivory canvas, with delicate maroon accents. A grand yet graceful design for weddings that deserve a memorable first impression.",
    occasion: "wedding",
    thumbnail: "/images/invitations/golden-mandala-wedding.png",
    images: [
      "/images/invitations/golden-mandala-wedding.png",
      "/images/showcase-detail.png",
      "/images/showcase-mobile.png",
    ],
    videos: [{ src: PREVIEW_VIDEO, poster: PREVIEW_POSTER, label: "Invitation Preview" }],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Grand Traditional" },
      { label: "Palette", value: "Ivory / Gold / Maroon" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Names, dates, venue and event details" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/golden-mandala-wedding.png", "/images/showcase-detail.png"),
    format: "Image + Video + PDF",
    status: "active",
    featured: true,
    displayOrder: 2,
    seoTitle: "Golden Mandala Wedding Invitation — KavyaVerse Digital",
    seoDescription:
      "A luxurious ivory and antique-gold mandala digital wedding invitation, personalised for your grand celebration.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-blush-engagement",
    title: "Blush Engagement",
    slug: "blush-engagement",
    price: 399,
    shortDescription: "A romantic blush and gold engagement invitation with delicate floral filigree.",
    description:
      "Soft blush and warm ivory tones meet delicate antique-gold floral filigree in this romantic engagement invitation — refined, tender and made to announce the promise beautifully.",
    occasion: "engagement",
    thumbnail: "/images/invitations/blush-engagement.png",
    images: ["/images/invitations/blush-engagement.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [{ src: PREVIEW_VIDEO, poster: PREVIEW_POSTER, label: "Invitation Preview" }],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Romantic Modern" },
      { label: "Palette", value: "Blush / Ivory / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Names, date, venue and event details" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/blush-engagement.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: true,
    displayOrder: 3,
    seoTitle: "Blush Engagement Invitation — KavyaVerse Digital",
    seoDescription: "A romantic blush and gold digital engagement invitation with delicate floral detailing.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-joyful-birthday",
    title: "Joyful Birthday",
    slug: "joyful-birthday",
    price: 299,
    shortDescription: "A refined, celebratory birthday invitation with gold confetti accents.",
    description:
      "Warm ivory with maroon and antique-gold confetti and floral accents — playful yet elegant, this birthday invitation strikes the perfect balance between joyful and refined.",
    occasion: "birthday",
    thumbnail: "/images/invitations/joyful-birthday.png",
    images: ["/images/invitations/joyful-birthday.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Celebratory Elegant" },
      { label: "Palette", value: "Ivory / Maroon / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Name, age, date and venue" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/joyful-birthday.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 4,
    seoTitle: "Joyful Birthday Invitation — KavyaVerse Digital",
    seoDescription: "A refined, celebratory digital birthday invitation with elegant gold accents.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-tender-baby-shower",
    title: "Tender Baby Shower",
    slug: "tender-baby-shower",
    price: 349,
    shortDescription: "A soft, tender baby shower invitation in ivory and gentle gold.",
    description:
      "Soft ivory and warm beige with gentle antique-gold and pastel floral motifs create a tender, welcoming invitation for celebrating a little one on the way.",
    occasion: "baby-shower",
    thumbnail: "/images/invitations/tender-baby-shower.png",
    images: ["/images/invitations/tender-baby-shower.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Soft & Tender" },
      { label: "Palette", value: "Ivory / Beige / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Names, date and venue" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/tender-baby-shower.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 5,
    seoTitle: "Tender Baby Shower Invitation — KavyaVerse Digital",
    seoDescription: "A soft and tender digital baby shower invitation in ivory and gentle gold tones.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-blessed-naming",
    title: "Blessed Naming Ceremony",
    slug: "blessed-naming-ceremony",
    price: 349,
    shortDescription: "An elegant naming ceremony invitation with gold sparkle and lotus motifs.",
    description:
      "Warm ivory with antique-gold sparkle and delicate maroon lotus motifs, finished with a small ornate cradle detail — a graceful invitation to celebrate a name and a new blessing.",
    occasion: "naming-ceremony",
    thumbnail: "/images/invitations/blessed-naming.png",
    images: ["/images/invitations/blessed-naming.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Graceful Traditional" },
      { label: "Palette", value: "Ivory / Gold / Maroon" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Baby's name, date, venue and family names" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/blessed-naming.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 6,
    seoTitle: "Blessed Naming Ceremony Invitation — KavyaVerse Digital",
    seoDescription: "An elegant digital naming ceremony invitation with gold sparkle and lotus motifs.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-sacred-pooja",
    title: "Sacred Pooja",
    slug: "sacred-pooja",
    price: 299,
    shortDescription: "A reverent pooja invitation with diya and temple arch motifs.",
    description:
      "Deep maroon and ivory with antique-gold diya lamp and temple arch motifs create a sacred, auspicious invitation for your pooja and family gatherings.",
    occasion: "pooja",
    thumbnail: "/images/invitations/sacred-pooja.png",
    images: ["/images/invitations/sacred-pooja.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Sacred Traditional" },
      { label: "Palette", value: "Maroon / Ivory / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Occasion, date, time and venue" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/sacred-pooja.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 7,
    seoTitle: "Sacred Pooja Invitation — KavyaVerse Digital",
    seoDescription: "A reverent digital pooja invitation with diya and temple arch motifs.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-griha-pravesh",
    title: "Griha Pravesh Housewarming",
    slug: "griha-pravesh-housewarming",
    price: 349,
    shortDescription: "A warm housewarming invitation with kalash and toran motifs.",
    description:
      "Warm ivory and maroon with antique-gold kalash and doorway toran motifs — an auspicious, welcoming invitation for your griha pravesh and the memories to follow.",
    occasion: "housewarming",
    thumbnail: "/images/invitations/griha-pravesh.png",
    images: ["/images/invitations/griha-pravesh.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Auspicious Traditional" },
      { label: "Palette", value: "Ivory / Maroon / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Family name, date, time and address" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/griha-pravesh.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 8,
    seoTitle: "Griha Pravesh Housewarming Invitation — KavyaVerse Digital",
    seoDescription: "A warm digital housewarming invitation with kalash and toran motifs.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-golden-anniversary",
    title: "Golden Anniversary",
    slug: "golden-anniversary",
    price: 399,
    shortDescription: "A refined anniversary invitation with intertwined gold floral hearts.",
    description:
      "Deep maroon and ivory with intertwined antique-gold floral hearts and delicate filigree — a refined invitation to honour the years and the love that made them.",
    occasion: "anniversary",
    thumbnail: "/images/invitations/golden-anniversary.png",
    images: ["/images/invitations/golden-anniversary.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Romantic Classic" },
      { label: "Palette", value: "Maroon / Ivory / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Names, years, date and venue" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/golden-anniversary.png", "/images/showcase-detail.png"),
    format: "Image + PDF",
    status: "active",
    featured: false,
    displayOrder: 9,
    seoTitle: "Golden Anniversary Invitation — KavyaVerse Digital",
    seoDescription: "A refined digital anniversary invitation with intertwined gold floral hearts.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
  {
    id: "p-custom-celebration",
    title: "Custom Celebration",
    slug: "custom-celebration",
    price: 499,
    shortDescription: "A versatile, all-occasion invitation crafted to fit any moment.",
    description:
      "Warm ivory with balanced maroon and antique-gold floral and geometric motifs — a versatile invitation ready to be tailored to whatever you are celebrating.",
    occasion: "other",
    thumbnail: "/images/invitations/custom-celebration.png",
    images: ["/images/invitations/custom-celebration.png", "/images/showcase-detail.png", "/images/showcase-mobile.png"],
    videos: [{ src: PREVIEW_VIDEO, poster: PREVIEW_POSTER, label: "Invitation Preview" }],
    features: commonWhatIncluded,
    designDetails: [
      { label: "Style", value: "Versatile Elegant" },
      { label: "Palette", value: "Ivory / Maroon / Gold" },
      { label: "Format", value: "Digital Invitation" },
      { label: "Personalisation", value: "Fully tailored to your occasion" },
      { label: "Delivery", value: "Digital delivery" },
    ],
    showcase: makeShowcase("/images/invitations/custom-celebration.png", "/images/showcase-detail.png"),
    format: "Image + Video + PDF",
    status: "active",
    featured: true,
    displayOrder: 10,
    seoTitle: "Custom Celebration Invitation — KavyaVerse Digital",
    seoDescription: "A versatile, all-occasion digital invitation crafted and personalised to fit any moment.",
    createdAt: "2026-01-05",
    updatedAt: "2026-01-05",
  },
]

export function getAllProducts(): Product[] {
  return products.filter((p) => p.status === "active").sort((a, b) => a.displayOrder - b.displayOrder)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured)
}

export function getProductsByOccasion(occasion: OccasionSlug): Product[] {
  return getAllProducts().filter((p) => p.occasion === occasion)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const sameOccasion = getAllProducts().filter((p) => p.occasion === product.occasion && p.slug !== product.slug)
  const others = getAllProducts().filter((p) => p.occasion !== product.occasion && p.slug !== product.slug)
  return [...sameOccasion, ...others].slice(0, limit)
}
