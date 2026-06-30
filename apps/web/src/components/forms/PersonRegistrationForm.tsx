"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/glass-card"
import { Lock, Sparkles, Send, UserCircle, Heart, ShieldAlert } from "lucide-react"

import {
  personRegistrationSchema,
  PersonRegistrationFormData,
  PRONOUN_LABELS
} from "@/domain/schemas/personSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_GENDERS, MOCK_SEXUALITIES } from "@/infra/mocks/identityMocks"

export function PersonRegistrationForm() {
  // 1. Inicialização Estrutural do React Hook Form
  // Por enquanto, deixamos os valores padrão vazios.
  // No futuro, isso será movido para o nosso Custom Hook na camada de Application.
  const form = useForm<PersonRegistrationFormData>({
    resolver: zodResolver(personRegistrationSchema), // Injetando a validação
    defaultValues: {
      socialName: "",
      civilName: "",
      pronouns: undefined, 
      genderId: "",
      sexualityId: ""
    }
  })

  function onSubmit(values: PersonRegistrationFormData) {
    console.log("Dados estruturados prontos para envio:", values)
  }

  return (
    <GlassCard className="p-6 sm:p-8">
      {/* Cabeçalho do Formulário (Apresentação) */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Coleta de dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Suas informações são anonimizadas antes da publicação.
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Privacidade por design
        </span>
      </div>

      {/* 2. O Provedor do Shadcn (<Form>) que distribui o estado do Hook */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* CAMPO: Nome Social */}
          <FormField
            control={form.control}
            name="socialName" // Exatamente o nome camelCase do DTO
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  Nome Social
                  <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Destaque
                  </span>
                </FormLabel>
                <FormControl>
                  {/* O operador {...field} injeta automaticamente o value e o onChange do RHF */}
                  <Input
                    placeholder="Como você prefere que eu te chame?"
                    className="bg-secondary/30 px-4 py-6 text-base glass-border"
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Onde a mensagem do Zod aparecerá depois */}
              </FormItem>
            )}
          />

          {/* CAMPO: Nome Civil (Protegido) */}
          <FormField
            control={form.control}
            name="civilName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 text-accent" />
                  Nome Civil
                </FormLabel>
                <FormControl>
                  {/* Estrutura visual do cadeado mantida com os design tokens limpos */}
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-accent/30 bg-secondary/20 px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                      <Lock className="h-4 w-4 text-accent" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-medium tracking-widest text-foreground/70">
                        ••••••••••••••
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground text-pretty">
                        Dado protegido por criptografia no Backend — Ocultado
                        por privacidade
                      </p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pronouns"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-sm font-medium">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  Pronomes
                </FormLabel>
                {/* Conexão do estado: passamos o onValueChange e o defaultValue do field */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-secondary/30 px-4 py-6 text-base glass-border">
                      <SelectValue placeholder="Selecione seus pronomes" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(PRONOUN_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* CAMPO: Identidade de Gênero */}
            <FormField
              control={form.control}
              name="genderId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                    <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                    Identidade de Gênero
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-secondary/30 px-4 py-6 text-base glass-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_GENDERS.map((gender) => (
                        <SelectItem key={gender.id} value={gender.id}>
                          {gender.title} ({gender.acronym})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CAMPO: Orientação Sexual */}
            <FormField
              control={form.control}
              name="sexualityId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    Orientação Sexual
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-secondary/30 px-4 py-6 text-base glass-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_SEXUALITIES.map((sexuality) => (
                        <SelectItem key={sexuality.id} value={sexuality.id}>
                          {sexuality.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Botão de Submissão */}
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-[#0b0f19] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/60"
            style={{ background: "var(--brand-gradient)" }}
          >
            <Send className="h-4 w-4" />
            Enviar com segurança
          </button>
        </form>
      </Form>
    </GlassCard>
  )
}
