import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SocialNameInputProps {
  socialName: string
  onChange: (socialName: string) => void
}

export function SocialNameInput({
  socialName,
  onChange
}: SocialNameInputProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="socialName"
        className="flex items-center gap-2 text-sm font-medium"
      >
        Nome Social
        <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          Destaque
        </span>
      </Label>

      <Input
        id="socialName"
        name="socialName"
        type="text"
        placeholder="Seu nome social será respeitado em todas as interações com a plataforma"
        className="bg-secondary/30 px-4 py-6 text-base glass-border"
        value={socialName}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
