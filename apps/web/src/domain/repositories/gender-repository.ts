export interface GenderOption {
  id: string
  title: string
  acronym: string
  description?: string | null
  slug: string
}

export interface GenderRepository {
  findAll(): Promise<GenderOption[]>
}

