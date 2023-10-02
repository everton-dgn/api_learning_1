<h1 align="center">Boilerplate Node + Fastify</h1>

# :memo: Sobre o Projeto

Esta aplicação é um modelo para sistemas complexos e grandes, especialmente aqueles que precisam ser dimensionados com segurança e qualidade de código.

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
- pnpm última versão lts.

<br />

---

# :question: Como Utilizar

Clone o projeto e navegue até a pasta:

```bash
git clone https://github.com/everton-dgn/api_learning_1.git
cd api_learning_1
```

Instale as dependências:

```bash
pnpm i
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
pnpm dev
```

Produção:

```bash
pnpm build
pnpm start
```

<br />
