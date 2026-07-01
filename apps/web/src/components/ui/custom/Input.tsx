import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Centralização das variantes de cores e bordas
const inputVariants = cva(
  "w-full rounded-xl outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60",
  {
    variants: {
      theme: {
        default: "glass-border bg-secondary/30 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/50",
        white: "border border-white/10 bg-input px-4 py-3 text-sm text-white focus:border-white/40 focus:ring-white/10 placeholder:text-muted-foreground/70",
        pink: "border border-pink-500/30 bg-input px-4 py-3 text-sm text-pink-100 focus:border-pink-500 focus:ring-pink-500/20 placeholder:text-muted-foreground/70",
        blue: "border border-blue-500/30 bg-input px-4 py-3 text-sm text-blue-100 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-muted-foreground/70",
        transparent: "border-transparent bg-transparent px-4 py-3 text-sm text-white focus:border-white/20 placeholder:text-muted-foreground/70",
      },
    },
    defaultVariants: {
      theme: "default",
    },
  },
)

interface CustomInputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string
  errorMessage?: string
}

// Usamos o forwardRef para que o react-hook-form consiga registrar o input nativo
export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, theme, label, errorMessage, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm font-medium text-foreground/90">
          {label}
        </label>

        <input
          type={type}
          className={cn(
            inputVariants({ theme }),
            errorMessage && "border-destructive focus:ring-destructive/20",
            className,
          )}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <span className="text-xs font-medium text-destructive/90 mt-0.5 animate-fade-in">
            {errorMessage}
          </span>
        )}
      </div>
    )
  },
)
CustomInput.displayName = "CustomInput"
