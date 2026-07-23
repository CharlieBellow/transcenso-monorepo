import { IconHeader } from "@/components/IconHeader"
import { CardRoot } from "@/components/ui/Card/CardRoot"
import { CheckCircle2, ShieldAlert } from "lucide-react"

export function PrivacyCard() {
  const items = [
    "Criptografia ponta a ponta (AES-256)",
    "Anonimização por k-anonimato ≥ 50",
    "Sem cookies, sem fingerprint",
    "Código aberto e auditável"
  ]
  return (
    <CardRoot className="p-6 flex flex-col gap-4">
      <IconHeader
        icon={ShieldAlert}
        title="Privacidade por Design"
        subtitle="Seus dados são criptografados na origem. Nenhuma informação pessoal identificável é armazenada publicamente em nossos relatórios."
        iconColorClass="text-primary"
      />
      {/* Trocar po outras informações */}
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </CardRoot>
  )
}
