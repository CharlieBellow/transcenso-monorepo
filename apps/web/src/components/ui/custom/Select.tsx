import { Control, Controller, FieldValues, Path } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectOption {
  value: string
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
      <label className="text-sm font-medium text-muted-foreground/80">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-secondary/30 px-4 py-6 text-base glass-border">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errorMessage && (
        <span className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
          {errorMessage}
        </span>
      )}
    </div>
  )
}
