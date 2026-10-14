"use client"
import { useState } from "react"

import { UserProfileViewModel } from "@/application/hooks/UserProfileViewModel"
import InlineBorder from "@/components/InlineBorder"
import { Card } from "@/components/ui/Card"
import { Calendar, ShieldCheck, Tag, Eye, EyeOff } from "lucide-react"



// DTO de exibição na camada de apresentação (ViewModel)
export interface UserProfileCardProps {
  user: UserProfileViewModel
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const [showCivilName, setShowCivilName] = useState(false)
  const initialLetter = user.displayName.charAt(0).toUpperCase()

  return (
    <Card.Root className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* Cabeçalho do Perfil */}
      <div className="flex items-center justify-between border-b border-border/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl border border-primary/20">
            {initialLetter}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {user.displayName}
            </h2>
            {/* Para pessoas trans e não binárias, o Nome Social é a sua identidade
            pública e principal. O Nome Civil é uma informação
            burocrática/jurídica que, em muitos contextos (como ao compartilhar
            a tela, fazer gravações ou demonstrar um sistema), não precisa ficar
            exposta. Sem contar que pessoas trans e não binárias podem se sentir desconfoirtável ao ver seu nome civil. */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="text-xs text-muted-foreground font-mono">
                {showCivilName ? user.civilName : "••••••••••••"}
              </p>
              <button
                type="button"
                onClick={() => setShowCivilName((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                title={
                  showCivilName ? "Ocultar nome civil" : "Exibir nome civil"
                }
                aria-label={
                  showCivilName ? "Ocultar nome civil" : "Exibir nome civil"
                }
              >
                {showCivilName ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>
        </div>

        <InlineBorder>
          <ShieldCheck size={14} className="text-primary" />
          <span>Verificado</span>
        </InlineBorder>
      </div>

      {/* Detalhes de Identidade e Informações */}
      <div className="mt-6 space-y-5">
        {/* Bloco de Pronomes (Renderizado como Pílulas/Badges) */}
        <div>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            <Tag size={12} />
            Pronomes de tratamento
          </span>
          <div className="flex flex-wrap gap-2">
            {user.pronounsLabels.map((pronoun) => (
              <span
                key={pronoun}
                className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {pronoun}
              </span>
            ))}
          </div>
        </div>

        {/* E-mail e Identidade */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-lg border border-border/40 bg-secondary/20 p-3">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Gênero
            </span>
            <span className="text-sm font-semibold text-foreground">
              {user.genderTitle}
            </span>
          </div>

          <div className="rounded-lg border border-border/40 bg-secondary/20 p-3">
            <span className="text-[11px] font-medium text-muted-foreground block">
              Orientação Sexual
            </span>
            <span className="text-sm font-semibold text-foreground">
              {user.sexualityTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
          <Calendar size={14} />
          <span>{user.birthDateFormatted}</span>
        </div>
      </div>
    </Card.Root>
  )
}
