1. O Alvo Principal: DataCollectionForm
Este é o nosso paciente zero. Ao invés de um formulário que faz tudo, nós vamos dissecá-lo nas seguintes camadas dentro de apps/web/src/:

Domain: Vamos criar os arquivos de entidade e os esquemas de validação (ex: garantir que o Nome Social seja obrigatório e formatado corretamente) independentes de qualquer biblioteca visual.

Application: Vamos extrair todos os useState, useEffect e lógicas de submissão do formulário para um Custom Hook (ex: useCreatePerson). É ele quem vai orquestrar o fluxo, deixando o componente React "burro" e focado apenas em renderizar o Tailwind.

Components: Vamos quebrar o formulário em pedaços menores e reaproveitáveis, separando os inputs de texto e os selects.

2. A Camada de Infraestrutura: Serviços Atuais
Eu vi que você já tem uma pasta services com api.ts e personService.ts. Essa foi uma ótima iniciativa de separação, mas para encaixar no padrão de Arquitetura em Camadas/DDD, nós vamos migrar e renomear esses arquivos:

Eles vão para src/infrastructure/http/.

O personService.ts se transformará na implementação de um Repository no front-end, focado puramente em pegar os dados da API e traduzi-los (através de DTOs) para o que a nossa camada de Aplicação entende.


## O Nosso Mapa de Refatoração (A Lista de Passos)
Seguindo a lógica de fatiar o problema, aqui está a ordem exata dos arquivos e componentes que vamos atacar juntos:

- O Formulário Principal (DataCollectionForm): Isolar a lógica de submissão e o estado.

- O Repositório HTTP: Refatorar o personService.ts para dentro de infrastructure/http/personRepository.ts.

- O Hook Orquestrador (useCreatePerson): Criar a ponte (camada de Application) entre o formulário e o repositório.

- Inputs Reutilizáveis: Fatiar os campos do formulário em componentes isolados (ex: SocialNameInput, GenderSelect).

- Os Componentes de Gráficos e Layout (DataVisualization, PrivacyCard, etc.): Limpar qualquer requisição ou lógica solta que a IA tenha embutido neles, aplicando a mesma regra de criar Custom Hooks se eles consumirem dados reais.