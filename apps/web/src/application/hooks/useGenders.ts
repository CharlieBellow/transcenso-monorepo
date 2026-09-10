import { useEffect, useState } from "react"
import {
  GenderHttpRepository,
} from "@/infra/repositories/gender-http-repository"
import { GenderOption } from "@/domain/repositories/gender-repository"

export function useGenders() {
  const [genders, setGenders] = useState<GenderOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const repository = new GenderHttpRepository()

    repository
      .findAll()
      .then(setGenders)
      .catch((err) => setError(err.message || "Erro ao carregar gêneros"))
      .finally(() => setIsLoading(false))
  }, [])

  return { genders, isLoading, error }
}
