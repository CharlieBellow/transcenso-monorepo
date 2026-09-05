import { Pronouns } from "@/domain/enums/pronouns"
import { z } from "zod"

// Definimos o Schema (a regra de negócio) puramente no Domínio

export const PRONOUN_LABELS: Record<Pronouns, string> = {
  [Pronouns.ELA_DELA]: "Ela / Dela",
  [Pronouns.ELE_DELE]: "Ele / Dele",
  [Pronouns.ELU_DELU]: "Elu / Delu",
  [Pronouns.NEUTRO]: "Neutro",
  [Pronouns.PREFIRO_NAO_DIZER]: "Prefiro não dizer",
  [Pronouns.OUTROS]: "Outros"
}
export const personRegistrationSchema = z.object({
  socialName: z
    .string()
    .max(70, { message: "O nome social não pode passar de 70 caracteres." })
    .optional()
    .or(z.literal("")),

  civilName: z
    .string()
    .min(2, { message: "O nome civil é obrigatório." })
    .max(70, { message: "O nome civil não pode passar de 70 caracteres." }),

  birthDate: z
    .string()
    .min(1, { message: "A data de nascimento é obrigatória." }),

  cpf: z
    .string()
    .min(11, { message: "O CPF deve conter pelo menos 11 dígitos." }),

  rg: z
    .string()
    .min(1, { message: "O RG é obrigatório." }),

  // 🎯 Usa nativeEnum para Enums nativos do TypeScript
  pronouns: z
    .array(z.nativeEnum(Pronouns))
    .min(1, { message: "Por favor, selecione pelo menos um pronome válido." }),

  genderId: z
    .string()
    .min(1, { message: "A identidade de gênero é obrigatória." }),

  sexualityId: z
    .string()
    .min(1, { message: "A orientação sexual é obrigatória." }),
})

// Extraímos a tipagem do TypeScript gerada automaticamente pelo Zod
export type PersonRegistrationFormData = z.infer<
  typeof personRegistrationSchema
>
