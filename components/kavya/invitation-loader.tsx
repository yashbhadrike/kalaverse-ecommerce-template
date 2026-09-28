"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface InvitationLoaderProps {
  onComplete?: () => void
}

const ORNAMENT_PATHS = [
  "M120 120 C120 86 86 86 86 120 C86 154 120 154 120 120",
  "M120 94 C104 78 88 70 70 70 C82 86 94 96 120 104",
  "M120 146 C104 162 88 170 70 170 C82 154 94 144 120 136",
  "M94 120 C78 104 70 88 70 70 C86 82 96 94 104 120",
  "M146 120 C162 104 170 88 170 70 C154 82 144 94 136 120",
  "M120 94 C136 78 152 70 170 70 C158 86 146 96 120 104",
  "M120 146 C136 162 152 170 170 170 C158 154 146 144 120 136",
  "M120 120 C120 102 138 102 138 120 C138 138 120 138 120 120",
  "M120 120 C102 120 102 102 120 102 C138 102 138 120 120 120",
  "M120 56 C120 42 108 34 96 38 C103 48 109 53 120 56 M120 56 C120 42 132 34 144 38 C137 48 131 53 120 56",
  "M120 184 C120 198 108 206 96 202 C103 192 109 187 120 184 M120 184 C120 198 132 206 144 202 C137 192 131 187 120 184",
]

export function InvitationLoader({ onComplete }: InvitationLoaderProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !pathname.startsWith("/admin"))

  useEffect(() => {
    if (pathname.startsWith("/admin")) return
    const timer = window.setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, reducedMotion ? 450 : 3850)
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
            <motion.svg viewBox="0 0 240 240" className="h-[min(68vw,340px)] w-[min(68vw,340px)] text-[#b58a3a]" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.45 }}>
              <motion.circle cx="120" cy="120" r="3" fill="currentColor" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} />
              <g fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                {ORNAMENT_PATHS.map((path, index) => <motion.path key={path} d={path} pathLength={1} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} transition={{ duration: 0.7, delay: 0.55 + index * 0.1, ease: "easeInOut" }} />)}
                <motion.circle cx="120" cy="120" r="48" strokeDasharray="1 7" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.5 }} transition={{ duration: 1.2, delay: 1.25 }} />
              </g>
            </motion.svg>
            <motion.div className="-mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.15, duration: 0.7 }}>
              <p className="font-serif text-2xl tracking-[0.16em] text-[#641b2a] sm:text-3xl">KALAVERSE</p>
              <p className="mt-1 text-[10px] tracking-[0.42em] text-[#b58a3a]">DIGITAL</p>
              <p className="mt-5 font-serif text-sm italic text-[#806f5c]">Opening something beautiful...</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
