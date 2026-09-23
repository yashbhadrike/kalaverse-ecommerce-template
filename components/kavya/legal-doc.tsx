import { Breadcrumb } from "@/components/kavya/breadcrumb"
import { PageHeader } from "@/components/kavya/page-header"

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Legal" title={title} description={intro}>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
      </PageHeader>

      <div className="mx-auto mt-8 max-w-3xl px-5 sm:px-8">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-10 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl text-foreground">{section.heading}</h2>
              <div className="mt-4 flex flex-col gap-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
