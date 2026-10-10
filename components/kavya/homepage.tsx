"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, ChevronDown, Minus, Plus } from "lucide-react"
import { products } from "@/lib/products"
import InvitationLoader from "@/components/kavya/invitation-loader"

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  ["01", "Made for mobile", "Beautiful on every screen your guests use."],
  ["02", "Easy to share", "One link, ready for every WhatsApp group."],
  ["03", "Beautifully interactive", "A living invitation with room to breathe."],
  ["04", "Easy to update", "Keep details current whenever plans change."],
  ["05", "Made for every celebration", "From roka to reception and every moment between."],
]
const faqs = [
  "How does a wedding invitation website work?",
  "Can I customize the invitation?",
  "Can I add my own photos and music?",
  "Can I add multiple wedding events?",
  "Can I share the invitation on WhatsApp?",
  "Can I update the invitation later?",
  "Does it work on mobile?",
]
const testimonials = [
  ["/images/invitations/royal-maroon-wedding.png", "Everything felt so much more personal than sending a normal invitation.", "Riya & Aarav", "Wedding"],
  ["/images/invitations/golden-mandala-wedding.png", "The details made our guests feel like they were already part of the celebration.", "Mitali & Dev", "Engagement"],
  ["/images/invitations/blush-engagement.png", "Simple to share, beautiful to open, and completely ours.", "Ananya & Kabir", "Wedding"],
  ["/images/invitations/royal-maroon-wedding.png", "A little piece of our wedding day in every phone.", "Nisha & Rohan", "Reception"],
]

function Label({ index, children }: { index: string; children: string }) {
  return <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.26em] text-muted-foreground"><span>{index} — {children}</span><span className="h-px w-14 bg-border" /></div>
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const ctx = gsap.context(() => gsap.fromTo(ref.current, { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }), ref)
    return () => ctx.revert()
  }, [])
  return <div ref={ref} className={className}>{children}</div>
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const cards = products.slice(0, 7)
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2))

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [cards.length])

  useEffect(() => {
    if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-copy", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" })
      gsap.fromTo(".hero-card", { opacity: 0, y: 70, rotateX: 12 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.08, delay: 0.25, ease: "power3.out" })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return <section ref={heroRef} className="overflow-hidden bg-white px-0 pb-10 pt-8 text-center sm:pb-14 sm:pt-12 md:pb-16 md:pt-10">
    <div className="hero-copy mx-auto max-w-2xl px-5 sm:px-8">
      <p className="text-[15px] font-medium text-[#77808b] sm:text-lg">Premium</p>
      <h1 className="mx-auto mt-5 max-w-3xl font-sans text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.065em] text-[#101114] sm:text-6xl md:text-[4.4rem]">Wedding Invitation<br />Website Templates</h1>
      <p className="mx-auto mt-6 max-w-lg text-[15px] leading-6 text-[#77808b] sm:text-lg sm:leading-7">Choose a template, customise in 10 minutes<br />and share it with your guests.</p>
      <Link href="#templates" className="mt-7 inline-flex min-h-14 w-[284px] items-center justify-center gap-4 rounded-full bg-[#101114] px-7 text-lg font-semibold text-white shadow-[0_8px_20px_rgba(16,17,20,0.14)] transition hover:scale-[1.03] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">Choose a template <ArrowUpRight size={21} strokeWidth={1.8} /></Link>
    </div>
    <div className="relative mx-auto mt-10 h-[255px] max-w-[1540px] overflow-hidden [perspective:1400px] sm:mt-12 sm:h-[360px] md:mt-14 md:h-[475px]">
      <div className="absolute left-1/2 top-[42%] flex w-max -translate-x-1/2 -translate-y-1/2 items-end gap-1.5 transition-transform duration-1000 ease-in-out sm:gap-3 md:gap-5 [transform-style:preserve-3d]">
        {cards.map((product, index) => {
          let offset = index - activeIndex
          if (offset > cards.length / 2) offset -= cards.length
          if (offset < -cards.length / 2) offset += cards.length
          const distance = Math.abs(offset)
          const isCenter = offset === 0
          const width = isCenter ? "w-[156px] sm:w-[230px] md:w-[330px]" : distance === 1 ? "w-[124px] sm:w-[180px] md:w-[255px]" : "w-[96px] sm:w-[140px] md:w-[195px]"
          const vertical = distance === 0 ? 0 : distance === 1 ? 42 : 82
          const rotation = offset * -12
          return <Link key={product.id} href={`/product/${product.slug}`} aria-label={`View ${product.title}`} className={`hero-card group relative shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_18px_35px_rgba(0,0,0,0.14)] transition-all duration-1000 ease-in-out ${width}`} style={{ transform: `rotateY(${rotation}deg) translateZ(${isCenter ? 100 : distance === 1 ? 44 : 0}px) translateY(${vertical}px)`, zIndex: 20 - distance, opacity: distance > 3 ? 0 : 1 }}>
            <Image src={product.thumbnail} alt={product.title} width={800} height={1000} className="block h-auto w-full" sizes="(max-width: 640px) 156px, (max-width: 1024px) 230px, 330px" priority={index < 3} />
          </Link>
        })}
      </div>
    </div>
  </section>
}

function InvitationShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce || window.innerWidth < 768) return
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, trackRef.current!.scrollWidth - window.innerWidth + 80)
      gsap.to(trackRef.current, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.8}`, scrub: 1, pin: true, invalidateOnRefresh: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])
  const cards = products.slice(0, 7)
  return <section ref={sectionRef} className="hidden overflow-hidden border-y border-border bg-white py-20 md:h-screen md:py-0"><div className="mx-auto max-w-7xl px-5 pt-2 sm:px-8 md:pt-20"><Label index="01" children="Invitations" /><div className="mt-6 flex items-end justify-between gap-8"><div><h2 className="max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">A collection for<br /><em>your kind of day.</em></h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Scroll through a considered edit of invitations made to be opened, remembered, and shared.</p></div><span className="hidden text-xs uppercase tracking-[0.22em] text-muted-foreground md:block">Scroll to explore ↗</span></div></div><div ref={trackRef} className="mx-auto mt-14 flex w-max gap-5 px-5 sm:px-8 md:mt-20 md:gap-8">{cards.map((product, index) => <Link key={product.id} href={`/product/${product.slug}`} className={`w-[210px] shrink-0 md:w-[270px] ${index % 2 ? "md:translate-y-12" : "md:-translate-y-2"}`}><div className="overflow-hidden rounded-[1.1rem] border border-border bg-background"><Image src={product.thumbnail} alt={product.title} width={800} height={1000} className="h-auto w-full" sizes="270px" priority={index < 2} /></div><div className="mt-4 flex items-start justify-between gap-3"><div><p className="font-serif text-xl">{product.title}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{product.occasion.replace("-", " ")}</p></div><span className="text-sm text-primary">₹{product.price}</span></div></Link>)}</div></section>
}

function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = gsap.context(() => gsap.fromTo(".feature-line", { x: -25, opacity: 0.3 }, { x: 0, opacity: 1, stagger: 0.14, scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 40%", scrub: 1 } }), ref)
    return () => ctx.revert()
  }, [])
  return <section ref={ref} className="mx-auto max-w-7xl border-b border-border px-5 py-24 sm:px-8 md:py-36"><div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><div><Label index="02" children="Why Kavyamoment" /><h2 className="mt-7 max-w-lg font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">The wedding invite,<br /><em>reimagined.</em></h2><p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">A beautiful website that feels more personal than a card and more memorable than a video.</p><Link href="#how-it-works" className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-2 text-xs font-medium uppercase tracking-[0.16em] text-primary">See how it works <ArrowUpRight size={14} /></Link></div><div>{benefits.map(([number, title, body]) => <div key={number} className="feature-line flex gap-5 border-t border-border py-6"><span className="font-mono text-xs text-accent">{number}</span><div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{body}</p></div></div>)}</div></div></section>
}

function Gallery() {
  const [filter, setFilter] = useState("All")
  const filters = ["All", "Wedding", "Engagement", "Birthday", "Baby Shower"]
  const visible = filter === "All" ? products : products.filter((p) => p.occasion.toLowerCase().includes(filter.toLowerCase().replace(" ", "-")))
  return <section id="templates" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 sm:px-8 md:py-36"><Reveal><Label index="03" children="The collection" /><div className="mt-7 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><h2 className="max-w-xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">Designed for your<br /><em>big day.</em></h2><p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Pick an invitation, make it yours, and share it with everyone you love.</p></div><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`border px-3 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${filter === item ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{item}</button>)}</div></div></Reveal><div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product, index) => <Reveal key={product.id} className={index % 3 === 1 ? "lg:mt-14" : ""}><Link href={`/product/${product.slug}`} className="group block"><div className="overflow-hidden border border-border bg-secondary"><Image src={product.thumbnail} alt={product.title} width={800} height={1000} className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div><div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="font-serif text-2xl">{product.title}</h3><p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{product.occasion.replace("-", " ")} · Digital invitation</p></div><span className="text-sm text-primary">₹{product.price}</span></div></Link></Reveal>)}</div></section>
}

function HowItWorks() {
  const steps = [["01", "Choose your design", "Find the invitation that feels like your celebration."], ["02", "Make it yours", "Share your details and we personalise every moment."], ["03", "Share with everyone", "One beautiful link, ready for every guest." ]]
  return <section id="how-it-works" className="border-y border-border bg-white px-5 py-24 sm:px-8 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><Label index="04" children="How it works" /><h2 className="mt-7 max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">Create your invitation<br /><em>in three simple steps.</em></h2></Reveal><div className="mt-16 grid gap-10 md:grid-cols-3">{steps.map(([num, title, body], index) => <Reveal key={num} className="border-t border-border pt-5"><div className="flex items-start justify-between"><span className="font-mono text-xs text-accent">{num}</span><span className="text-xs text-muted-foreground">0{index + 1} / 03</span></div><h3 className="mt-14 font-serif text-3xl">{title}</h3><p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground">{body}</p></Reveal>)}</div></div></section>
}

function Comparison() {
  const rows = [["Cost", "High", "One-time", "Accessible"], ["Customization", "Limited", "Fixed", "Personalised"], ["Updates", "Not possible", "Not possible", "Anytime"], ["Sharing", "Hand delivered", "Forwarded file", "One beautiful link"], ["Experience", "Tactile", "Passive", "Interactive"]]
  return <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36"><Reveal><Label index="05" children="The difference" /><h2 className="mt-7 max-w-2xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">More than a card.<br /><em>More than a video.</em></h2></Reveal><div className="mt-14 overflow-x-auto"><div className="min-w-[650px] border-t border-border text-sm"><div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] border-b border-border py-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"><span>What matters</span><span>Printed card</span><span>Video invite</span><span>Kavyamoment</span></div>{rows.map((row) => <div key={row[0]} className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] border-b border-border py-5"><span className="font-serif text-lg">{row[0]}</span><span className="text-muted-foreground">{row[1]}</span><span className="text-muted-foreground">{row[2]}</span><span className="text-primary">{row[3]}</span></div>)}</div></div></section>
}

function Stories() { return <section className="overflow-hidden border-y border-border bg-white px-5 py-24 sm:px-8 md:py-36"><div className="mx-auto max-w-7xl"><Reveal><Label index="06" children="Real celebrations" /><h2 className="mt-7 max-w-xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">Made for real<br /><em>celebrations.</em></h2></Reveal><div className="no-scrollbar mt-14 flex gap-5 overflow-x-auto pb-3">{testimonials.map(([image, quote, name, event]) => <article key={name} className="w-[235px] shrink-0 sm:w-[280px]"><div className="overflow-hidden border border-border bg-background"><Image src={image} alt={`${name} ${event} invitation`} width={700} height={900} className="h-auto w-full" sizes="280px" /></div><p className="mt-5 font-serif text-xl leading-snug">“{quote}”</p><p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">{name} · {event}</p></article>)}</div></div></section> }

function FAQ() { const [open, setOpen] = useState<number | null>(null); return <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-24 sm:px-8 md:py-36"><Reveal><Label index="07" children="Questions" /><h2 className="mt-7 font-serif text-4xl leading-[1.03] tracking-[-0.04em] sm:text-6xl">Questions?<br /><em>Answers.</em></h2></Reveal><div className="mt-14">{faqs.map((question, index) => <div key={question} className="border-t border-border"><button type="button" onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl"><span>{question}</span>{open === index ? <Minus size={18} /> : <Plus size={18} />}</button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><p className="overflow-hidden pb-6 text-sm leading-7 text-muted-foreground">Yes. Every invitation is designed to be personalised with your names, events, photos, venue details, music, and sharing preferences.</p></div></div>)}</div></section> }

export function Homepage() { return <><InvitationLoader /><div className="bg-background"><HeroSection /><InvitationShowcase /><Gallery /><FeatureSection /><HowItWorks /><Comparison /><Stories /><FAQ /><section className="border-t border-border px-5 py-28 text-center sm:px-8 md:py-44"><Reveal><p className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground">The beginning of something beautiful</p><h2 className="mx-auto mt-7 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.05em] sm:text-7xl">Your wedding deserves<br /><em>more than a message.</em></h2><p className="mx-auto mt-7 max-w-md text-sm leading-7 text-muted-foreground">Create an invitation your guests will actually want to open.</p><Link href="#templates" className="mt-9 inline-flex items-center gap-3 border border-primary px-5 py-3 text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground">Explore invitations <ArrowUpRight size={15} /></Link></Reveal></section></div></> }
