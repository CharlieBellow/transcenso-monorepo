import { DataCollectionForm } from "@/components/data-collection-form"
import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase>
      <div className="mx-auto mt-12 w-full min-w-2xl px-4 sm:px-6 grid grid-cols-2">
        <PersonRegistrationForm />
        <DataCollectionForm />
      </div>
    </PageBase>
  )
}
