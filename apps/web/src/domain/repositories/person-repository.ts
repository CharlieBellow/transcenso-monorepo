import { PersonRegistrationFormData } from "../schemas/personSchema"

export interface PersonDetailResponse {
  id: string
  name: string
  civilName: string
  socialName: string | null
  slug?: string
  cpf: string
  rg: string
  birthDate: string | Date
  pronouns: string[]
  gender: { id: string; title: string } | null
  sexuality: { id: string; title: string } | null
}


export interface PersonRepository {
  /**
   * Envia os dados validados do formulário de registro para persistência (API).
   * @param data Dados da pessoa validados pelo Zod.
   * @returns Uma Promise que resolve quando o envio é bem-sucedido.
   * @throws {DomainError} Caso o backend retorne um erro de negócio.
   */
  save(data: PersonRegistrationFormData): Promise<PersonDetailResponse>
}
