"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Homepage = dynamic(
  () => import("@/components/kavya/homepage").then((module) => module.Homepage),
  { ssr: false },
)

export default function HomepageClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <Homepage />
}
