import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export function SecureCivilName() {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="civilName" // Padronizado em camelCase
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
      >
        <Lock className="h-3.5 w-3.5 text-accent" />
        Nome Civil
      </Label>

      <div
        id="civilName" // Padronizado em camelCase
        className="flex items-center gap-3 rounded-xl border border-dashed border-accent/30 bg-secondary/20 px-4 py-3.5"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15"
          aria-hidden="true"
        >
          <Lock className="h-4 w-4 text-accent" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium tracking-widest text-foreground/70">
            ••••••••••••••
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
            Dado protegido por criptografia no Backend — Ocultado por
            privacidade
          </p>
        </div>
      </div>
    </div>
  )
}
