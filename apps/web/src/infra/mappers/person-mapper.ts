import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"

// Definimos o DTO exato que a API espera no body da requisição
export interface CreatePersonApiDTO {
  social_name: string
  civil_name: string
  pronouns: string[]
  gender_id: string
  sexuality_id: string
}

export class PersonMapper {
  static toPersistence(
    formData: PersonRegistrationFormData
  ): CreatePersonApiDTO {
    return {
      social_name: formData.socialName,
      civil_name: formData.civilName,
      pronouns: formData.pronouns, // Repassa o array de strings
      gender_id: formData.genderId,
      sexuality_id: formData.sexualityId
    }
  }
}
