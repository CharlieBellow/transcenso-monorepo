import { cn } from "@/lib/utils"

export const CardHeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground text-pretty", className)}
    {...props}
  />
)
CardHeaderDescription.displayName = "Card.HeaderDescription"
