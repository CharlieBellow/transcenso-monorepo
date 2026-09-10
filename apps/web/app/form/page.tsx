import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase title="Formulário de Registro" className="max-w-4xl mx-auto">
      <PersonRegistrationForm />
    </PageBase>
  )
}
