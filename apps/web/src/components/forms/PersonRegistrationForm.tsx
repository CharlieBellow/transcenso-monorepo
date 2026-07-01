"use client"

import { Send, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"

import { Card } from "@/components/ui/Card"
import { CustomButton } from "@/components/ui/custom/Button"
import { CustomInput } from "@/components/ui/custom/Input"
import { CustomSelect } from "@/components/ui/custom/Select"
import { SelectItem } from "@/components/ui/select"
import {
  PersonRegistrationFormData,
  personRegistrationSchema,
} from "@/domain/schemas/personSchema"
import { MOCK_GENDERS, MOCK_SEXUALITIES } from "@/infra/mocks/identityMocks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterPerson } from "@/application/hooks/useRegisterPerson"

export function PersonRegistrationForm() {

  const {
    register: savePerson,
    isLoading,
    error,
    isSuccess,
  } = useRegisterPerson()
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<PersonRegistrationFormData>({
    resolver: zodResolver(personRegistrationSchema),
  })

  const onSubmit = (data: PersonRegistrationFormData) => {
    console.log("Dados do formulário:", data)
  }

  return (
    <Card.Root className="p-6 sm:p-8">
      {/* Cabeçalho do Formulário (Apresentação) */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <Card.Header>
          <h2 className="text-xl font-semibold tracking-tight">
            Coleta de dados
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Suas informações são anonimizadas antes da publicação.
          </p>
        </Card.Header>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-foreground/90 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Privacidade por design
        </span>
      </div>

      {/* 2. O Provedor do Shadcn (<Form>) que distribui o estado do Hook */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* CAMPO: Nome Social */}
        <CustomInput
          {...register("socialName")}
          label="Nome Social"
          theme="white"
          errorMessage={errors.socialName?.message}
        />

        <CustomInput
          {...register("civilName")}
          label="Nome Civil"
          theme="default"
          errorMessage={errors.civilName?.message}
        />

        <CustomSelect
          name="pronouns"
          control={control}
          label="Pronomes"
          placeholder="Selecione seus pronomes"
          options={[
            { value: "ELE_DELE", label: "Ele / Dele" },
            { value: "ELA_DELA", label: "Ela / Dela" },
          ]}
          errorMessage={errors.pronouns?.message}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <CustomSelect
            name="genderId"
            control={control}
            label="Identidade de Gênero"
            placeholder="Selecione sua identidade de gênero"
            options={MOCK_GENDERS.map((gender) => (
              { value: gender.id, label: gender.title} 
            ))}
            errorMessage={errors.genderId?.message}
          />
          <CustomSelect
            name="sexualityId"
            control={control}
            label="Orientação Sexual"
            placeholder="Selecione sua orientação sexual"
            options={MOCK_SEXUALITIES.map((sexuality) => (
              {value: sexuality.id, label: sexuality.title}
            ))}
            errorMessage={errors.sexualityId?.message}
          />
        </div>

        {/* Botão de Submissão */}
        <CustomButton
          type="submit"
          theme="brand"
          isLoading={isLoading}
          className="mt-2"
        >
          <Send className="h-4 w-4" />
          Enviar com segurança
        </CustomButton>
      </form>
    </Card.Root>
  )
}
