import { cn } from "@/lib/utils";

export default function FillInput({ colorText, text, title }: { colorText: string, text: string, title: string }) {
  return (
    <div className="rounded-lg border border-secondary-foreground/10 bg-muted px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <p className={cn("font-mono", `text-${colorText == "primary" ? "primary" : "secondary"}`)}>{text}</p>
    </div>
  )
}
