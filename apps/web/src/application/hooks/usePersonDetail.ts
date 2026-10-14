import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository"
import { PRONOUN_OPTIONS } from "@/domain/enums/pronouns"
import { formatDate } from "@/infra/utils/formatters"

export interface UserProfileViewModel {
  id: string
  displayName: string
  civilName: string
  birthDateFormatted: string
  pronounsLabels: string[]
  genderTitle: string
  sexualityTitle: string
}

export function usePersonDetail() {
  const searchParams = useSearchParams()
  const personId = searchParams.get("id")

  const [user, setUser] = useState<UserProfileViewModel | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 🔍 LOG DE DEBURAÇÃO: Abra o Console do navegador (F12) para checar o valor
    console.log("-> ID capturado na URL pelo usePersonDetail:", personId)

    // 🎯 Se não encontrou o ID na URL, finaliza o carregamento e exibe o erro na UI
    if (!personId) {
      setError("Nenhum identificador de usuário (ID) foi informado na URL.")
      setIsLoading(false)
      return
    }

    let isMounted = true

    async function loadPerson() {
      setIsLoading(true)
      setError(null)

      try {
        const repository = new PersonHttpRepository()
        const data = await repository.findById(personId!)

        if (!isMounted) return

        setUser({
          id: data.id,
          displayName: data.socialName || data.civilName,
          civilName: data.socialName
            ? data.civilName
            : "Nome civil idêntico ao nome social",
          birthDateFormatted: formatDate(data.birthDate),
          pronounsLabels: data.pronouns.map(
            (p) => PRONOUN_OPTIONS.find((opt) => opt.value === p)?.label || p
          ),
          genderTitle: data.gender?.title ?? "Não informado",
          sexualityTitle: data.sexuality?.title ?? "Não informado"
        })
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            (err as Error).message || "Erro ao carregar dados do perfil."
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPerson()

    return () => {
      isMounted = false
    }
  }, [personId])

  return { user, isLoading, error }
}
