"use client"

import dynamic from "next/dynamic"

const Homepage = dynamic(
  () => import("@/components/kavya/homepage").then((module) => module.Homepage),
  { ssr: false },
)

export default function HomepageClient() {
  return <Homepage />
}
