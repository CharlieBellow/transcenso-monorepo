"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface Option {
  value: string
  label: string
}

interface CustomPillSelectProps {
  label: string
  value?: string
  onChange: (value: string) => void
  options: Option[]
  errorMessage?: string
}

export function CustomPillSelect({
  label,
  value,
  onChange,
  options,
  errorMessage
}: CustomPillSelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-foreground/90">{label}</label>

      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => {
          if (val) onChange(val) // Evita desmarcar se for seleção obrigatória
        }}
        className="flex flex-wrap justify-start gap-2"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={option.label}
            className="rounded-full border border-border bg-primary/60 px-3.5 py-1.5 text-xs text-secondary-foreground transition-all data-[state=on]:border-transparent data-[state=on]:bg-primary data-[state=on]:font-semibold data-[state=on]:text-primary-foreground hover:bg-primary/60"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {errorMessage && (
        <span className="text-xs font-medium text-destructive/90 animate-fade-in">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
