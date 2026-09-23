import type { Occasion, OccasionSlug } from "./types"

export const occasions: Occasion[] = [
  {
    id: "occ-wedding",
    name: "Wedding",
    slug: "wedding",
    icon: "HeartHandshake",
    description: "Timeless invitations for the beginning of forever.",
    displayOrder: 1,
  },
  {
    id: "occ-engagement",
    name: "Engagement",
    slug: "engagement",
    icon: "Heart",
    description: "Announce the promise with grace and warmth.",
    displayOrder: 2,
  },
  {
    id: "occ-birthday",
    name: "Birthday",
    slug: "birthday",
    icon: "Cake",
    description: "Playful, joyful invitations for another year worth celebrating.",
    displayOrder: 3,
  },
  {
    id: "occ-baby-shower",
    name: "Baby Shower",
    slug: "baby-shower",
    icon: "Baby",
    description: "Soft, tender designs to welcome a little one.",
    displayOrder: 4,
  },
  {
    id: "occ-naming-ceremony",
    name: "Naming Ceremony",
    slug: "naming-ceremony",
    icon: "Sparkles",
    description: "Celebrate a name, a blessing, a new beginning.",
    displayOrder: 5,
  },
  {
    id: "occ-pooja",
    name: "Pooja",
    slug: "pooja",
    icon: "Flame",
    description: "Sacred invitations for auspicious gatherings.",
    displayOrder: 6,
  },
  {
    id: "occ-housewarming",
    name: "Housewarming",
    slug: "housewarming",
    icon: "House",
    description: "Warm welcomes for a new home and new memories.",
    displayOrder: 7,
  },
  {
    id: "occ-anniversary",
    name: "Anniversary",
    slug: "anniversary",
    icon: "Heart",
    description: "Honour the years and the love that made them.",
    displayOrder: 8,
  },
  {
    id: "occ-other",
    name: "Other",
    slug: "other",
    icon: "Star",
    description: "A design for every moment worth remembering.",
    displayOrder: 9,
  },
]

export function getOccasion(slug: string): Occasion | undefined {
  return occasions.find((o) => o.slug === slug)
}

export function isOccasionSlug(slug: string): slug is OccasionSlug {
  return occasions.some((o) => o.slug === slug)
}
