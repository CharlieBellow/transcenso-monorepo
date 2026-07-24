import { cn } from "@/lib/utils"

export interface ColumnDataItem {
  label: string
  value: number
}

interface ColumnsBarsProps {
  data?: ColumnDataItem[]
  className?: string
}

export const defaultRegionData: ColumnDataItem[] = [
  { label: "Sudeste", value: 42 },
  { label: "Nordeste", value: 22 },
  { label: "Sul", value: 16 },
  { label: "Norte", value: 11 },
  { label: "C.-Oeste", value: 9 }
]

export function ColumnsBars({
  data = defaultRegionData,
  className
}: ColumnsBarsProps) {
  const max = Math.max(...data.map((d) => d?.value))
  return (
    <div className={cn("flex h-44 items-end gap-3", className)}>
      {data?.map((item, index) => (
        <VerticalColumnRow
          key={item.label}
          item={item}
          max={max}
          isEven={index % 2 === 0}
        />
      ))}
    </div>
  )
}

/* Átomo responsável por renderizar a coluna individual */
function VerticalColumnRow({
  item,
  max,
  isEven
}: {
  item: ColumnDataItem
  max: number
  isEven: boolean
}) {
  const percentage = (item.value / max) * 100

  return (
    <div className="flex h-full flex-1 flex-col items-center gap-2">
      <div className="relative flex flex-1 w-full items-end">
        <div
          className="w-full rounded-md transition-all duration-500"
          style={{
            height: `${percentage}%`,
            background: isEven
              ? "linear-gradient(180deg, var(--primary), var(--chart-2))"
              : "linear-gradient(180deg, var(--chart-2), var(--primary))",
            boxShadow: isEven
              ? "0 0 20px -4px var(--color-primary, var(--primary))"
              : "0 0 20px -4px var(--color-chart-2, var(--chart-2))"
          }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground">{item.label}</span>
      <span className="font-mono text-[10px] text-foreground/80">
        {item.value}%
      </span>
    </div>
  )
}
