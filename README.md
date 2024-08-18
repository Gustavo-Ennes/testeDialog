# Challenge for developers - Technical Assessment

## Descrição Geral

Este repositório contém um desafio técnico para desenvolvedores de diferentes níveis (Júnior, Pleno e Sênior). O objetivo é construir uma aplicação de perfil de usuário com uma timeline (feed) onde os usuários possam criar postagens e interagir com reações, como curtidas. O desafio está estruturado em diferentes níveis de complexidade, permitindo avaliar habilidades em desenvolvimento frontend e backend.

## Níveis de Experiência

### Nível Pleno

#### Requisitos Adicionais
- **Frontend Avançado:** Já feito em nextjs no nível jr.
  - Interface mais rica animate.css e fontawesome.
- **Banco de Dados:** Integração com um banco de dados relacional (ex: PostgreSQL).
  - Persistidos dados de usuários, postagens e reações (curtidas).
- **Cache:** Cache implementado.
- **Testes de Integração:** Testes de integração com jest e supertest para todas as rotas

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


