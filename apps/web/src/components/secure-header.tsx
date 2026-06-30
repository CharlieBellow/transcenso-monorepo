import { ThemeToggle } from "@/components/theme-toggle"
import { Lock, ShieldCheck } from "lucide-react"

export function SecureHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-popover/95 shadow-sm shadow-black/5 backdrop-blur-md supports-[backdrop-filter]:bg-popover/85">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: "var(--brand-gradient)" }}
            aria-hidden="true"
          >
            <Lock
              className="h-4 w-4 text-[#0b0f19]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight">
              Trans<span className="text-gradient">Censo</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              Trans-parência de dados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5"
            role="status"
            aria-live="polite"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <ShieldCheck
              className="h-3.5 w-3.5 text-primary"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-foreground/90">
              Conexão segura
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · Dados criptografados
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
