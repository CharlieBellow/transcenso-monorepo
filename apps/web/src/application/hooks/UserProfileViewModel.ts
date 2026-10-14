"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository"
import { PRONOUN_OPTIONS } from "@/domain/enums/pronouns"
import { formatDate } from "@/infra/utils/formatters"

// ViewModel formatada e segura para o componente visual consumir
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(
    !personId ? "Identificador de usuário não informado na URL." : null
  )

  
  useEffect(() => {
    if (!personId) return

    let isMounted = true

    async function fetchPersonDetail() {
      setIsLoading(false)
      setError(null)

      try {
        const repository = new PersonHttpRepository()
        const data = await repository.findById(personId!)

        if (!isMounted) return

        // 🎯 MAPPER DEFENSIVO: Converte DTO -> ViewModel tratando nulos e formatações
        const mappedViewModel: UserProfileViewModel = {
          id: data.id,
          displayName: data.socialName || data.civilName,
          civilName: data.socialName
            ? data.civilName
            : "Nome civil idêntico ao nome social",
          birthDateFormatted: formatDate(data.birthDate),
          pronounsLabels: data.pronouns.map(
            (p) => PRONOUN_OPTIONS.find((opt) => opt.value === p)?.label || p
          ),
          // 🎯 Proteção TS18047: Optional Chaining + Fallback
          genderTitle: data.gender?.title ?? "Não informado",
          sexualityTitle: data.sexuality?.title ?? "Não informado"
        }

        setUser(mappedViewModel)
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            (err as Error).message ||
              "Não foi possível carregar os dados do perfil."
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPersonDetail()

    return () => {
      isMounted = false
    }
  }, [personId])

  return { user, isLoading, error }
}

