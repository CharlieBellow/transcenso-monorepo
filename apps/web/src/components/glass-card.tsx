import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function GlassCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass-card glass-card-bordered ", className)}
      {...props}
    >
      {children}
    </div>
  )
}
/* glass glass-border rounded-3xl */