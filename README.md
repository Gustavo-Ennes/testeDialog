# Challenge for developers - Technical Assessment

## Descrição Geral

Este repositório contém um desafio técnico para desenvolvedores de diferentes níveis (Júnior, Pleno e Sênior). O objetivo é construir uma aplicação de perfil de usuário com uma timeline (feed) onde os usuários possam criar postagens e interagir com reações, como curtidas. O desafio está estruturado em diferentes níveis de complexidade, permitindo avaliar habilidades em desenvolvimento frontend e backend.

## Níveis de Experiência

### Nível Sênior

#### Requisitos Adicionais
- **WebSocket:** WebSocket implementado para criação de perfis
- **Monitoramento e Logs:** Logs implementados com winston salvando no banco.

#### Implementação Inicial (api-node && frontend-nextjs)
- **Dependências**: O projeto foi configurado para rodar com Node.js e postgreSQL.
- **Instruções de Uso**: 
  - Para rodar o projeto, utilize os scripts nas pastas `packages/api-node` e `frontend-nextjs`:
    1. Tenha docker e docker-compose instalados
    2. Preencha seu arquivo .env como as variáveis desejadas
    3. Rode os containeres

    ```bash
    docker-compose up --build
    ```


