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
- O projeto não possui autenticação real, apenas identificação anônima para simplificar o fluxo de avaliação.
- O mobile será implementado na próxima etapa.

---

## Como rodar

...

---