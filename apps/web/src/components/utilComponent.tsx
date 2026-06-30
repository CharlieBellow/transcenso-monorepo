import { CheckCircle2, Globe2, Heart, Shield, ShieldCheck, TrendingUp, Users } from "lucide-react"

export function PrivacyCard() {
  const items = [
    "Criptografia ponta a ponta (AES-256)",
    "Anonimização por k-anonimato ≥ 50",
    "Sem cookies, sem fingerprint",
    "Código aberto e auditável"
  ]
  return (
    <div className="glass-card-bordered p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
          <Shield className="h-5 w-5 text-[#f9a5d6]" />
        </div>
        <h3 className="text-base font-semibold">Privacidade por design</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#a5ccf9]" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MethodologyCard() {
  return (
    <div className="glass-card-bordered p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10">
          <Globe2 className="h-5 w-5 text-[#a5ccf9]" />
        </div>
        <h3 className="text-base font-semibold">Metodologia aberta</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Todo o pipeline de coleta, anonimização e agregação é público.
        Pesquisadoras podem reproduzir, auditar e contestar.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Schema
          </p>
          <p className="font-mono text-[#a5ccf9]">v2.4.0</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Licença
          </p>
          <p className="font-mono text-[#f9a5d6]">ODbL 1.0</p>
        </div>
      </div>
    </div>
  )
}

export function MetricsGrid() {
  const metrics = [
    {
      label: "Pessoas participantes",
      value: "184.392",
      delta: "+2,3%",
      icon: Users,
      tone: "blue" as const
    },
    {
      label: "Cidades cobertas",
      value: "1.247",
      delta: "+18",
      icon: Globe2,
      tone: "pink" as const
    },
    {
      label: "Identidades declaradas",
      value: "27",
      delta: "novo: agênero",
      icon: Heart,
      tone: "blue" as const
    },
    {
      label: "Consultas à API/mês",
      value: "3.1M",
      delta: "+12%",
      icon: TrendingUp,
      tone: "pink" as const
    }
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="glass-card-bordered p-5">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 ${
                m.tone === "blue" ? "bg-[#a5ccf9]/10" : "bg-[#f9a5d6]/10"
              }`}
            >
              <m.icon
                className={`h-4 w-4 ${m.tone === "blue" ? "text-[#a5ccf9]" : "text-[#f9a5d6]"}`}
              />
            </div>
            <span
              className={`text-[11px] font-medium ${
                m.tone === "blue" ? "text-[#a5ccf9]" : "text-[#f9a5d6]"
              }`}
            >
              {m.delta}
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold tracking-tight">
            {m.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  )
}

export function ChartsGrid() {
  return (
    <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="glass-card-bordered p-6 lg:col-span-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 mb-5">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold">
              Distribuição por identidade de gênero
            </h4>
            <p className="text-xs text-muted-foreground">
              Agregado nacional · n = 184.392
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground glass-card-bordered px-2 py-1">
            anonimizado
          </span>
        </div>
        <BarChart />
      </div>

      <div className="glass-card-bordered p-6">
        <h4 className="text-sm font-semibold">Por região</h4>
        <p className="text-xs text-muted-foreground mb-5">
          Participação relativa
        </p>
        <RegionBars />
      </div>
    </div>
  )
}

export function BarChart() {
  const data = [
    { label: "Mulher trans", value: 38 },
    { label: "Homem trans", value: 24 },
    { label: "Não-binárie", value: 19 },
    { label: "Travesti", value: 11 },
    { label: "Gênero fluido", value: 5 },
    { label: "Agênero", value: 3 }
  ]
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div
          key={d.label}
          className="grid grid-cols-[120px_minmax(0,1fr)_44px] sm:grid-cols-[140px_minmax(0,1fr)_48px] items-center gap-3"
        >
          <span className="truncate text-xs text-muted-foreground">
            {d.label}
          </span>
          <div className="relative h-2.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, #a5ccf9, #f9a5d6)"
                    : "linear-gradient(90deg, #f9a5d6, #a5ccf9)",
                boxShadow: "0 0 20px -2px rgba(249,165,214,0.4)"
              }}
            />
          </div>
          <span className="text-right text-xs font-mono tabular-nums">
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

export function RegionBars() {
  const data = [
    { label: "Sudeste", value: 42 },
    { label: "Nordeste", value: 22 },
    { label: "Sul", value: 16 },
    { label: "Norte", value: 11 },
    { label: "C.-Oeste", value: 9 }
  ]
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="relative w-full flex-1 flex items-end">
            <div
              className="w-full rounded-md"
              style={{
                height: `${(d.value / max) * 100}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, rgba(165,204,249,0.9), rgba(165,204,249,0.2))"
                    : "linear-gradient(180deg, rgba(249,165,214,0.9), rgba(249,165,214,0.2))",
                boxShadow: "0 0 25px -8px rgba(165,204,249,0.6)"
              }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{d.label}</span>
          <span className="text-[10px] font-mono text-foreground/80">
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <p className="text-xs text-muted-foreground min-w-0">
          © {new Date().getFullYear()} TransCenso · construído com privacidade
          por design.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a5ccf9]" /> API status:
          operacional
        </div>
      </div>
    </footer>
  )
}
