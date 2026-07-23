export const data = [
  { label: "Sudeste", value: 42 },
  { label: "Nordeste", value: 22 },
  { label: "Sul", value: 16 },
  { label: "Norte", value: 11 },
  { label: "C.-Oeste", value: 9 }
]

export function ColumnsBars({
  data
}: {
  data: { label: string; value: number }[]
}) {
  const max = Math.max(...data.map((d) => d?.value))
  return (
    <div className="flex items-end gap-3 h-44">
      {data?.map((d, i) => (
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
