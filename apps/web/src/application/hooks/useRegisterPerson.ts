import { useState } from "react"
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { useRouter } from "next/navigation"
import { PersonDetailResponse } from "@/domain/repositories/person-repository"

export function useRegisterPerson() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Inversão de Dependência na prática: instanciamos o repositório que assina o contrato.
  // Se amanhã mudarmos para GraphQL ou Firebase, mudamos apenas essa linha.
  const personRepository = new PersonHttpRepository()

  async function register(
    data: PersonRegistrationFormData
  ): Promise<PersonDetailResponse | null> {
    setIsLoading(true)
    setError(null)

    try {
      const createdPerson = await personRepository.save(data)
      // Redireciona para a página de perfil conforme especificado nas Skills 003 e 004
      router.push(`/user?id=${createdPerson.id}`)
      return createdPerson
    } catch (err: unknown) {
      const message =
        (err as Error).message || "Ocorreu um erro ao registrar a pessoa."
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }
  return {
    register,
    isLoading,
    error
  }
}