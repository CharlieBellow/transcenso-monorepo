import PageBase from "@/components/PageBase"
import { UserProfileCard } from "@/presentation/components/UserProfileCard"

export default function userPage() {
  return (
    <PageBase hasHeader={true}>
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Perfil do Usuário
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          Visualize e gerencie suas informações de perfil.
        </p>
      </div>
      <div className="mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6">
      <UserProfileCard />
    </div>
    </PageBase>
  )
}
