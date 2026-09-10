import {  SexualitiesOption, SexualitiesRepository } from "@/domain/repositories/sexuality-repository"
import { apiClient } from "../http/api-client"

export class SexualityHttpRepository implements SexualitiesRepository {
  async findAll(): Promise<SexualitiesOption[]> {
    const response = await apiClient.get<SexualitiesOption[]>("/sexualities")
    return response.data
  }
}

