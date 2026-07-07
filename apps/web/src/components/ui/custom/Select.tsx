import { Control, Controller, FieldValues, Path } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SelectOption {
  value: string | number
  label: string
}

interface CustomSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label: string
  placeholder?: string
  options: SelectOption[]
  errorMessage?: string
}

export function CustomSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  errorMessage,
}: CustomSelectProps<TFieldValues>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-muted-foreground/90">
        {label}
      </label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ""
              }
            >
              <SelectTrigger
                className={cn(
                  // 1. CSS EXATO DO INPUT: Remove o estilo do Card e aplica o visual Cyberpunk Clean
                  "w-full rounded-xl outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60 glass-border bg-secondary/30 px-4 py-3.5 text-base text-foreground text-left flex justify-between items-center h-auto font-normal",
                  errorMessage &&
                    "border-destructive focus:ring-destructive/20",
                )}
              >
                <SelectValue placeholder={placeholder || "Selecione..."} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem
                    key={String(option.value)}
                    value={String(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {errorMessage && (
        <span className="text-xs font-medium text-destructive/90 mt-0.5 animate-fade-in">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
