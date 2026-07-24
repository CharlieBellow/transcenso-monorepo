import { cn } from "@/lib/utils";


const colorVariants: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  "chart-1": "text-chart-1",
  "chart-2": "text-chart-2",
  "chart-3": "text-chart-3"
}

interface FillInputProps {
  colorText?: keyof typeof colorVariants | string
  text: string
  title: string
}

export default function FillInput({ colorText = "primary", text, title }: FillInputProps) {

  const textColorClass = colorVariants[colorText] || "text-primary"
  
  return (
    <div className="rounded-lg border border-secondary-foreground/10 bg-muted px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <p
        className={cn(
          "font-mono",
          textColorClass
        )}
      >
        {text}
      </p>
    </div>
  )
}
