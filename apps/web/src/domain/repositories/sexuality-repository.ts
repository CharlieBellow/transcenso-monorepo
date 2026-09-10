export interface SexualitiesOption {
  id: string
  title: string
  acronym: string
  description?: string | null
  slug: string
}

export interface SexualitiesRepository {
  findAll(): Promise<SexualitiesOption[]>
}
