# 003-Refatoração e Integração do Formulário de Cadastro (PersonRegistrationForm)



1. Identificação da Tarefa
Nome da Feature: Refatoração e Integração do Formulário de Cadastro (PersonRegistrationForm)

Camada Afetada: Web / Frontend (apps/web - UI Componentes, Zod Schemas, Hooks e Repositórios)

2. Contexto e Objetivo
O que precisa ser feito: Adicionar os campos faltantes no formulário (birthDate, cpf, rg) para destravar a validação do Zod, ajustar a renderização do CustomSelect para exibir o rótulo (label) no lugar do ID, e integrar o envio com a API NestJS conectando o react-toastify com barra de progresso customizada.

Regra de Negócio Central: O formulário deve coletar e validar rigorosamente todas as propriedades obrigatórias do personRegistrationSchema antes do envio, enviando o payload formatado em camelCase para a rota POST /people.

3. Contrato Técnico (Entradas e Saídas)
Dados de Entrada (Payload do Formulário):

civilName: string, obrigatório (mínimo 2, máximo 70 caracteres)

socialName: string, opcional (aceita string vazia ou nulo)

birthDate: string / Date, obrigatório (formato ISO/data)

cpf: string, obrigatório (mínimo 11 caracteres)

rg: string, obrigatório (não vazio)

pronouns: Pronouns[], obrigatório (array com pelo menos 1 item)

genderId: string (UUID), obrigatório

sexualityId: string (UUID), obrigatório

Dados de Saída (Retorno esperado):

Disparo da requisição POST /people via PersonHttpRepository.

Exibição de notificação visual via react-toastify (toast.success / toast.error) com a barra de progresso estilizada com o degradê (gradient) customizado.

Redirecionamento da navegação para a rota /user transportando o identificador ou os dados do perfil cadastrado.

Exceções / Erros Esperados:

Erros de Validação Inline: Bloqueio pelo Zod no client-side com exibição de mensagens de erro abaixo de cada <CustomInput>.

Erros de API (400 Bad Request / 409 Conflict): Captura de exceções de CPF/RG duplicados ou IDs inválidos via isAxiosError, exibidos diretamente no Toast de erro.

4. Diretrizes Arquitetural Específicas
Isolamento: O componente PersonRegistrationForm não acessa o cliente HTTP (Axios) diretamente; toda a comunicação é intermediada pelo hook useRegisterPerson, que depende da abstração PersonRepository.

Injeção do Toast: O estilo da barra de progresso do react-toastify deve ser configurado de acorodo com o degradê (gradient) customizado usado no projeto.

Testes Obrigatórios: Testes unitários com Vitest para o PersonMapper.toPersistence e para a validação das regras do personRegistrationSchema.


-----
## 1. Diagnóstico da Causa Raiz
Analisando o código do seu PersonRegistrationForm.tsx em conjunto com o personRegistrationSchema.ts que corrigimos anteriormente, identificamos com precisão a razão dos dois comportamentos anômalos que você observou:

🔴 Causa Raiz 1: Por que o formulário não envia e nem exibe o console.log?
O react-hook-form integrado ao @hookform/resolvers/zod executa a validação do personRegistrationSchema antes de invocar a função onSubmit.

No nosso schema Zod, definimos como obrigatórios os seguintes campos:

- birthDate: Data de nascimento

- cpf: Cadastro de Pessoa Física

- rg: Registro Geral

O Erro: No JSX do seu PersonRegistrationForm.tsx, esses três campos (birthDate, cpf, rg) não existem visualmente. Quando você clica no botão "Enviar com segurança", o Zod valida o formulário, detecta que birthDate, cpf e rg estão como undefined e bloqueia silenciosamente a execução do onSubmit.

🔴 Causa Raiz 2: Por que o CustomSelect exibe o UUID (ID) no lugar do Label?
O componente <CustomSelect> está recebendo o valor do field.value via Controller (que guarda o ID do gênero/sexualidade, ex: "c8f1a2..."). Se a implementação interna do <CustomSelect> renderiza o texto do botão com base direta na propriedade value em vez de buscar o label correspondente dentro do array options (options.find(opt => opt.value === field.value)?.label), o componente imprime o ID bruto na tela.

🔴 Causa Raiz 3: Ausência de Feedback Visual (Toast) e Dados Mockados
O formulário consome MOCK_GENDERS e MOCK_SEXUALITIES estáticos e o hook useRegisterPerson não dispara notificações visuais (Toast) para informar o sucesso ou erro retornado pela API NestJS.

## 2. Desenho da Solução Arquitetural
Para resolvermos isso seguindo as boas práticas da Clean Architecture no Next.js:

1. Inclusão dos Campos Faltantes no Formulário:
Adicionar os componentes <CustomInput> para birthDate, cpf e rg no layout JSX.

2. Correção do Componente <CustomSelect>:
Ajustar a lógica interna do CustomSelect para garantir que o texto exibido seja o label selecionado, mantendo o value (UUID) no estado do formulário.

3. Mecanismo de Notificação (Toast):
Adicionar tratamento com biblioteca de Toast (ex: react-toastify ou sonner) dentro do fluxo do useRegisterPerson ou no onSubmit.

4. Substituição de Mocks por Chamada Real de Opções:
Buscar as identidades de gênero e orientações sexuais cadastradas na API em vez de usar arquivos de mock estáticos.

5. Retorno de Dados na Tela do Usuário:
Após o cadastro bem-sucedido via POST /people, redirecionar ou exibir o perfil cadastrado (PersonDetailResponse) retornado pelo PersonPresenter.toDetailHTTP.

## 3. Plano de Ação Passo a Passo
Passo 1: Atualizar o JSX do Formulário (PersonRegistrationForm.tsx)
Adicionar os campos obrigatórios de birthDate, cpf e rg para liberar a validação do Zod:

{/* Novos campos adicionados para satisfazer o Zod Schema */}
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

# Passo 2: Diagnosticar e Corrigir o Componente <CustomSelect>

Verificar se no componente CustomSelect.tsx a renderização do gatilho do Select faz a busca do rótulo:

// Exemplo de boa prática dentro do CustomSelect:
const selectedOption = options.find((opt) => opt.value === value);
const displayLabel = selectedOption ? selectedOption.label : placeholder;

# Passo 3: Implementar Feedback Visual no Hook useRegisterPerson
Ajustar a mutation/hook do cadastro para notificar o resultado:

// Exemplo no hook de registro:
import { toast } from "react-toastify"; // ou sonner

export function useRegisterPerson() {
  const repository = new PersonHttpRepository();

  const register = async (data: PersonRegistrationFormData) => {
    try {
      await repository.save(data);
      toast.success("Pessoa cadastrada com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao cadastrar pessoa.");
    }
  };

  return { register, isLoading };
}