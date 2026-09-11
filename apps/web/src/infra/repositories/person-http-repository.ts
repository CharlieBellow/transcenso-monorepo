import {
  PersonDetailResponse,
  PersonRepository
} from "@/domain/repositories/person-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { isAxiosError } from "axios"
import { apiClient } from "../http/api-client"
import { PersonMapper } from "../mappers/person-mapper"

export class PersonHttpRepository implements PersonRepository {
  async findById(id: string): Promise<PersonDetailResponse> {
    const response = await apiClient.get<PersonDetailResponse>(`/people/${id}`);
    return response.data;
  }
  async save(data: PersonRegistrationFormData): Promise<PersonDetailResponse> {
    try {
      // 1. Delegamos a conversão de formato para o Mapper
      const payload = PersonMapper.toPersistence(data)

      const response = await apiClient.post<PersonDetailResponse>(
        "/people",
        payload
      )
      return response.data
    } catch (error: unknown) {
      let apiMessage = "Falha na comunicação com o servidor."
      if (isAxiosError(error) && error.response?.data?.message) {
        const message = error.response.data.message
        apiMessage = Array.isArray(message) ? message[0] : message
      }
      throw new Error(apiMessage)
    }
  }
}
