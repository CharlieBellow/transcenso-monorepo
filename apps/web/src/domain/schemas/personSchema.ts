import { Pronouns } from "@/domain/enums/pronouns"
import { z } from "zod"

// Definimos o Schema (a regra de negócio) puramente no Domínio




export const PRONOUN_LABELS: Record<Pronouns, string> = {
  [Pronouns.ELA_DELA]: "Ela / Dela",
  [Pronouns.ELE_DELE]: "Ele / Dele",
  [Pronouns.ELU_DELU]: "Elu / Delu",
  [Pronouns.PREFIRO_NAO_DIZER]: "Prefiro não dizer"
}
export const personRegistrationSchema = z.object({
  socialName: z
    .string()
    .min(2, { message: "O nome social deve ter pelo menos 2 caracteres." })
    .max(70, { message: "O nome social não pode passar de 70 caracteres." }),
  civilName: z
    .string()
    .max(70, { message: "O nome civil não pode passar de 70 caracteres." })
    .min(2, { message: "O nome civil é obrigatório." }),
  pronouns: z.enum(PRONOUN_LABELS, {
     message: "Por favor, selecione um pronome válido." }),
  genderId: z
    .string()
    .min(1, { message: "A identidade de gênero é obrigatória." }),
  sexualityId: z
    .string()
    .min(1, { message: "A orientação sexual é obrigatória." })
})

// Extraímos a tipagem do TypeScript gerada automaticamente pelo Zod
export type PersonRegistrationFormData = z.infer<
  typeof personRegistrationSchema
>
