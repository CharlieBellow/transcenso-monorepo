import { isAxiosError } from "axios"
import { PersonRepository } from "@/domain/repositories/person-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { apiClient } from "../http/api-client"
import { PersonMapper } from "../mappers/person-mapper"

export class PersonHttpRepository implements PersonRepository {
  async save(data: PersonRegistrationFormData): Promise<void> {
    try {
      // 1. Delegamos a conversão de formato para o Mapper
      const payload = PersonMapper.toPersistence(data)

      // 2. Enviamos o payload transformado
      await apiClient.post("/people", payload)
    } catch (error: unknown) {
      // 3. Captura segura do erro sem usar 'any'
      let apiMessage = "Falha na comunicação com o servidor."

      if (isAxiosError(error) && error.response?.data?.message) {
        // Se a resposta do NestJS for um array de mensagens de validação, pegamos a primeira
        const message = error.response.data.message
        apiMessage = Array.isArray(message) ? message[0] : message
      }

      throw new Error(apiMessage)
    }
  }
}
