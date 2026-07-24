import { cn } from "@/lib/utils"

export interface BarDataItem {
  label: string
  value: number
}

interface BarChartProps {
  data?: BarDataItem[]
  className?: string
}

// Dados padrão exibidos caso nenhuma prop seja informada
const defaultData: BarDataItem[] = [
  { label: "Mulher trans", value: 38 },
  { label: "Homem trans", value: 24 },
  { label: "Não-binárie", value: 19 },
  { label: "Travesti", value: 11 },
  { label: "Gênero fluido", value: 5 },
  { label: "Agênero", value: 3 }
]

export function BarChart({ data = defaultData, className }: BarChartProps) {
  // Encontra o valor máximo para calcular as proporções das barras
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item, index) => (
        <HorizontalBarRow
          key={item.label}
          item={item}
          max={max}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  )
}

/* Átomo responsável por renderizar a barra e o rótulo individual */
function HorizontalBarRow({
  item,
  max,
  isEven
}: {
  item: BarDataItem
  max: number
  isEven: boolean
}) {
  const percentage = (item.value / max) * 100

  return (
    <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-3">
      <span className="truncate text-xs text-muted-foreground">
        {item.label}
      </span>

      {/* Trilho da Barra */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary/20">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: isEven
              ? "linear-gradient(90deg, var(--primary), var(--chart-2))"
              : "linear-gradient(90deg, var(--chart-2), var(--primary))",
            boxShadow: isEven
              ? "0 0 25px -8px var(--bg-glow-pink)"
              : "0 0 25px -8px var(--bg-glow-blue)"
          }}
        />
      </div>

      <span className="text-right font-mono text-xs tabular-nums text-foreground">
        {item.value}%
      </span>
    </div>
  )
}
