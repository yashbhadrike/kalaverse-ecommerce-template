"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface InvitationLoaderProps {
  onComplete?: () => void
}

export function InvitationLoader({ onComplete }: InvitationLoaderProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !pathname.startsWith("/admin"))
  const skip = () => {
    setVisible(false)
    onComplete?.()
  }

  useEffect(() => {
    if (pathname.startsWith("/admin")) return
    const timer = window.setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, reducedMotion ? 450 : 3000)
    return () => window.clearTimeout(timer)
  }, [onComplete, pathname, reducedMotion])

  if (pathname.startsWith("/admin")) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f7f3ea] px-6 text-[#641b2a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-8%", transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] } }}
          aria-label="Opening something beautiful"
          role="status"
        >
          <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(#641b2a_0.6px,transparent_0.6px)] [background-size:5px_5px]" />
          <div className="relative flex flex-col items-center text-center">
            <motion.div className="relative h-52 w-72 sm:h-64 sm:w-[22rem]" initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <motion.div className="absolute inset-x-[13%] bottom-[16%] z-10 h-[58%] overflow-hidden rounded-sm border border-[#b58a3a]/70 bg-[#f2e8d5] shadow-[0_18px_35px_rgba(71,39,26,0.22)]" animate={reducedMotion ? {} : { scale: [1, 1, 1.04], y: [0, 0, -5] }} transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }}>
                <div className="absolute inset-[8%] flex items-center justify-center border border-[#b58a3a]/60 bg-[#641b2a] text-[#e8c982] shadow-inner"><div className="text-center"><span className="block text-[9px] tracking-[0.28em]">YOU&apos;RE INVITED</span><span className="mt-2 block text-lg">✦</span></div></div>
              </motion.div>
              <motion.div className="absolute inset-x-[13%] top-[22%] z-20 h-[43%] origin-top border border-[#b58a3a]/70 bg-[#eadcc4] shadow-[0_8px_16px_rgba(71,39,26,0.15)] [clip-path:polygon(0_0,100%_0,50%_100%)]" initial={{ rotateX: 0 }} animate={reducedMotion ? {} : { rotateX: [0, 0, -178] }} transition={{ duration: 1.2, delay: 0.55, ease: [0.4, 0, 0.2, 1] }} style={{ transformStyle: "preserve-3d" }} />
              <div className="absolute inset-x-[13%] bottom-[16%] z-30 h-[48%] border border-[#b58a3a]/70 bg-[#eadcc4] [clip-path:polygon(0_0,50%_54%,100%_0,100%_100%,0_100%)]" />
              <motion.div className="absolute left-1/2 top-1/2 z-40 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b58a3a] bg-[#641b2a] text-xs leading-6 text-[#e8c982]" animate={reducedMotion ? {} : { boxShadow: ["0 0 0 rgba(181,138,58,0)", "0 0 28px rgba(181,138,58,.55)", "0 0 0 rgba(181,138,58,0)"] }} transition={{ duration: 0.8, delay: 1.8 }}>✦</motion.div>
            </motion.div>
            <motion.div className="mt-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.6 }}><p className="font-serif text-2xl tracking-[0.16em] text-[#641b2a] sm:text-3xl">KALAVERSE</p><p className="mt-1 text-[10px] tracking-[0.42em] text-[#b58a3a]">DIGITAL</p><p className="mt-5 font-serif text-sm italic text-[#806f5c]">Opening something beautiful...</p></motion.div>
          </div>
          <button type="button" onClick={skip} className="absolute bottom-6 right-6 text-xs tracking-wide text-[#641b2a] underline-offset-4 hover:underline">Skip intro →</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
