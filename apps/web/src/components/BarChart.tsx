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
