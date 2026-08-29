"use client"

import React from "react"
import { ShieldCheck, Mail, Tag } from "lucide-react"
import InlineBorder from "@/components/InlineBorder"

// DTO de exibição na camada de apresentação (ViewModel)
export interface UserProfileViewModel {
  id: string
  socialName: string
  civilName: string
  email: string
  pronouns: string[]
  genderTitle: string
  sexualityTitle: string
}

// Dados mockados simulando o retorno da API/Sessão
const MOCK_LOGGED_USER: UserProfileViewModel = {
  id: "usr_01h8x",
  socialName: "Charlie",
  civilName: "Charlie Bellow",
  email: "charlie@exemplo.com",
  pronouns: ["ele/dele", "elu/delu"], // Múltiplos pronomes cadastrados
  genderTitle: "Homem Trans",
  sexualityTitle: "Pansexual"
}

export function UserProfileCard() {
  const user = MOCK_LOGGED_USER

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Cabeçalho do Perfil */}
      <div className="flex items-center justify-between border-b border-border/60 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl border border-primary/20">
            {user.socialName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {user.socialName}
            </h2>
            <p className="text-xs text-muted-foreground">{user.civilName}</p>
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
            {user.pronouns.map((pronoun) => (
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
          <Mail size={14} />
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  )
}
