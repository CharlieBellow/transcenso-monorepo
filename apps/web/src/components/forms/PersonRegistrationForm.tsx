"use client"

import { Send, Sparkles } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { Card } from "@/components/ui/Card"
import { CustomButton } from "@/components/ui/custom/Button"
import { CustomInput } from "@/components/ui/custom/Input"
import { CustomSelect } from "@/components/ui/custom/Select"

import { useRegisterPerson } from "@/application/hooks/useRegisterPerson"
import InlineBorder from "@/components/InlineBorder"
import { CardHeaderDescription } from "@/components/ui/Card/CardHeaderDescription"
import { CardHeaderTitle } from "@/components/ui/Card/CardHeaderTitle"
import { CustomPillSelect } from "@/components/ui/custom/CustamPillSelect"
import {
  PersonRegistrationFormData,
  personRegistrationSchema
} from "@/domain/schemas/personSchema"
import { MOCK_GENDERS, MOCK_SEXUALITIES } from "@/infra/mocks/identityMocks"
import { zodResolver } from "@hookform/resolvers/zod"
import { PRONOUN_OPTIONS, Pronouns } from "@/domain/enums/pronouns"

export function PersonRegistrationForm() {
  const { register: savePerson, isLoading } = useRegisterPerson()

  const {
    register,
    formState: { errors },
    control,
    handleSubmit
  } = useForm<PersonRegistrationFormData>({
    resolver: zodResolver(personRegistrationSchema),
    defaultValues: {
      pronouns: [Pronouns.ELA_DELA] // Valor padrão para o campo de pronomes
    }
  })

  const onSubmit = (data: PersonRegistrationFormData) => {
    console.log("Dados do formulário:", data)
    savePerson(data)
  }

  return (
    <Card.Root className="p-6 sm:p-8">
      <div className="mb-6 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <Card.Header className="w-full min-w-0 flex-1">
          <CardHeaderTitle tag="h2">Coleta de dados</CardHeaderTitle>
          <CardHeaderDescription className="text-pretty">
            Suas informações são anonimizadas antes da publicação. Nada que
            identifique você é exibido publicamente.
          </CardHeaderDescription>
        </Card.Header>

        <InlineBorder className="self-start sm:self-auto">
          <Sparkles size={16} className="text-accent shrink-0" />
          <span className="truncate">Privacidade por design</span>
        </InlineBorder>
      </div>

      {/* 2. O Provedor do Shadcn (<Form>) que distribui o estado do Hook */}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* CAMPO: Nome Social */}
        <CustomInput
          {...register("socialName")}
          label="Nome Social"
          badge="Destaque"
          placeholder="Como você gostaria que eu te chame?"
          errorMessage={errors.socialName?.message}
          theme="white"
        />

        <CustomInput
          {...register("civilName")}
          label="Nome Civil"
          placeholder="Nome que consta nos documentos"
          errorMessage={errors.civilName?.message}
        />

        <div className="grid gap-5 sm:grid-cols-2">
      
          <Controller
            name="pronouns"
            control={control}
            render={({ field }) => (
              <CustomPillSelect
                label="Pronomes"
                value={field.value}
                onChange={field.onChange}
                options={PRONOUN_OPTIONS}
                errorMessage={errors.pronouns?.message}
              />
            )}
          />

          {/* Identidade de Gênero */}
          <CustomSelect
            name="genderId"
            control={control}
            label="Identidade de Gênero"
            placeholder="Selecione"
            options={MOCK_GENDERS.map((gender) => ({
              value: gender.id,
              label: gender.title
            }))}
            errorMessage={errors.genderId?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-1">
          <CustomSelect
            name="sexualityId"
            control={control}
            label="Orientação Sexual"
            placeholder="Selecione sua orientação sexual"
            options={MOCK_SEXUALITIES.map((sexuality) => ({
              value: sexuality.id,
              label: sexuality.title
            }))}
            errorMessage={errors.sexualityId?.message}
          />
        </div>

        {/*   <CustomInput
          {...register("password")}
          type="password"
          label="Senha de Acesso"
          placeholder="Sua senha secreta"
          errorMessage={errors.password?.message}
        /> */}

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
