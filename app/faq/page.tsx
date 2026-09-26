import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"
import { FaqAccordion, type FaqItem } from "@/components/kavya/faq-accordion"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering, customising and receiving your KalaVerse Digital invitation.",
}

const faqs: FaqItem[] = [
  {
    question: "How do I order?",
    answer:
      "Choose the invitation you love, tap “Order on WhatsApp”, and send us the pre-filled message. We'll confirm the details and guide you through the rest.",
  },
  {
    question: "Can I customise the invitation?",
    answer:
      "Yes. Every invitation is personalised with your names, dates, venue and event details. Many designs can also be adapted in colour and layout to suit your celebration.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most digital invitations are delivered within a few days of confirming your details. Timelines can vary for complex or animated designs — we'll always share a clear estimate up front.",
  },
  {
    question: "Can I request changes?",
    answer:
      "Absolutely. Revision support is included, and we refine the details until your invitation feels just right.",
  },
  {
    question: "Do you provide invitation videos?",
    answer:
      "Yes, selected designs offer an animated video version — perfect for sharing on WhatsApp and social media. Look for the video option on the product page.",
  },
  {
    question: "Can I get a PDF version?",
    answer: "A print-friendly PDF version is available where applicable, so you can print your invitation if you wish.",
  },
  {
    question: "How do I send my event details?",
    answer:
      "Once you order on WhatsApp, simply reply with your names, dates, venue and any event details. We'll confirm everything before finalising the design.",
  },
  {
    question: "How will I receive the final invitation?",
    answer:
      "Your finished invitation is delivered digitally — as an image, video and/or PDF — ready to download and share instantly.",
  },
]

export default function FaqPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Good to Know"
        title="Frequently Asked Questions"
        description="Everything you need to know about ordering, customising and receiving your invitation."
      >
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      </PageHeader>

      <div className="mx-auto mt-12 max-w-3xl px-5 sm:px-8">
        <FaqAccordion items={faqs} />

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-secondary/40 px-6 py-10 text-center">
          <p className="font-serif text-2xl text-foreground">Still have a question?</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            We&apos;re happy to help. Reach out and we&apos;ll get back to you soon.
          </p>
          <a
            href={siteConfig.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Chat on WhatsApp
          </a>
          <Link href="/contact" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Or view all contact options
          </Link>
        </div>
      </div>
    </div>
  )
}
