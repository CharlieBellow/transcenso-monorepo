import { PersonRegistrationForm } from "@/components/forms/PersonRegistrationForm"
import PageBase from "@/components/PageBase"

export default function FormPage() {
  return (
    <PageBase title="Formulário de Registro" className="max-mx-12">
      <PersonRegistrationForm />
    </PageBase>
  )
}
