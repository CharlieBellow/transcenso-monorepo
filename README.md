# 🏳️‍⚧️ TransCenso — Ecossistema de Inclusão e Dados

O **TransCenso** é um ecossistema de software focado em mapear, dar visibilidade e proteger a população Trans e Travesti. Este repositório apresenta um **MVP/Recorte estrutural** focado em um sistema de cadastro inclusivo e seguro, mitigando a violência simbólica que a maioria das plataformas tradicionais perpetua.

---

## 💡 A Filosofia do Projeto: UX Inclusiva & Dignidade

A modelagem de dados deste projeto foi desenhada para colocar a dignidade humana como regra de negócio central:

- **Precedência do Nome Social:** O Nome Social é a estrela de todas as interfaces e listagens do sistema. O Nome Civil é tratado como dado estritamente sensível/administrativo e fica protegido.
- **Modelagem de Gênero e Sexualidade Flexível:** Substituição do campo rígido binário de "Sexo" por entidades independentes de `Gender` e `Sexuality`, contando com opções abertas ("Outro") para autoidentificação.
- **Pronomes como Cidadãos de Primeira Classe:** Armazenamento e uso ativo de pronomes para comunicações e saudações automatizadas personalizadas.

---

## 🏗️ Arquitetura e Engenharia de Software

Para garantir que as regras de dignidade humana fossem intrínsecas e imutáveis, o projeto foi desenvolvido seguindo os padrões mais rigorosos do mercado:

- **Monorepo Estruturado:** Gerido com `pnpm workspaces` para isolamento completo entre as aplicações.
- **Backend (NestJS) com DDD (Domain-Driven Design):** As regras de negócio e validações de respeito à identidade estão blindadas na camada de Domínio, independentemente de frameworks ou bancos de dados.
- **Persistência Robustecida:** Uso de **Prisma ORM** sobre uma base **PostgreSQL** rodando em ambiente isolado via Docker.
- **Frontend (Next.js):** Interface moderna utilizando o App Router e Tailwind CSS, consumindo a API de forma assíncrona e performática.

---

## 📈 Visão Macro (O Ecossistema Completo)

Este repositório reflete o núcleo de cadastro (Módulos `Person`, `Gender` e `Sexuality`). O projeto macro foi idealizado como um ecossistema modular para cobrir frentes de:

1. **Saúde e Segurança:** Mapeamento de vulnerabilidades regionais.
2. **Conceito de 'Responsável':** Modelagem robusta para permitir o cadastro e acompanhamento de pessoas trans em situação de rua ou sem acesso à internet por meio de agentes sociais de ligação.
3. **Prova de Vida Ativa:** Sistema de acompanhamento para combater a subnotificação histórica de violência e mortalidade.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js (v18+)
- pnpm (`npm i -g pnpm`)
- Docker & Docker Compose

### Instalação e Setup

1. Clone o repositório:

```bash
$ git clone [https://github.com/seu-usuario/transcenso-monorepo.git](https://github.com/seu-usuario/transcenso-monorepo.git)
cd transcenso-monorepo

2.Instale as dependências na raiz:

$ pnpm install

3. Suba o Banco de Dados (Docker):

$ docker compose up -d

4. Configure as migrações do Prisma (dentro de apps/api):

$ cd apps/api && npx prisma migrate dev && cd ../..

5. Execute o ecossistema em paralelo:

Backend: $ pnpm dev:api

Frontend: $ pnpm dev:web
```
