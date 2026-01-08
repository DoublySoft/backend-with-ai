# Backend with AI - NestJS Backend

Scalable backend built with NestJS, TypeScript, and modular architecture. Designed to support both scalable monolithic architecture and microservices in a monorepo.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Initial Setup](#initial-setup)
- [Development](#development)
- [Testing](#testing)
- [Documentation](#documentation)
- [Roadmap](#roadmap)

## 🚀 Features

### Implemented ✅

- **Authentication and Authorization**

  - JWT with Passport (local and JWT strategies)
  - Role-based system (RBAC)
  - Email and phone verification
  - Password recovery
  - Guards for authentication and authorization

- **Database**

  - PostgreSQL with Prisma ORM
  - Native MongoDB for events and notifications
  - Soft deletes and auditing
  - Controlled migrations

- **Communication**

  - Event system with @nestjs/event-emitter
  - Email notifications (Mailjet)

- **Observability**

  - Centralized logging
  - Sentry integration for error tracking
  - PostHog for analytics and telemetry

- **Testing**

  - Jest for unit tests
  - Supertest for E2E tests
  - Mocks and fixtures

- **Code Quality**
  - ESLint + Prettier
  - Husky + lint-staged
  - TypeScript with strict typing

### Planned ⏳

- Redis caching
- Queues with RabbitMQ / Kafka
- SMS (Twilio)
- Push notifications (Firebase/OneSignal)
- Centralized logging with Elastic Stack
- Monitoring with Prometheus, Grafana, and Datadog

## 🛠️ Tech Stack

### Core

- **TypeScript** - Strictly typed language
- **NestJS** - Main framework
- **Prisma** - ORM for PostgreSQL
- **MongoDB** - Native database for documents

### Security

- **@nestjs/jwt** - JWT authentication
- **@nestjs/passport** - Authentication strategies
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **class-transformer** - Data transformation

### Testing

- **Jest** - Testing framework
- **@nestjs/testing** - Testing utilities for NestJS
- **supertest** - HTTP API testing

### Observability

- **@sentry/nestjs** - Error tracking and profiling
- **posthog-node** - Analytics and feature flags

### Notifications

- **node-mailjet** - Transactional emails

### Development

- **@nestjs/cli** - NestJS CLI
- **ts-node** - TypeScript execution
- **ESLint** - Linter
- **Prettier** - Code formatter
- **Husky** - Git hooks
- **lint-staged** - Linting on commits

## 🏗️ Architecture

### Principles

- **Clean Architecture** - Layer separation
- **Domain-Driven Design** - Domain-oriented design
- **SOLID** - Design principles
- **Monorepo** - Microservices in a single repository

### Layers

```bash
Controller → Service → Repository → Database
     ↓          ↓           ↓
   DTOs      Use Cases   Entities
```

### Modular Structure

- **Domain-based modules** (users, auth, projects, etc.)
- **Layer separation**: Controller, Service, Repository, DTOs, Entities
- **Shared libraries** in `libs/`
- **Applications** in `apps/`

## 📁 Project Structure

```bash
backend-with-ai/
├── apps/
│   └── api-gateway/          # Main API Gateway
│       ├── src/
│       │   ├── auth/          # Authentication module
│       │   ├── users/         # Users module
│       │   ├── companies/     # Companies module
│       │   ├── projects/      # Projects module
│       │   └── ...
│       └── test/              # E2E tests
├── libs/
│   ├── common/                # Common utilities
│   ├── contracts/             # Shared contracts and DTOs
│   ├── database/              # Database services
│   ├── environment/           # Environment configuration
│   ├── events/                # Event system
│   ├── observability/         # Observability (Sentry, PostHog)
│   └── notifications/         # Notification system
├── prisma/
│   ├── schema.prisma          # Prisma schema
│   └── migrations/            # Migrations
├── docs/                      # Documentation
└── .cursor/                   # Cursor rules and configuration
```

## ⚙️ Initial Setup

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (or use Docker)
- MongoDB (or use Docker)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd backend-with-ai

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configurations

# Start services with Docker
npm run docker:up

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run data:seed
```

### Environment Variables

See `.env.example` for the complete list of required variables.

Main variables:

- `POSTGRES_URI` - PostgreSQL connection URI
- `MONGODB_URI` - MongoDB connection URI
- `JWT_SECRET` - JWT secret
- `JWT_EXPIRE` - Token expiration time
- `MAILJET_API_KEY` - Mailjet API key
- `MAILJET_API_SECRET` - Mailjet API secret
- `SENTRY_DSN` - Sentry DSN
- `POSTHOG_API_KEY` - PostHog API key

## 💻 Development

### Available Commands

```bash
# Development
npm run start:dev          # Start in development mode with hot reload

# Build
npm run build              # Build the project

# Testing
npm run test               # Run unit tests
npm run test:watch         # Tests in watch mode
npm run test:cov           # Tests with coverage
npm run test:e2e           # End-to-end tests

# Database
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Create and apply migrations
npm run prisma:studio       # Open Prisma Studio
npm run data:seed           # Seed database

# Docker
npm run docker:up           # Start containers
npm run docker:down         # Stop containers
npm run docker:logs         # View logs

# Code quality
npm run lint                # Run ESLint
npm run format               # Format code with Prettier
npm run type:check          # Verify TypeScript types
```

### Hot Reload

The project is configured with hot reload using `nest start --watch`.

### Module Structure

Each module follows the Clean Architecture structure:

```bash
module-name/
├── module-name.module.ts
├── application/
│   ├── services/
│   │   └── module-name.service.ts
│   ├── use-cases/
│   │   └── module-name.use-case.ts
│   └── mappers/
│       └── module-name.mapper.ts
├── domain/
│   ├── entities/
│   │   └── module-name.entity.ts
│   ├── repositories/
│   │   └── module-name.repository.ts
│   └── events/
│       └── module-name-created.event.ts
└── infrastructure/
    ├── controllers/
    │   └── module-name.controller.ts
    ├── repository/
    │   └── mock-module-name.repository.ts
    └── transformers/
        └── module-name.transformer.ts
```

## 🧪 Testing

### Testing Strategy

- **Unit Tests** (70%): Services, mappers, entities
- **Integration Tests** (20%): Interactions between services
- **E2E Tests** (10%): Complete user flows

### Run Tests

```bash
# All tests
npm run test:all

# Unit tests only
npm run test

# E2E tests only
npm run test:e2e

# With coverage
npm run test:cov
```

### Test Structure

- Unit tests: `*.spec.ts` (co-located with code)
- E2E tests: `apps/api-gateway/test/*.e2e-spec.ts`
- Mocks: `infrastructure/repository/mock-*.repository.ts`

## 📚 Documentation

### Available Documentation

- [Architecture Guides](./docs/architecture/README.md)
- [Database Guides](./docs/database/README.md)
- [Testing Guides](./docs/testing/README.md)
- [Security Guides](./docs/security/README.md)
- [API Documentation](./docs/api/README.md)

### Project Rules

Project rules and standards are in `.cursor/rules/`:

- `backend-architecture-guidelines.mdc` - Architecture and patterns
- `backend-folder-structure-guidelines.mdc` - Folder structure
- `auth-strategy-guidelines.mdc` - Authentication strategies
- `database-schema-guidelines.mdc` - Database design
- `dependencies-guidelines.mdc` - Dependencies and tools
- `testing-strategy-guidelines.mdc` - Testing strategy
- `response-types-guidelines.mdc` - Response types

## 🗺️ Roadmap

### Phase 1 - Users & Access ✅ (In Development)

**Authentication Endpoints:**

- `POST /auth/register` - User registration
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh-token` - Refresh token
- `POST /auth/password-reset-request` - Request password reset
- `POST /auth/password-reset` - Complete password reset
- `GET /auth` - Get profile
- `PATCH /auth` - Update profile
- `DELETE /auth` - Delete account

**Admin Endpoints:**

- `POST /admin/users` - Create user (admin)
- `GET /admin/users/:id` - Get user (admin)
- `PATCH /admin/users/:id` - Edit user (admin)
- `DELETE /admin/users/:id` - Delete user (admin)
- `GET /admin/users` - List users (admin)

### Phase 2 - Companies and Projects ⏳

- Company management
- Project management
- Collaborators and permissions

### Phase 3 - Optimization ⏳

- Redis caching
- Queues with RabbitMQ/Kafka
- Query optimization
- Advanced monitoring

## 🤝 Contributing

1. Create a branch from `main`
2. Make changes following the project guidelines
3. Run tests and verify they pass
4. Create a Pull Request

## 📝 License

[Specify license]

## 📞 Contact

[Contact information]
