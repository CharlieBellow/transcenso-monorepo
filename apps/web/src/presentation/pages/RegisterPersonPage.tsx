import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function RegisterPersonPage() {
  return (
    <PageBase>
      <div className="mx-auto mt-12 w-full min-w-2xl px-4 sm:px-6">
        <PersonRegistrationForm />
      </div>
    </PageBase>
  )
}
