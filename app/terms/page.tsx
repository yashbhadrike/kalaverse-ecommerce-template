import type { Metadata } from "next"
import { LegalDoc } from "@/components/kavya/legal-doc"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions for using KavyaVerse Digital and ordering digital invitations.",
}

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      updated="January 2026"
      intro="Please read these terms carefully before using our website or ordering a digital invitation."
      sections={[
        {
          heading: "1. Overview",
          paragraphs: [
            "KavyaVerse Digital provides personalised digital invitation design services. By using our website or placing an order, you agree to these terms and conditions.",
          ],
        },
        {
          heading: "2. Orders & Personalisation",
          paragraphs: [
            "Orders are placed and confirmed via WhatsApp. You are responsible for providing accurate names, dates, venue and event details for personalisation.",
            "We will share a preview for your approval before final delivery. Please review all details carefully, as we design based on the information you provide.",
          ],
        },
        {
          heading: "3. Intellectual Property",
          paragraphs: [
            "All designs, artwork and templates remain the intellectual property of KavyaVerse Digital. Purchasing an invitation grants you the right to use it for your personal celebration only.",
            "Designs may not be resold, redistributed or used for commercial purposes without written permission.",
          ],
        },
        {
          heading: "4. Delivery",
          paragraphs: [
            "Invitations are delivered digitally within the timeframe communicated at the time of order. Delivery timelines may vary for complex or animated designs.",
          ],
        },
        {
          heading: "5. Revisions",
          paragraphs: [
            "Reasonable revision support is included to ensure your invitation is accurate and to your satisfaction. Extensive redesigns beyond the agreed scope may incur additional charges.",
          ],
        },
        {
          heading: "6. Limitation of Liability",
          paragraphs: [
            "KavyaVerse Digital is not liable for errors resulting from inaccurate information provided by the customer, or for issues arising from third-party platforms used to share invitations.",
          ],
        },
        {
          heading: "7. Contact",
          paragraphs: [
            "For any questions about these terms, please reach out to us on WhatsApp or by email.",
          ],
        },
      ]}
    />
  )
}
