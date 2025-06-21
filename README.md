# N8 Test Ecommerce Devnology

## Visão Geral

Este projeto é um e-commerce simples, criado para fins de teste técnico, com foco em boas práticas de arquitetura, organização de código e uso de tecnologias modernas. O sistema é composto por três frentes: **backend (API)**, **frontend (Web)** e **mobile (Flutter)**.

---

## Tecnologias Utilizadas

### Backend (NestJS + Prisma + SQLite)

- **NestJS**  
  Framework Node.js para construção de APIs escaláveis e organizadas, baseado em TypeScript e arquitetura modular.  
  **Motivo da escolha:**  
  - Estrutura clara de módulos, controllers e services.
  - Suporte nativo a TypeScript.
  - Facilidade para testes e manutenção.

- **Prisma ORM**  
  ORM para Node.js e TypeScript, utilizado para modelar e manipular o banco de dados de forma segura e produtiva.  
  **Motivo da escolha:**  
  - Migrações automáticas e seguras.
  - Tipagem forte e autocomplete no código.
  - Facilidade para trocar de banco de dados (usando SQLite para testes, mas facilmente migrável para Postgres).

- **SQLite**  
  Banco de dados leve, baseado em arquivo, ideal para testes e desenvolvimento local.  
  **Motivo da escolha:**  
  - Não exige instalação de servidor de banco.
  - Simples de versionar e compartilhar.
  - Suficiente para um projeto de teste sem autenticação real.

---

### Frontend (React + Vite)

- **React**  
  Biblioteca para construção de interfaces de usuário reativas e componentizadas.  
  **Motivo da escolha:**  
  - Ampla utilização no mercado.
  - Suporte nativo a TypeScript.
  - Facilidade para criar componentes reutilizáveis.

- **Vite**  
  Ferramenta de build e desenvolvimento rápido para projetos frontend modernos.  
  **Motivo da escolha:**  
  - Inicialização instantânea do projeto.
  - Hot reload eficiente.
  - Configuração mínima.

- **Tailwind CSS**  
  Framework utilitário para estilização rápida e responsiva.  
  **Motivo da escolha:**  
  - Permite prototipação rápida.
  - Facilita a manutenção do CSS.
  - Visual moderno e responsivo sem dependência de componentes prontos.

---

### Integração Frontend/Backend

- Comunicação via **REST API** usando `fetch`.
- Identificação do usuário anônimo via `localStorage` (`anonUserId`).

---

## Estrutura do Projeto

```
/
├── backend-api/   # API NestJS + Prisma + SQLite
├── web/           # Frontend React + Vite + Tailwind
├── mobile/        # Aplicativo Mobile em Flutter
```

---

## Observações

- O backend foi estruturado para ser facilmente adaptável para outros bancos de dados (Postgres, MySQL) via Prisma.
- O frontend foi desenvolvido para ser responsivo e fácil de manter.
- O mobile foi desenvolvido em Flutter
- O projeto não possui autenticação real, apenas identificação anônima para simplificar o fluxo de avaliação.

---

## Como rodar

### Pré-requisitos

- Node.js (recomendado v18+)
- npm ou yarn
- Flutter (recomendado 3.10+)
- Android Studio para emulador ou dispositivo físico com depuração USB
- Criar um arquivo .env no backend-api com a url presente no .env_example
---

> **Atenção:**  
> Para que o frontend web e o app mobile consigam acessar o backend, é necessário alterar o endpoint da API para o IP da sua máquina na rede local.
>
> - **Web:**  
>   Edite o arquivo `web/src/utils/api.js` e troque `http://127.0.0.1:3000` pelo IP da sua máquina (ex: `http://192.168.x.x:3000`).
>
> - **Mobile (Flutter):**  
>   Edite o arquivo `mobile/lib/utils/api_constants.dart` e troque `http://127.0.0.1:3000` pelo IP da sua máquina (ex: `http://192.168.x.x:3000`).
>

### 1. Backend (NestJS + Prisma + SQLite)

```bash
cd backend-api

# Instale as dependências
npm install

# Rode as migrations do Prisma (garante que o banco está atualizado)
npx prisma migrate dev

# Gere o client do Prisma (opcional, mas recomendado)
npx prisma generate

# Inicie o servidor
npm run start
```

O backend estará disponível em `http://localhost:3000`.

---

### 2. Web (React + Vite)

```bash
cd web

# Instale as dependências
npm install

# Inicie o frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (ou porta informada pelo Vite).

---

### 3. Mobile (Flutter)

```bash
cd mobile

# Instale as dependências do Flutter
flutter pub get

# Rode o app em um emulador ou dispositivo físico
flutter run
```

> **Atenção:**  
> Para testar o mobile, certifique-se de que o backend está acessível pelo IP da sua máquina na rede local.  
> No código mobile, altere os endpoints de API para usar o IP da sua máquina (ex: `http://192.168.x.x:3000`) em vez de `localhost`.

---

### Observações

- O projeto não possui autenticação real, apenas identificação anônima.
- O banco de dados SQLite é criado automaticamente na primeira execução do backend.
- Para resetar o banco, basta apagar o arquivo `backend-api/prisma/dev.db` e rodar as migrations novamente.

---

---