'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { Lock, Sparkles, ChevronDown, Send } from 'lucide-react'

const fieldBase =
  'w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#a5ccf9]/60'

const pronounOptions = ['Ela/Dela', 'Ele/Dele', 'Elu/Delu', 'Prefiro não dizer']

export function DataCollectionForm() {
  const [pronoun, setPronoun] = useState<string>('Ela/Dela')

  return (
    <GlassCard className="p-6 sm:p-8" aria-labelledby="form-title">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 id="form-title" className="text-xl font-semibold tracking-tight">
            Coleta de dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Suas informações são anonimizadas antes da publicação. Nada que
            identifique você é exibido publicamente.
          </p>
        </div>
        <span
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90 sm:flex"
          aria-hidden="true"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#f9a5d6]" />
          Privacidade por design
        </span>
      </div>

      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        {/* Nome Social — em destaque */}
        <div>
          <label
            htmlFor="nome-social"
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            Nome Social
            <span className="rounded-md bg-[#a5ccf9]/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#a5ccf9]">
              Destaque
            </span>
          </label>
          <input
            id="nome-social"
            name="nome-social"
            type="text"
            placeholder="Como você gostaria de ser chamada(o)"
            className={`${fieldBase} glass-border bg-secondary/30 px-4 py-3.5 text-base`}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Pronomes */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Pronomes</legend>
            <div className="flex flex-wrap gap-2">
              {pronounOptions.map((option) => {
                const active = pronoun === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPronoun(option)}
                    aria-pressed={active}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                      active
                        ? 'border-transparent bg-[#a5ccf9] font-medium text-[#0b0f19]'
                        : 'border-border bg-secondary/30 text-foreground/80 hover:border-[#a5ccf9]/50'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Identidade de Gênero */}
          <div>
            <label
              htmlFor="identidade"
              className="mb-2 block text-sm font-medium"
            >
              Identidade de Gênero
            </label>
            <div className="relative">
              <select
                id="identidade"
                name="identidade"
                className={`${fieldBase} appearance-none pr-10`}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option>Mulher trans</option>
                <option>Homem trans</option>
                <option>Pessoa não-binária</option>
                <option>Travesti</option>
                <option>Gênero fluido</option>
                <option>Outra / Autodeclarada</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Orientação Sexual */}
        <div>
          <label htmlFor="orientacao" className="mb-2 block text-sm font-medium">
            Orientação Sexual
          </label>
          <div className="relative">
            <select
              id="orientacao"
              name="orientacao"
              className={`${fieldBase} appearance-none pr-10`}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione
              </option>
              <option>Heterossexual</option>
              <option>Homossexual</option>
              <option>Bissexual</option>
              <option>Pansexual</option>
              <option>Assexual</option>
              <option>Prefiro não dizer</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Nome Civil — protegido / criptografado */}
        <div>
          <label
            htmlFor="nome-civil"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Lock className="h-3.5 w-3.5 text-[#f9a5d6]" />
            Nome Civil
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#f9a5d6]/30 bg-secondary/20 px-4 py-3.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f9a5d6]/15"
              aria-hidden="true"
            >
              <Lock className="h-4 w-4 text-[#f9a5d6]" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium tracking-widest text-foreground/70">
                ••••••••••••••
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                Dado protegido por criptografia no Backend — Ocultado por
                privacidade
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[#0b0f19] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#a5ccf9]/60"
          style={{ background: 'var(--brand-gradient)' }}
        >
          <Send className="h-4 w-4" />
          Enviar com segurança
        </button>
      </form>
    </GlassCard>
  )
}
