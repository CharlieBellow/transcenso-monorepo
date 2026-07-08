import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase>
      <div className="mx-auto mt-12 w-full max-w-2xl px-4 sm:px-6">
        <PersonRegistrationForm />
        <PersonRegistrationForm />
        <PersonRegistrationForm />
      </div>
    </PageBase>
  )
}
