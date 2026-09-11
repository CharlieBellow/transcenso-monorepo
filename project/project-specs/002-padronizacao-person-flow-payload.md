# 1. Identificação
ID: 002-person-flow-payload
Nome: Padronização do Fluxo de Dados de Person, Nome Derivado e Minimização de Payloads
Camadas Afetadas: domain/entities, application/useCases, infra/http/controllers, infra/http/presenters, apps/web/infra

# 2. Contexto e Regras de Negócio
## 2.1. Regra do Nome Derivado (name)
Ambos os campos civilName e socialName devem ser persistidos no banco.Ao retornar os dados para o usuário/frontend, o campo name é obrigatoriamente calculado:
- Se socialName estiver preenchido e não for vazio $\rightarrow$ name = socialName.
- Se socialName for nulo ou vazio $\rightarrow$ name = civilName.
Esta regra pertence ao Domínio (Entidade Person), através de um getter displayName.

## 2.2. Minimização de Payload (Respostas da API)
- Listagens (GET /people): Retornam um payload resumido contendo apenas informações públicas essenciais para cartões e tabelas. Não expõem CPF, RG, data de nascimento ou nomes separados.
- Detalhe do Perfil (GET /people/:id): Retorna o payload completo do recurso com todas as informações cadastradas.

## 2.3. Unificação de Rota e Mapeamentos
Rota Canônica: Estritamente /people (remover referências e arquivos que utilizam /persons).
Formato dos Dados: Todas as DTOs e Mappers de entrada/saída no TypeScript usam camelCase.

# 3. Especificação do Contrato de API3.1. Entrada: Cadastro (POST /people)

// DTO de Entrada (Frontend -> API NestJS)
export interface CreatePersonRequest {
  civilName: string;
  socialName?: string;
  birthDate: string; // ISO string
  cpf: string;
  rg: string;
  pronouns: Pronouns[];
  genderId: string;
  sexualityId: string;
}

## 3.2. Saída Resumida: Listagem (GET /people)

// Contract Payload Resumido
export interface PersonSummaryResponse {
  id: string;
  name: string; // socialName || civilName
  pronouns: Pronouns[];
  gender: { id: string; title: string };
  sexuality: { id: string; title: string };
}

## 3.3. Saída Detalhada: Perfil (GET /people/:id)

// Contract Payload Completo
export interface PersonDetailResponse {
  id: string;
  name: string; // socialName || civilName
  civilName: string;
  socialName?: string | null;
  birthDate: Date;
  cpf: string;
  rg: string;
  slug: string;
  pronouns: Pronouns[];
  gender: { id: string; title: string; acronym: string };
  sexuality: { id: string; title: string; acronym: string };
}

# 4. Passo a Passo de Implementação por Camadas

## Passo 1: Domínio Backend (apps/api/src/domain)

- 1. Na Entidade Person:

Garantir a propriedade computada de exibição:

get displayName(): string {
  return this.props.socialName && this.props.socialName.trim().length > 0
    ? this.props.socialName.trim()
    : this.props.civilName;
}

Atualizar o método toDTO() para garantir o retorno de name: this.displayName, civilName e socialName.

- 2. Criar os testes unitários (person.spec.ts) validando se o displayName retorna socialName quando presente e civilName como fallback.

## Passo 2: Presenter HTTP (apps/api/src/infra/http/presenters)
Ajustar o PersonPresenter para ter dois métodos estáticos distintos:

- 1. PersonPresenter.toSummaryHTTP(person: PersonDTO): Para a listagem (GET /people), omitindo documentos sensíveis.

- 2. PersonPresenter.toDetailHTTP(person: PersonDTO): Para a consulta individual (GET /people/:id).

export class PersonPresenter {
  static toSummaryHTTP(person: PersonDTO): PersonSummaryResponse {
    return {
      id: person.id,
      name: person.socialName || person.civilName,
      pronouns: person.pronouns,
      gender: { id: person.gender.id, title: person.gender.title },
      sexuality: { id: person.sexuality.id, title: person.sexuality.title },
    };
  }

  static toDetailHTTP(person: PersonDTO): PersonDetailResponse {
    return {
      id: person.id,
      name: person.socialName || person.civilName,
      civilName: person.civilName,
      socialName: person.socialName ?? null,
      birthDate: person.birthDate,
      cpf: person.cpf,
      rg: person.rg,
      slug: person.slug,
      pronouns: person.pronouns,
      gender: person.gender,
      sexuality: person.sexuality,
    };
  }
}

## Passo 3: Controllers NestJS (apps/api/src/infra/http/controllers):

1 - FindAllPersonController:

@Get()
async handle() {
  const people = await this.findAllPersonUseCase.execute();
  return people.map(person => PersonPresenter.toSummaryHTTP(person));
}

2 - FindByIdPersonController:
@Get(':id')
async handle(@Param('id') id: string) {
  const person = await this.findByIdPersonUseCase.execute(id);
  return PersonPresenter.toDetailHTTP(person);
}

3 -  CreatePersonController:
Padronizar para passar o resultado retornado pelo UseCase pelo PersonPresenter.toDetailHTTP(person).

## Passo 4: Frontend (apps/web/src)
1 - Remoção de Arquivo Obsoleto: Excluir o arquivo apps/web/src/infra/http/personRepository.ts que utilizava a rota /persons.
2 - Repositório HTTP: Manter exclusivamente o PersonHttpRepository configurado para chamar /people.
3- Mapper do Frontend (person-mapper.ts): Ajustar para converter os dados do formulário do React Hook Form mantendo todas as chaves do objeto payload em camelCase.

## 5. Critérios de Aceite e Testes (Diretrizes Globais)
Conforme as diretrizes de qualidade do projeto:
[ ] Teste Unitário (Domínio): Testar a criação de Person com e sem socialName no Vitest.
[ ] Teste Unitário (UseCase): Validar a execução do CreatePersonUseCase isolado com mocks.
[ ] Contrato HTTP: Garantir que o endpoint GET /people não exiba cpf, rg ou civilName.
[ ] Mapeamento: Garantir que o payload do POST /people seja recebido corretamente em camelCase pelo NestJS.