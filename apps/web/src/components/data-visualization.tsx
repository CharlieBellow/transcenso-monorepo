import { GlassCard } from '@/components/glass-card'
import { Users, EyeOff, TrendingUp, Globe } from 'lucide-react'

const metrics = [
  {
    label: 'Respostas anônimas',
    value: '48.392',
    delta: '+12,4%',
    icon: Users,
    tint: '#a5ccf9',
  },
  {
    label: 'Campos anonimizados',
    value: '100%',
    delta: 'criptografado',
    icon: EyeOff,
    tint: '#f9a5d6',
  },
  {
    label: 'Crescimento mensal',
    value: '+5.108',
    delta: 'este mês',
    icon: TrendingUp,
    tint: '#a5ccf9',
  },
  {
    label: 'Regiões cobertas',
    value: '27',
    delta: 'estados',
    icon: Globe,
    tint: '#f9a5d6',
  },
]

const identityData = [
  { label: 'Mulheres trans', value: 38, tint: '#f9a5d6' },
  { label: 'Homens trans', value: 27, tint: '#a5ccf9' },
  { label: 'Não-binárias', value: 21, tint: '#f9a5d6' },
  { label: 'Travestis', value: 9, tint: '#a5ccf9' },
  { label: 'Outras', value: 5, tint: '#f9a5d6' },
]

const ageData = [
  { label: '16–24', value: 64 },
  { label: '25–34', value: 88 },
  { label: '35–44', value: 52 },
  { label: '45–59', value: 34 },
  { label: '60+', value: 18 },
]

export function DataVisualization() {
  const maxAge = Math.max(...ageData.map((d) => d.value))

  return (
    <div className="flex flex-col gap-6">
      {/* Cartões de métricas */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <GlassCard key={m.label} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `${m.tint}26` }}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" style={{ color: m.tint }} />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {m.delta}
                </span>
              </div>
              <p className="text-2xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                {m.label}
              </p>
            </GlassCard>
          )
        })}
      </div>

      {/* Distribuição por identidade */}
      <GlassCard className="p-6" aria-labelledby="identity-title">
        <div className="mb-5 flex items-center justify-between">
          <h3 id="identity-title" className="text-base font-semibold tracking-tight">
            Identidade de gênero
          </h3>
          <span className="text-xs text-muted-foreground">% do total</span>
        </div>
        <ul className="flex flex-col gap-4">
          {identityData.map((d) => (
            <li key={d.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-foreground/85">{d.label}</span>
                <span className="font-medium text-foreground/70">{d.value}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/40">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${d.value}%`,
                    background: d.tint,
                    boxShadow: `0 0 12px ${d.tint}80`,
                  }}
                  role="img"
                  aria-label={`${d.label}: ${d.value}%`}
                />
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      {/* Faixa etária */}
      <GlassCard className="p-6" aria-labelledby="age-title">
        <div className="mb-5 flex items-center justify-between">
          <h3 id="age-title" className="text-base font-semibold tracking-tight">
            Faixa etária
          </h3>
          <span className="text-xs text-muted-foreground">respostas (mil)</span>
        </div>
        <div className="flex h-44 items-end justify-between gap-3">
          {ageData.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-lg rounded-b-sm transition-all"
                  style={{
                    height: `${(d.value / maxAge) * 100}%`,
                    background: 'var(--brand-gradient)',
                    boxShadow: '0 0 16px rgba(165,204,249,0.35)',
                  }}
                  role="img"
                  aria-label={`${d.label} anos: ${d.value} mil respostas`}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <p className="px-1 text-center text-xs text-muted-foreground text-pretty">
        Todos os dados acima são agregados e anonimizados. Nenhuma informação
        individual identificável é publicada.
      </p>
      
    </div>
  )
}
