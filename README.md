# Challenge for developers - Technical Assessment

## Descrição Geral

Este repositório contém um desafio técnico para desenvolvedores de diferentes níveis (Júnior, Pleno e Sênior). O objetivo é construir uma aplicação de perfil de usuário com uma timeline (feed) onde os usuários possam criar postagens e interagir com reações, como curtidas. O desafio está estruturado em diferentes níveis de complexidade, permitindo avaliar habilidades em desenvolvimento frontend e backend.

## Níveis de Experiência

### Nível Júnior

#### Requisitos Concluídos
- **API RESTful:** Api REST nodejs foi criada.
  - Operações CRUD (Create, Read, Update, Delete) para os perfis feitas.
  - Endpoint para criação de postagens na timeline.
  - Endpoint para reagir a postagens com curtidas.
- **Frontend Básico:** Utilizar React ou Next.js para criar uma tela de perfil e uma timeline de postagens.
  - Exibir postagens na timeline com a capacidade de adicionar novas postagens e curtir.
- **Autenticação:** Implementar autenticação utilizando JWT, para todas as chamadas exceto login e signup.
- **Testes Unitários:** Testes unitários de rotas e funções de validação e utils.
- **Documentação:** Api documentada com Swagger.

#### Implementação Inicial (api-node && frontend-nextjs)
- **Dependências**: O projeto foi configurado para rodar com Node.js e SQLite.
- **Instruções de Uso**: 
  - Para rodar o projeto, utilize os scripts nas pastas `packages/api-node` e `frontend-nextjs`:
    ```bash
    npm run i
    npm run dev
    ```


