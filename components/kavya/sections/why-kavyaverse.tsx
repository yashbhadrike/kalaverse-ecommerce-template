import { Icon } from "@/components/kavya/icon"
import { SectionHeading } from "@/components/kavya/section-heading"
import { Reveal } from "@/components/kavya/reveal"

const benefits = [
  { icon: "PenTool", title: "Custom Design", body: "Every invitation tailored to your names, colours and details." },
  { icon: "Image", title: "HD Quality", body: "Crisp, high-resolution artwork that looks beautiful on any screen." },
  { icon: "MessageCircle", title: "WhatsApp Ready", body: "Perfectly sized to share instantly with family and friends." },
  { icon: "FileText", title: "PDF Version", body: "A print-friendly PDF whenever your celebration needs one." },
  { icon: "UserRoundPen", title: "Personalised Details", body: "Names, dates, venue and event details, thoughtfully placed." },
  { icon: "RefreshCw", title: "Revision Support", body: "We refine the details until everything feels just right." },
  { icon: "Zap", title: "Fast Delivery", body: "Your finished invitation, delivered without the long wait." },
  { icon: "Video", title: "Video Option", body: "An animated version to make your invitation come alive." },
]

export function WhyKavyaverse() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Why KavyaVerse"
            title="More Than an Invitation."
            description="Thoughtfully designed details that make your invitation feel personal, polished and ready to share."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 80} className="flex flex-col gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent">
                <Icon name={b.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-xl text-foreground">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
