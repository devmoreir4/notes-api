# 📌 API de Gerenciamento de Notas

<p align="justify">
Esta API é um backend desenvolvido com Node.js e Express para gerenciar notas, usuários, tags e links. A aplicação utiliza Knex.js para gerenciar consultas e migrações em um banco de dados PostgreSQL. Além disso, a API conta com uma documentação interativa gerada com Swagger.
</p>

## 💻 Tecnologias Utilizadas

- **JavaScript**: Linguagem utilizada para desenvolver a aplicação.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **Knex.js**: Query builder e ferramenta de migração SQL.
- **PostgreSQL**: Banco de dados relacional.
- **Swagger**: Ferramenta para gerar documentação interativa da API.
- **Docker e Docker Compose**: Utilizados para criar, gerenciar e orquestrar containers da aplicação.

## ✨ Funcionalidades

- **Gerenciamento de Usuários**: Criação, atualização, recuperação e exclusão de usuários.
- **Gerenciamento de Notas**: Criação, listagem, recuperação e exclusão de notas.
- **Associação de Tags e Links**: Associação de notas com tags e links para melhor organização.
- **Busca Avançada**: Filtragem de notas por título (case-insensitive) e tags.
- **Migrações**: Gerenciamento de tabelas utilizando Knex.js (criação, rollback, etc.).

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (recomendado: versão 14 ou superior)
- PostgreSQL instalado e configurado
- Docker e Docker Compose instalados

### Execução sem Docker

1.  Clone o repositório:

    ```ssh
    git clone https://github.com/devmoreir4/notes-api.git
    cd notes-api
    ```

2.  Instale as dependências:

    ```ssh
    npm install
    ```

3.  Configure as variáveis de ambiente:<br>
    Crie um arquivo `.env` na raiz do projeto baseado no arquivo `.env.example`:

    ```ssh
    PORT=3000
    DB_CLIENT=pg
    DB_USER=devmoreir4
    DB_HOST=localhost
    DB_NAME=notes_db
    DB_PASSWORD=notes123
    DB_PORT=5432
    ```

4.  Crie o banco de dados e execute as migrações:
    - Crie o banco de dados no PostgreSQL (se ainda não existir):<br>
    - Pode ser criado via pgAdmin ou via Terminal (PSQL).
    ```ssh
    psql -U <username> -c "CREATE DATABASE notes_db;"
    ```
    - Execute as migrações para criar as tabelas:
    ```ssh
    npm run migrate
    ```
5.  Inicie o servidor:
    ```ssh
    npm start
    ```
6.  Acesse a API e a documentação:
    - A API estará disponível em: http://localhost:3000
    - A documentação pode ser acessada em: http://localhost:3000/api-docs

### Execução com Docker e Docker Compose

1.  Construa e inicie os containers:
    ```ssh
    docker-compose up --build
    ```
2.  Execute as migrações:
    ```ssh
    docker exec -it notes-api-dev npm run migrate
    ```
3.  Acesse a API e a documentação:
    - A API estará disponível em: http://localhost:3000
    - A documentação pode ser acessada em: http://localhost:3000/api-docs
    - O pgAdmin pode ser acessado em: http://localhost:8080
      - Com as credenciais: `admin@admin.com` e `admin123`
    - Para conectar ao banco, use:
        - Host: `db`
        - Porta: `5432`
        - Usuário: `devmoreir4`
        - Senha: `notes123`

## 📄 Documentação da API

A documentação interativa da API foi gerada com Swagger e pode ser acessada em: http://localhost:3000/api-docs

## 🔌 Endpoints

| **Método** | **Endpoint**      | **Descrição**                                                             |
| ---------- | ----------------- | ------------------------------------------------------------------------- |
| **POST**   | `/users`          | Cria um novo usuário (requere `name`, `email`, `password`).               |
| **PUT**    | `/users/:id`      | Atualiza os dados de um usuário específico (nome, email, senha, etc.).    |
| **GET**    | `/users/:id`      | Retorna os detalhes de um usuário (nome e email).                         |
| **DELETE** | `/users/:id`      | Exclui um usuário (todas as notas associadas a ele também são removidas). |
| **GET**    | `/tags/:user_id`  | Retorna todas as tags associadas a um usuário.                            |
| **POST**   | `/notes/:user_id` | Cria uma nova nota para um usuário (título, descrição, tags, links).      |
| **GET**    | `/notes/:id`      | Retorna os detalhes de uma nota (título, descrição, tags, links).         |
| **DELETE** | `/notes/:id`      | Exclui uma nota pelo seu ID.                                              |
| **GET**    | `/notes`          | Lista notas com base em parâmetros de busca (`title`, `tags`, `user_id`). |

## 📫 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir _issues_ ou enviar _pull requests_ para contribuir com o projeto.

## 📝 Licença

Este projeto está licenciado sob a [licença MIT](LICENSE).
