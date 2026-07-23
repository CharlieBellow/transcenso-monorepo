import { LucideIcon } from "lucide-react"

interface IconHeaderProps {
  icon: LucideIcon
  title: string
  subtitle?: string
  iconColorClass?: string
}

export function IconHeader({
  icon: Icon,
  title,
  subtitle,
  iconColorClass = "text-primary"
}: IconHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
        <h4 className=" font-semibold tracking-tight text-foreground">
          {title}
        </h4>
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
