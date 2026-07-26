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
        value={value ?? ""}
        onValueChange={(val: string) => {
          if (val) onChange(val)
        }}
        className="flex flex-wrap justify-start gap-2"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            aria-label={option.label}
            className="rounded-full border px-3.5 py-1.5 text-xs transition-all duration-200
  
              data-[state=off]:border-border/60 data-[state=off]:bg-secondary/40 data-[state=off]:text-muted-foreground hover:data-[state=off]:bg-secondary/70 hover:data-[state=off]:text-foreground

              data-[state=on]:bg-primary/70 data-[state=on]:text-foreground data-[state=on]:border-transparent data-[state=on]:font-semibold data-[state=on]:shadow-sm"
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
