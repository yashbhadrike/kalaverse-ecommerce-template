export const siteConfig = {
  name: "KalaVerse Digital",
  tagline: "Every Design, Every Occasion.",
  description:
    "Beautiful digital invitations for weddings, celebrations, milestones and every moment worth remembering. A premium Indian digital invitation studio.",
  url: "https://kavyaverse.digital",
  // Single source of truth for the WhatsApp business number (E.164 without +).
  whatsappNumber: "919876543210",
  email: "hello@kavyaverse.digital",
  social: {
    instagram: "https://instagram.com/kavyaverse.digital",
    whatsapp: "https://wa.me/919876543210",
  },
}

/**
 * Build a WhatsApp order URL from product details.
 */
export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildProductOrderMessage(title: string, price: number) {
  return [
    `Hi ${siteConfig.name},`,
    `I'm interested in the ${title}.`,
    "",
    `Price: ₹${price}`,
    "",
    "I would like to know more about ordering it.",
  ].join("\n")
}
