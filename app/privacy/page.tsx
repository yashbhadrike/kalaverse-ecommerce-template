import type { Metadata } from "next"
import { LegalDoc } from "@/components/kavya/legal-doc"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How KalaVerse Digital collects, uses and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="January 2026"
      intro="Your privacy matters to us. This policy explains how we handle the information you share with us."
      sections={[
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "We collect the details you provide to personalise your invitation — such as names, dates, venue and event information — as well as your contact details when you reach out to us.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          paragraphs: [
            "Your information is used solely to design, personalise and deliver your invitation, and to communicate with you about your order.",
            "We do not sell or rent your personal information to third parties.",
          ],
        },
        {
          heading: "3. Communication",
          paragraphs: [
            "We primarily communicate via WhatsApp and email. By contacting us through these channels, you consent to us responding through them regarding your order.",
          ],
        },
        {
          heading: "4. Data Retention",
          paragraphs: [
            "We retain your event details only as long as necessary to complete your order and provide revision support. You may request deletion of your information at any time.",
          ],
        },
        {
          heading: "5. Security",
          paragraphs: [
            "We take reasonable measures to protect the information you share with us. However, no method of transmission over the internet is completely secure.",
          ],
        },
        {
          heading: "6. Contact",
          paragraphs: [
            "If you have questions about this privacy policy or wish to update or delete your information, please contact us on WhatsApp or by email.",
          ],
        },
      ]}
    />
  )
}
