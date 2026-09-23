import { Hero } from "@/components/kavya/sections/hero"
import { OccasionSelector } from "@/components/kavya/sections/occasion-selector"
import { ChooseInvitation } from "@/components/kavya/sections/choose-invitation"
import { FeaturedDesigns } from "@/components/kavya/sections/featured-designs"
import { WhyKavyaverse } from "@/components/kavya/sections/why-kavyaverse"
import { HowItWorks } from "@/components/kavya/sections/how-it-works"
import { InvitationShowcase } from "@/components/kavya/sections/invitation-showcase"
import { Testimonials } from "@/components/kavya/sections/testimonials"
import { FinalCta } from "@/components/kavya/sections/final-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <OccasionSelector />
      <ChooseInvitation />
      <FeaturedDesigns />
      <WhyKavyaverse />
      <HowItWorks />
      <InvitationShowcase />
      <Testimonials />
      <FinalCta />
    </>
  )
}
