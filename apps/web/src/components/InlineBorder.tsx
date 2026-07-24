import { ReactNode } from "react"

export default function InlineBorder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-secondary/30 px-4 text-xs text-foreground/80 py-1.5 font-medium">
      {children}
    </span>
  )
}
