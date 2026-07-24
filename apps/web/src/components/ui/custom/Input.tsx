import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import * as React from "react"

// Centralização das variantes de cores e bordas
const inputVariants = cva(
  "w-full rounded-xl outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary/60",
  {
    variants: {
      theme: {
        default:
          "bg-input/15 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/50 focus:ring-primary/60 border border-border",
        white:
          "border border-white/10 bg-input px-4 py-3 text-sm text-white focus:border-white/40 focus:ring-white/10 placeholder:text-muted-foreground/70",
        pink: "border border-pink-500/30 bg-input px-4 py-3 text-sm text-pink-100 focus:border-pink-500 focus:ring-pink-500/20 placeholder:text-muted-foreground/70",
        blue: "border border-blue-500/30 bg-input px-4 py-3 text-sm text-blue-100 focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-muted-foreground/70",
        transparent:
          "border-transparent bg-transparent px-4 py-3 text-sm text-white focus:border-white/20 placeholder:text-muted-foreground/70"
      }
    },
    defaultVariants: {
      theme: "default"
    }
  }
)

interface CustomInputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string
  errorMessage?: string
  badge?: string
}

// Usamos o forwardRef para que o react-hook-form consiga registrar o input nativo
export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { className, theme, label, badge, errorMessage, type = "text", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPasswordType = type === "password"

    const inputType = isPasswordType
      ? showPassword
        ? "text"
        : "password"
      : type
    return (
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground/90">
            {label}
          </label>
          {badge && (
            <span className="rounded-md bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              {badge}
            </span>
          )}
        </div>

        <div className="relative w-full">
          <input
            type={inputType}
            className={cn(
              inputVariants({ theme }),
              isPasswordType && "pr-11", // Dá espaço para o botão do olho não encostar no texto
              errorMessage && "border-destructive focus:ring-destructive/20",
              className
            )}
            ref={ref}
            {...props}
          />

          {/* Botão de Exibir/Ocultar Senha */}
          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {errorMessage && (
          <span className="text-xs font-medium text-destructive/90 mt-0.5 animate-fade-in">
            {errorMessage}
          </span>
        )}
      </div>
    )
  }
)

CustomInput.displayName = "CustomInput"