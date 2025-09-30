# Projeto Marketplace FullStack
Aplicação desenvolvida com NextJS e NodeJS para um sistema de markeplace (Login, Cadastro de Usuários, Produtos, Carrinho de Compras)

## 🚀 Tecnologias Utilizadas

#### BACKEND
- **ExpressJS** - Framework Node.js para aplicações server-side
- **Prisma** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **TypeScript** - Linguagem de programação
- **Multer** - Middleware para o Node.js para processamento de uploads de arquivos (imagens, documentos, etc.).
- **Bcrypt** - Biblioteca para hashing de senhas.
- **Nodemailer** - Biblioteca para envio de e-mails.

#### FRONTEND
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

## 🖥️ <CONFIGURAÇÃO DO BACKEND></>

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

### 4. Definindo bando de dados

No explorador do PosgresSQL:
- Vá em:
```
Servers
   └── PostgreSQl
           └── Databases
```
- Clique com o botão direto e crie o seu Database (Defina um nome. Ex: `minha_api_db`)
- Criar um usuário `postgres` com senha `postgres`

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev --name migracao_inicial
```

## 📊 Banco de Dados

### Comandos do Prisma

```bash
# Visualizar o banco de dados no Prisma Studio
npx prisma studio

# Resetar o banco de dados
npx prisma migrate reset

# Gerar o cliente Prisma
npx prisma generate

# Aplicar migrações pendentes
npx prisma migrate deploy

# Puxa as informações do Database para atualizar o prisma caso esse esteja desatualizado 
npx prisma db pull

# Envia as informações do prisma para atualizar o Database no postgres caso esse esteja desatualizado 
npx prisma db push
```

## 🚀 Como Executar o Projeto

```bash
npm run dev
```

### Estrutura do Banco

O projeto utiliza as seguintes tabelas principais:
- **users** - Usuários do sistema (ADMIN/USER)
- **products** - Produtos do marketplace
- **carts** - Carrinhos de compra dos usuários
- **product_in_carts** - Relação entre produtos e carrinhos

### Porta já em uso

Se a porta 3001 estiver em uso, altere a variável `PORT` no arquivo `.env` ou pare o processo que está usando a porta.

## 📝 Estrutura do Projeto

```
marketplace/api/
├── src/                # Código fonte da aplicação
├── prisma/             # Schema e migrações do banco
├── uploads/            # Arquivos enviados
└── package.json        # Dependências e scripts
```

## 🤓 <CONFIGURAÇÃO DO FRONTEND></>

### 1. Abra a pasta frontend

```bash
cd marketplace/frontend
```

### 2. Instale as dependências

```bash
npm install
```

### Scripts Diponíveis

```bash
# Roda o projeto em modo desenvolvimento (hot reload)
npm run dev

# Compila o projeto para produção
npm run build

# Inicia o projeto em modo produção
npm run start

# Roda o ESLint para verificar padrões de código
npm run lint
```

## 📝 Estrutura do Projeto

```
marketplace/frontend/
├── app/                # Código fonte da aplicação
├── components/         # Código do cabeçalho e rodapé
├── public/             # Arquivos públicos
├── service/            # COnfiguração do Axios
└── package.json        # Dependências e scripts
```

## 📄 Licença

Este projeto está sob a licença MIT.
