## 1. Identificação
- ID: 001-infra-database-mock
- Nome: Estratégia de Persistência (PostgreSQL + In-Memory/JSON-Server Mock)
- Camadas Afetadas: infra/database, infra/repositories, apps/api/src/modules

# 2. Contexto e Objetivo
- Objetivo: Manter a modelagem oficial em PostgreSQL (@prisma/adapter-pg com suporte nativo a arrays e enums), mas prover uma alternativa leve para desenvolvimento/demonstração local sem dependência do Docker.

- Estratégia de Engenharia:

O arquivo schema.prisma permanece configurado para PostgreSQL em ambiente de produção/integração.

Na camada de infraestrutura da API, é criado um repositório mockado em memória (InMemoryPersonRepository), permitindo subir o backend localmente sem banco rodando.

No NestJS, a troca entre o banco real e o mock ocorre via Provider Token de injeção de dependência (PERSON_REPOSITORY).

# 3. Contrato Técnico e Mapeamento de Dados
## 3.1. Convenção de Nomenclatura no Banco de Dados
Banco de Dados (PostgreSQL): Colunas físicas obrigatoriamente em snake_case (usando @map e @@map no Prisma).

Código TypeScript (Backend e Frontend): Estritamente em camelCase.

## 3.2. Estrutura do schema.prisma (PostgreSQL)

enum Pronouns {
  ELE_DELE
  ELA_DELA
  ELU_DELU
  OUTROS
}

model Person {
  id          String     @id @default(uuid())
  civilName   String     @map("civil_name")
  socialName  String?    @map("social_name")
  birthDate   DateTime   @map("birth_date")
  cpf         String     @unique
  rg          String
  slug        String     @unique
  pronouns    Pronouns[]
  genderId    String     @map("gender_id")
  sexualityId String     @map("sexuality_id")
  createdAt   DateTime   @default(now()) @map("created_at")

  @@map("people")
}

# 4. Plano de Execução
Mantém-se o PrismaPersonRepository ajustado com o PrismaPersonMapper para persistência real em PostgreSQL.

Cria-se o InMemoryPersonRepository implementando a interface PersonRepository do domínio.

No PersonModule do NestJS, expõe-se o provider dinâmico:
{
  provide: 'PERSON_REPOSITORY',
  useClass: process.env.USE_MOCK_DB === 'true' 
    ? InMemoryPersonRepository 
    : PrismaPersonRepository
}