import { useState } from "react"
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository"
import { PersonRegistrationFormData } from "@/domain/schemas/personSchema"
import { useRouter } from "next/navigation"

export function useRegisterPerson() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Inversão de Dependência na prática: instanciamos o repositório que assina o contrato.
  // Se amanhã mudarmos para GraphQL ou Firebase, mudamos apenas essa linha.
  const personRepository = new PersonHttpRepository()

  async function register(data: PersonRegistrationFormData) {
    setIsLoading(true)
    setError(null)
   

    try {
      // Clímax do fluxo: a aplicação envia o comando para a infraestrutura
      await personRepository.save(data)
      router.push("/perfil")
    } catch (err: unknown) {
      // Captura o erro tratado pelo Axios lá no repositório e injeta no estado do React
      setError((err as Error).message || "Ocorreu um erro ao registrar a pessoa.")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    isLoading,
    error,

  }
}
