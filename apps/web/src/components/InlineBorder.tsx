import { ReactNode } from "react";

export default function InlineBorder({children}: {children: ReactNode}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 text-xs text-foreground/80">
      <>{children}</>
    </span>
  )
}
