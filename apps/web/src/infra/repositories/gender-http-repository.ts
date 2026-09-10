import { GenderOption, GenderRepository } from "@/domain/repositories/gender-repository"
import { apiClient } from "../http/api-client"

export class GenderHttpRepository implements GenderRepository {
  async findAll(): Promise<GenderOption[]> {
    const response = await apiClient.get<GenderOption[]>("/genders")
    return response.data
  }
}

