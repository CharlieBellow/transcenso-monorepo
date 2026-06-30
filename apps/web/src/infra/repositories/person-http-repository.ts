import { PersonRepository } from "@/domain/repositories/person-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { apiClient } from "../http/api-client" // Nossa instância global

export class PersonHttpRepository implements PersonRepository {
  async save(data: PersonRegistrationFormData): Promise<void> {
    try {
      // O Axios faz o JSON.stringify automaticamente nos bastidores!
      await apiClient.post("/people", {
        social_name: data.socialName,
        civil_name: data.civilName,
        pronouns: data.pronouns,
        gender_id: data.genderId,
        sexuality_id: data.sexualityId
      })
    } catch (error: any) {
      // O Axios encapsula o erro do NestJS dentro de 'error.response.data'
      const apiMessage = error.response?.data?.message

      // Lançamos um erro limpo para a camada de Aplicação capturar
      throw new Error(apiMessage || "Falha na comunicação com o servidor.")
    }
  }
}
