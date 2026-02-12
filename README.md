# GoBarber API

GoBarber is a scheduling application for barber shops. This API serves the backend functionality, including user authentication, appointment scheduling, and provider availability.

## 🚀 Technologies

- Node.js
- TypeScript
- Express
- TypeORM (v0.3)
- PostgreSQL
- MongoDB
- Redis
- Docker
- AWS SDK v3 (S3, SES)

## 🛠️ Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v20+)
- Yarn

### 🐳 Running with Docker (Recommended)

1. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

2. Start the services:
   ```bash
   docker compose up -d
   ```

The API will be available at `http://localhost:3333`.

### 📚 API Documentation

Swagger documentation is available at:
`http://localhost:3333/api-docs`

### 🧪 Running Tests

```bash
yarn test
```

## 📝 Requirements (Legacy)



---

## Recuperação de Senha

---

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar envio de e-mail em ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano (background job)

**RN**

- O link enviado por e-mail para resetar senha, deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar sua senha

---

## Atualização do perfil

---

**RF**

- O usuário deve poder atualizar seu perfil nome, e-mail, senha

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar a senha, o usuário precisa confirmar sua nova senha

---

## Agendamento de serviços

---

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador
- O usuário deve poder realizar um agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agndamentos devem estar disponíveis entre8h às 18h (Primeiro 8h, Último 17h)
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar num horário que já passou
- O usuário não pode agendar serviços consigo mesmo

---

## Painel do Prestador

---

**RF**

- O prestador deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que receber um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve ter um status de lida ou não lida para controle do prestador
