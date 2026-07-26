import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export default function InlineBorder({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full shrink-0 items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90",
        className
      )}
    >
      {children}
    </span>
  )
}
