"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/products"

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const cards = products.slice(0, 9)
  const [activeIndex, setActiveIndex] = useState(Math.floor(cards.length / 2))

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length)
    }, 3600)
    return () => window.clearInterval(timer)
  }, [cards.length])

  useEffect(() => {
    const root = heroRef.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const copyAnimations = Array.from(root.querySelectorAll<HTMLElement>(".hero-copy > *")).map((element, index) => element.animate(
      [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 800, delay: index * 100, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    ))
    const cardAnimations = Array.from(root.querySelectorAll<HTMLElement>(".hero-card")).map((element, index) => element.animate(
      [{ opacity: 0, transform: `${element.style.transform} translateY(50px) rotateX(12deg)` }, { opacity: 1, transform: element.style.transform }],
      { duration: 900, delay: 250 + index * 80, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    ))

    return () => [...copyAnimations, ...cardAnimations].forEach((animation) => animation.cancel())
  }, [])

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white text-center">
      <div className="hero-copy mx-auto flex max-w-3xl flex-col items-center px-5 pb-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
        <p className="text-lg font-medium text-[#77808b]">Premium</p>
        <h1 className="mt-5 text-balance font-sans text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.065em] text-[#101114] sm:text-6xl md:text-[4.4rem]">
          Wedding Invitation
          <br />
          Website Templates
        </h1>
        <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-[#77808b] sm:text-lg">
          Choose a template, customise in 10 minutes
          <br />
          and share it with your guests.
        </p>
        <Link
          href="#featured"
          className="mt-7 inline-flex min-h-12 w-[230px] items-center justify-center gap-3 rounded-full bg-[#101114] px-6 text-base font-semibold text-white shadow-[0_8px_20px_rgba(16,17,20,0.14)] transition hover:scale-[1.03] hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
        >
          Choose a template
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="relative mx-auto h-[330px] max-w-[1600px] overflow-hidden px-0 [perspective:1400px] sm:h-[440px] md:h-[520px]">
        <div className="absolute left-1/2 top-[8%] flex w-max -translate-x-1/2 items-start gap-2 [transform-style:preserve-3d] sm:gap-4 md:gap-5">
          {cards.map((product, index) => {
            let offset = index - activeIndex
            if (offset > cards.length / 2) offset -= cards.length
            if (offset < -cards.length / 2) offset += cards.length
            const distance = Math.abs(offset)
            const scale = distance === 0 ? 1 : distance === 1 ? 0.86 : distance === 2 ? 0.73 : 0.62
            const translateY = distance === 0 ? 0 : distance === 1 ? 28 : distance === 2 ? 54 : 78

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                aria-label={`View ${product.title}`}
                className="hero-card group relative block w-[120px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_42px_rgba(0,0,0,0.16)] transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 sm:w-[180px] md:w-[260px]"
                style={{
                  transform: `rotateY(${offset * -12}deg) translateY(${translateY}px) scale(${scale})`,
                  zIndex: 20 - distance,
                }}
              >
                <Image
                  src={product.thumbnail}
                  alt={`${product.title} invitation website preview`}
                  width={800}
                  height={1120}
                  className="block aspect-[5/7] h-auto w-full object-cover"
                  sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 260px"
                  priority={index < 3}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
