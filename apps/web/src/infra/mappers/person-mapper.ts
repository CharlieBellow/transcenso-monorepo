import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"

// Definimos o DTO exato que a API espera no body da requisição
export interface CreatePersonApiDTO {
  socialName?: string | null
  civilName: string
  pronouns: string[]
  genderId: string
  sexualityId: string
  birthDate: string | Date
  cpf: string
  rg: string
}

export class PersonMapper {
  static toPersistence(
    formData: PersonRegistrationFormData
  ): CreatePersonApiDTO {
    return {
      socialName: formData.socialName,
      civilName: formData.civilName,
      pronouns: formData.pronouns,
      birthDate: formData.birthDate,
      cpf: formData.cpf,
      rg: formData.rg,
      genderId: formData.genderId,
      sexualityId: formData.sexualityId
    }
  }
}
