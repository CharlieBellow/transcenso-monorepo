import { apiFetch } from "./api"
import { Pronouns } from "@/domain/enums/pronouns"

// Este é o nosso DTO do Front-end espelhando o Back-end
export interface CreatePersonPayload {
  civilName: string
  socialName: string
  birthDate: Date | string // Aceita string porque o fetch converte a data
  cpf: string
  rg: string
  slug: string
  pronouns: Pronouns
  genderId: string
  sexualityId: string
}

export const personRepository = {
  createPerson: async (data: CreatePersonPayload) => {
    // O TypeScript garante que 'data' tem exatamente as chaves em camelCase
    // que o NestJS está esperando no Body da requisição.
    return apiFetch("/persons", {
      method: "POST",
      body: JSON.stringify(data)
    })
  }
}
