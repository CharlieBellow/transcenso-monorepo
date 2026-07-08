import { cn } from "@/lib/utils"
import React from "react"

export const CardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass-effect rounded-2xl p-6 text-card-foreground shadow-glass border-brand-gradient",
      className,
    )}
    {...props}
  />
))
CardRoot.displayName = "Card.Root"