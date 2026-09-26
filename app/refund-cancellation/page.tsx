import type { Metadata } from "next"
import { LegalDoc } from "@/components/kavya/legal-doc"

export const metadata: Metadata = {
  title: "Refund & Cancellation",
  description: "Our refund and cancellation policy for digital invitation orders at KalaVerse Digital.",
}

export default function RefundCancellationPage() {
  return (
    <LegalDoc
      title="Refund & Cancellation"
      updated="January 2026"
      intro="Because our invitations are personalised digital products, please review our refund and cancellation policy below."
      sections={[
        {
          heading: "1. Nature of Digital Products",
          paragraphs: [
            "Our invitations are custom, personalised digital products. Once design work has begun using your details, the order is considered in production.",
          ],
        },
        {
          heading: "2. Cancellations",
          paragraphs: [
            "You may cancel your order before design work begins for a full refund. Once we have started personalising your invitation, cancellation may be subject to a partial charge reflecting the work completed.",
          ],
        },
        {
          heading: "3. Refunds",
          paragraphs: [
            "As personalised digital products cannot be returned, refunds are not offered after final delivery. If there is an error on our part, we will correct it promptly at no additional cost.",
          ],
        },
        {
          heading: "4. Revisions Instead of Refunds",
          paragraphs: [
            "We include revision support so we can make your invitation right. We encourage you to request changes rather than cancel, and we'll work with you until you're happy.",
          ],
        },
        {
          heading: "5. How to Request",
          paragraphs: [
            "To request a cancellation or discuss any concern with your order, please contact us on WhatsApp or by email as early as possible.",
          ],
        },
      ]}
    />
  )
}
