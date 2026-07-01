import { cn } from "@/lib/utils"
import React from "react"

export const CardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("glass-card glass-card-bordered", className)}
    {...props}
  />
))
CardRoot.displayName = "Card.Root"