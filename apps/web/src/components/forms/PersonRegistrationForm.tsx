"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send, Sparkles } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import InlineBorder from "@/components/InlineBorder"
import { Card } from "@/components/ui/Card"
import { CardHeaderDescription } from "@/components/ui/Card/CardHeaderDescription"
import { CardHeaderTitle } from "@/components/ui/Card/CardHeaderTitle"
import { CustomButton } from "@/components/ui/custom/Button"
import { CustomPillSelect } from "@/components/ui/custom/CustamPillSelect"
import { CustomInput } from "@/components/ui/custom/Input"
import { CustomSelect } from "@/components/ui/custom/Select"

import { useGenders } from "@/application/hooks/useGenders"
import { useRegisterPerson } from "@/application/hooks/useRegisterPerson"
import { useSexualities } from "@/application/hooks/useSexualities"
import { PRONOUN_OPTIONS, Pronouns } from "@/domain/enums/pronouns"
import {
  PersonRegistrationFormData,
  personRegistrationSchema
} from "@/domain/schemas/personSchema"
// import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export function PersonRegistrationForm() {
  const {
    register: savePerson,
    isLoading: isSubmitting,
    error: submitError
  } = useRegisterPerson()
  const { genders, isLoading: isLoadingGenders } = useGenders()
  const { sexualities, isLoading: isLoadingSexualities } = useSexualities()

  const {
    register,
    formState: { errors },
    control,
    handleSubmit
  } = useForm<PersonRegistrationFormData>({
    resolver: zodResolver(personRegistrationSchema),
    defaultValues: {
      socialName: "",
      civilName: "",
      birthDate: "",
      cpf: "",
      rg: "",
      pronouns: [Pronouns.ELA_DELA], // estatisitcamente existem mais mulheres do que homens no planeta, então vamos assumir que a maioria das pessoas se identifica com pronomes femininos. Não faz sentido você obrigar a maioria a trocar o pronome na hora do cadastro, já pensou nisso?. E além disso, as identidades femininas são mais estigmatizadas e a comunidade trans tende a abraçar o feminino como ato de resistência.
      genderId: "",
      sexualityId: ""
    }
  })
  // const router = useRouter()
  const onSubmit = async (data: PersonRegistrationFormData) => {
    try {
      await savePerson(data)
      toast.success("Pessoa cadastrada com sucesso!", {
        style: {
          background: "linear-gradient(to right, #5b9be8, #e87bb8)",
          borderRadius: "4px",
          height: "6px"
        }
      })
      // router.push("/user")
    } catch (error) {
      toast.error(`Erro ao cadastrar pessoa. Tente novamente. ${error}`, {
        style: {
          background: "linear-gradient(to right, #e85b5b, #e8a15b)",
          borderRadius: "4px",
          height: "6px"
        }
      })
    }
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

      {isLoadingGenders && (
        <div className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar as opções da API: {isLoadingGenders}
        </div>
      )}
      {isLoadingSexualities && (
        <div className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          Não foi possível carregar as opções da API: {isLoadingSexualities}
        </div>
      )}

      {submitError && (
        <div className="mb-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* CAMPO: Nome Social, é o primeiro campo, para deixar claro para o usuário que incluímos o nome social como prioridade */}
        <CustomInput
          {...register("socialName")}
          label="Nome Social"
          badge="Destaque"
          // Aqie essa pergunta faz total diferença, porque não faz você tentar presumir o gÇenero da pessoa, e sim deixa ela se expressar. Isso é muito importante. é bem diferente de perguntar omo você gostaria de ser chamada(o)? percebe que aqui você tá tentando saber o gênero? então sempre que possível use termos como "você" "pessoa", etc. e não tente adivinhar o gênero da pessoa, assim é muito mais inclusiva e respeitosa.
          placeholder="Como você gostaria que eu te chame?"
          errorMessage={errors.socialName?.message}
          theme="white"
        />

        {/* CAMPO: Nome Civil */}
        <CustomInput
          {...register("civilName")}
          label="Nome Civil Completo"
          // Aqui evite falar "nome que consta no documento" ou "nome de verdade". é apenas nome civil, e a pessoa já vai saber que é o nome do RG. Se houver muitos erros de preenchimento, ou para não restar dúvidas, você pode adicionar no campo do nome social uma observação sobre o que é o nome social. aí as pessoas não vão mais confundir. E se acontecer erros, pode ser por conta do autocompletar do Google que acaba preenchendo esse campo com o nome do pai ou da mãe, por exemplo.
          placeholder="Nome civil completo"
          errorMessage={errors.civilName?.message}
        />

        {/* CAMPOS: Documentos e Nascimento */}
        <div className="grid gap-5 sm:grid-cols-3">
          <CustomInput
            {...register("birthDate")}
            type="date"
            label="Data de Nascimento"
            errorMessage={errors.birthDate?.message}
          />
          <CustomInput
            {...register("cpf")}
            label="CPF"
            placeholder="000.000.000-00"
            errorMessage={errors.cpf?.message}
          />
          <CustomInput
            {...register("rg")}
            label="RG"
            placeholder="Número do documento"
            errorMessage={errors.rg?.message}
          />
        </div>

        {/* Pronomes e Identidade de Gênero */}
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
            placeholder={
              isLoadingGenders
                ? "Carregando gêneros..."
                : "Selecione sua identidade"
            }
            options={genders.map((gender) => ({
              value: gender.id,
              label: gender.title
            }))}
            errorMessage={errors.genderId?.message}
          />
        </div>

        {/* Orientação Sexual (buscada da API) */}
        <div className="grid grid-cols-1 gap-5">
          <CustomSelect
            name="sexualityId"
            control={control}
            label="Orientação Sexual"
            placeholder={
              isLoadingSexualities
                ? "Carregando orientações..."
                : "Selecione sua orientação sexual"
            }
            options={sexualities.map((sexuality) => ({
              value: sexuality.id,
              label: sexuality.title
            }))}
            errorMessage={errors.sexualityId?.message}
          />
        </div>

        {/* Botão de Submissão */}
        <CustomButton
          type="submit"
          theme="brand"
          isLoading={isSubmitting || isLoadingGenders || isLoadingSexualities}
          className="mt-2"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Enviar
        </CustomButton>
      </form>
    </Card.Root>
  )
}
