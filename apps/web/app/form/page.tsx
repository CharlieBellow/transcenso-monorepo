import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase>
      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <PersonRegistrationForm />
      </div>
    </PageBase>
  )
}
