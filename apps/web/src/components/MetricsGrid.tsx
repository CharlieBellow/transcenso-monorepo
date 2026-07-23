import { Users, Globe2, Heart, TrendingUp, LucideIcon } from 'lucide-react'
export const metrics = [
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


export default function MetricsGrid({ metrics } : { metrics: { label: string, value: string, delta: string, icon: LucideIcon, tone: "blue" | "pink" }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metrics?.map((m) => (
        <div key={m.label} className="glass-card-bordered p-5">
          <div className="flex items-start justify-between gap-3">
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg border border-white/10 ${
                m.tone === "blue" ? "bg-primary/10" : "bg-accent/10"
              }`}
            >
              <m.icon
                className={`h-4 w-4 ${m.tone === "blue" ? "text-primary" : "text-accent"}`}
              />
            </div>
            <span
              className={`text-[11px] font-medium ${
                m.tone === "blue" ? "text-primary" : "text-accent"
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
  
