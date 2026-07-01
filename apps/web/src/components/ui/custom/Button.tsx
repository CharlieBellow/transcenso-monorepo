import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Centralização das variantes de estilo e temas
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      theme: {
        brand: "text-[#0b0f19] focus:ring-primary/60 hover:opacity-90",
        white: "bg-white text-black focus:ring-white/40 hover:bg-white/90",
        pink: "bg-pink-600 text-white focus:ring-pink-500/40 hover:bg-pink-700",
        blue: "bg-blue-600 text-white focus:ring-blue-500/40 hover:bg-blue-700",
        transparent:
          "bg-transparent border border-white/10 text-white focus:ring-white/10 hover:bg-white/5",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-5 py-3.5",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      theme: "brand",
      size: "md",
    },
  },
)

interface CustomButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

export const CustomButton = React.forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(({ className, theme, size, isLoading, children, style, ...props }, ref) => {
  // Injeta o gradiente automaticamente se o tema selecionado for o da sua marca ('brand')
  const inlineStyle =
    theme === "brand"
      ? { background: "var(--brand-gradient)", ...style }
      : style

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ theme, size }), className)}
      style={inlineStyle}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
})
CustomButton.displayName = "CustomButton"
