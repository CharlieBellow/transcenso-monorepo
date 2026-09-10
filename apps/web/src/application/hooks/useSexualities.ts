import { SexualitiesOption } from "@/domain/repositories/sexuality-repository"
import { SexualityHttpRepository } from "@/infra/repositories/sexuality-http-repository"
import { useEffect, useState } from "react"

export function useSexualities() {
  const [sexualities, setSexualities] = useState<SexualitiesOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const repository = new SexualityHttpRepository()

    repository
      .findAll()
      .then(setSexualities)
      .catch((err) => setError(err.message || "Erro ao carregar Sexualidades"))
      .finally(() => setIsLoading(false))
  }, [])

  return { sexualities, isLoading, error }
}
