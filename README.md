<h1 align="center">Boilerplate Node + Fastify</h1>

# :memo: Sobre o Projeto

This application is a boilerplate for complex and large systems, especially those that need to scale with security and code quality.

---

# :pushpin: Indice

- [Tecnologias Utilizadas](#globe_with_meridians-tecnologias-utilizadas)
- [Pre Requisitos](#white_check_mark-pre-requisitos)
- [Como Utilizar](#question-como-utilizar)
- [Configuracao](#wrench-configuracao)
- [Execucao](#zap-execucao)

<br />

---

# :globe_with_meridians: Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Jest
- Supertest
- Lints: Husky, ESlint, Stylelint, Commitlint, Lint-Staged e Prettier
- Swagger and Swagger UI

<br />

---

# :white_check_mark: Pre Requisitos

- node última versão lts.
- yarn.

<br />

---

# :question: Como Utilizar

Clone o projeto e navegue até a pasta:

```bash
git clone https://github.com/everton-dgn/boilerplate_fastify.git
cd boilerplate_fastify
```

Instale as dependências:

```bash
yarn
```

<br />

---

# :wrench: Configuracao

Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente:

```
APP_PORT=5000
```

<br />

---

# :zap: Execucao

Disponível em `http://localhost:5000`.

Desenvolvimento:

```bash
yarn dev
```

Produção:

```bash
yarn build
yarn start
```

<br />
