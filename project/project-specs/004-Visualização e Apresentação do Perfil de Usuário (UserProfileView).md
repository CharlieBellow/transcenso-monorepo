# 004 - Visualização e Apresentação do Perfil de Usuário (UserProfileView)

## 1. Identificação da Tarefa
Nome da Feature: Visualização e Apresentação do Perfil de Usuário (UserProfileView)

Camada Afetada: Web / Frontend (apps/web/app/user)

## 2. Contexto e Objetivo
O que precisa ser feito: Estruturar a página existente em app/user para consumir e apresentar os dados detalhados da pessoa cadastrada (PersonDetailResponse), exibindo o nome de exibição (displayName), pronomes, gênero, sexualidade e dados de identificação.

Regra de Negócio Central: Garantir a prioridade do socialName sobre o civilName no título do perfil, mantendo os documentos sensíveis (cpf e rg) protegidos e formatados.

## 3. Contrato Técnico (Entradas e Saídas)
Dados de Entrada (Parâmetros / Estado):

id ou slug da pessoa cadastrada obtido via parâmetro de busca (searchParams), estado da rota, ou consulta ao endpoint GET /people/:id.

Dados de Saída (Retorno esperado):

Renderização do cartão de perfil contendo:

name: Nome de exibição principal (socialName || civilName)

civilName: Nome civil completo

pronouns: Pílulas/badges de pronomes

gender.title: Título da identidade de gênero

sexuality.title: Título da orientação sexual

birthDate: Data formatada no padrão brasileiro (DD/MM/AAAA)

Exceções / Erros Esperados:

404 Not Found: Exibição de componente de estado vazio (Empty State) informando que o perfil não foi localizado, com botão para retornar ao formulário de cadastro.

Estado de Carregamento: Exibição de Skeleton Screen enquanto a requisição GET /people/:id estiver em andamento.

4. Diretrizes Arquiteturais Específicas
Isolamento: A busca de dados deve utilizar o padrão de repositório (PersonHttpRepository.findById) ou reusar o resultado retornado do POST /people, garantindo que o componente visual apenas leia o DTO pronto.

Privacidade por Design: O CPF deve ser exibido mascarado por padrão (ex: ***.456.789-**) na tela do perfil.

Testes Obrigatórios: Testes unitários com Vitest para garantir que o componente de visualização renderiza o fallback do nome civil corretamente caso o nome social seja nulo.