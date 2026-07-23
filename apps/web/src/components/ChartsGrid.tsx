import { CardHeader } from "@/components/ui/Card/CardHeader"
import { CardHeaderDescription } from "@/components/ui/Card/CardHeaderDescription"
import { CardHeaderTitle } from "@/components/ui/Card/CardHeaderTitle"
import { CardRoot } from "@/components/ui/Card/CardRoot"

export function ChartsGrid(
  { hasHeader, content }: { hasHeader?: boolean; content: React.ReactNode },
) {
  return hasHeader ? (
    <CardRoot className="p-6 flex flex-col gap-3">
      <CardHeader className="p-0 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="space-y-2">
            <CardHeaderTitle className="text-sm font-semibold">
              Distribuição por identidade de gênero
            </CardHeaderTitle>
            <CardHeaderDescription className="text-xs text-muted-foreground">
              Agregado nacional · n = 184.392
            </CardHeaderDescription>
          </div>
          <span className="text-xs uppercase  text-muted-foreground">
            anonimizado
          </span>
        </div>
      </CardHeader>
    </CardRoot>
  ) : (
    { content }
  )
}
