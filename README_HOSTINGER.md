# Deploy na Hostinger (Business / Web app Node.js)

Este repositório contém **Frontend (Vite)** na raiz e **Backend (Express + Prisma + Mercado Pago)** em `server/`.

## Importante sobre o arquivo de entrada (503 / ERR_REQUIRE_ESM)

Em alguns servidores da Hostinger (LiteSpeed/lsnode), o arquivo de entrada é carregado via **`require()`**.
Como o projeto está em **ESM** (`"type": "module"`), carregar `server.js` por `require()` pode dar **ERR_REQUIRE_ESM** e virar **503**.

Por isso este projeto inclui:
- **`server.cjs`** (CommonJS) → **use este como Arquivo de entrada na Hostinger**
- **`server.js`** (ESM) → loader que faz `process.chdir('./server')` e importa `./server/src/index.js`

## Configuração recomendada na Hostinger

### App Node.js
- Framework: **Express**
- Versão do Node: **18.x** (ou 20.x)
- Diretório raiz: **./**
- **Arquivo de entrada: `server.cjs`**
- Gerenciador de pacotes: **npm**

### Variáveis de ambiente (exemplo)
- `DATABASE_URL` = `mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO`
- `JWT_SECRET` = `uma-chave-grande`
- `ADMIN_EMAIL` e `ADMIN_PASSWORD`
- `MP_ACCESS_TOKEN`
- `PUBLIC_BASE_URL` = `https://SEU_DOMINIO`
- `CORS_ORIGIN` = `https://SEU_DOMINIO`

## Banco (Prisma)
Após o deploy, rode (via SSH/Terminal do hPanel):

```bash
cd ~/domains/SEU_DOMINIO/nodejs/server
npx prisma db push
npm run seed
```

## Frontend
- O build do Vite fica em `dist/` na raiz.
- O backend serve o `dist/` e faz fallback para SPA (sem engolir `/api`).
