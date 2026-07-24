import { CardHeader } from "@/components/ui/Card/CardHeader"
import { CardHeaderDescription } from "@/components/ui/Card/CardHeaderDescription"
import { CardHeaderTitle } from "@/components/ui/Card/CardHeaderTitle"
import { CardRoot } from "@/components/ui/Card/CardRoot"
import { ReactNode } from "react"

interface ChartsGridProps {
  hasHeader?: boolean
  title?: string
  subtitle?: string
  tagText?: string
  content: ReactNode
}

export function ChartsGrid({
  hasHeader = true,
  title = "Distribuição por identidade de gênero",
  subtitle = "Agregado nacional · n = 184.392",
  tagText = "anonimizado",
  content
}: ChartsGridProps) {
  if (!hasHeader) {
    return <>{content}</>
  }
  return (
    <CardRoot className="p-6 flex flex-col gap-3">
      <CardHeader className="p-0 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2">
            <CardHeaderTitle className="text-sm font-semibold">
              {title}
            </CardHeaderTitle>
            <CardHeaderDescription className="text-xs text-muted-foreground">
              {subtitle}
            </CardHeaderDescription>
          </div>
          <span className="text-xs uppercase  text-muted-foreground">
            {tagText}
          </span>
        </div>
      </CardHeader>
      <div className="w-full">{content}</div>
    </CardRoot>
  )
}
