import { Header } from "@/components/Header"
import { HTMLAttributes } from "react"

interface PageBaseProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hasHeader?: boolean
}

export default function PageBase({
  children,
  hasHeader = true,
}: PageBaseProps) {
  return (
    <main className="min-h-screen pb-16">
      {hasHeader && <Header />}
      {children}
    </main>
  )
}
