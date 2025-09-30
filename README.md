# Projeto MarketPlace FullStack
Implementação Simples de uma Loja Online (Login, Cadastro de Usuários, Produtos, Carrinho de Compras)

## 🚀 Tecnologias Utilizadas

### BACKEND
- **ExpressJS** - Framework Node.js para aplicações server-side
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **TypeScript** - Linguagem de programação
- **Multer** - Middleware para o Node.js para processamento de uploads de arquivos (imagens, documentos, etc.).
- **Bcrypt** - Biblioteca para hashing de senhas.
- **Nodemailer** - Biblioteca para envio de e-mails.

### FRONTEND
- **NextJS** - Framework React para criação de aplicações web.
- **ReactJS** - Biblioteca JavaScript para construção de interfaces de usuário.
- **Axios** - Cliente HTTP usado para realizar requisições assíncronas ao backend (API).
- **TailwindCSS** - Framework CSS.
- **JavaScript** - Linguagem de programação.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Banco de Dados
Crie um banco no PostgreSQL antes de rodar o projeto:

- ## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd marketplace/api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minha_api_db"

# JWT
JWT_SECRET="seu-jwt-secret-aqui"
JWT_EXPIRES_IN="7d"

# Application
PORT=3001

# Mailer

HOST_MAIL="smtp.ethereal.email"
HOST_PORT="587"
HOST_USER="chaya.russel29@ethereal.email"
HOST_PASS="148muzCgn2G46JxxUz"
```
