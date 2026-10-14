import { usePersonDetail } from "@/application/hooks/usePersonDetail"

import { UserProfileCard } from "@/presentation/components/UserProfileCard"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user: person, isLoading, error } = usePersonDetail()

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !person) {
    return (
      <div className="rounded-xl bg-destructive/10 p-4 text-center text-sm text-destructive">
        {error || "Perfil não localizado."}
      </div>
    )
  }
  return (
    <>
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Perfil do Usuário
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          Visualize e gerencie suas informações de perfil.
        </p>
      </div>
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
        <UserProfileCard user ={person} />
      </div>
    </>
  )
}
