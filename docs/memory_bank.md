# Memory Bank - Project Status

## 📌 General Information

**Project**: Backend with AI  
**Framework**: NestJS with TypeScript  
**Architecture**: Clean Architecture + Domain-Driven Design  
**Structure**: Monorepo (prepared for microservices)  
**Status**: Initial phase - Configuration and planning

## 🎯 Project Objective

Build a scalable backend with NestJS that supports:

- Modular architecture and Clean Architecture
- Compatibility with scalable monolith or microservices
- Layer separation (Controller, Service, Repository, DTOs, Entities)
- Robust authentication and authorization system
- Hybrid database (PostgreSQL + MongoDB)
- Event and notification system
- Complete observability

## 🏗️ Project Architecture

### Technology Stack

#### Language and Framework

- **TypeScript** with strict typing
- **NestJS** as main framework

#### Database

- **PostgreSQL** with Prisma ORM
- **MongoDB** native for events and documents

#### Security

- **JWT + Passport** (roles, local and external strategies)
- **class-validator** and **class-transformer** for validation

#### Testing

- **Jest + Supertest** for unit, integration and e2e tests

#### Communication

- **@nestjs/event-emitter** for internal events
- **Mailjet** for transactional emails
- [FUTURE] Redis for cache
- [FUTURE] RabbitMQ/Kafka for queues

#### Observability

- **Centralized logger** (nestjs-pino, winston)
- **Sentry** for error tracking and profiling
- **PostHog** for analytics and telemetry
- [FUTURE] Elastic Stack for centralized logging
- [FUTURE] Prometheus, Grafana and Datadog for monitoring

#### DevOps

- **Docker + Docker Compose**
- **@nestjs/config + Joi** for environments
- **ESLint, Prettier, Husky + lint-staged**
- **Hot reload** (ts-node-dev)
- **ApiDog** for documentation
- **GitHub Actions** for CI/CD

### Folder Structure

```bash
backend-with-ai/
├── apps/
│   └── api-gateway/          # Main API Gateway
│       ├── src/
│       │   ├── auth/         # Authentication module
│       │   ├── users/        # Users module
│       │   ├── companies/    # Companies module
│       │   ├── projects/     # Projects module
│       │   └── common/       # Common app utilities
│       └── test/             # E2E tests
├── libs/
│   ├── common/               # Common utilities
│   ├── contracts/            # Shared DTOs and contracts
│   ├── database/             # Database services
│   ├── environment/          # Environment configuration
│   ├── events/               # Event system
│   ├── observability/        # Observability (Sentry, PostHog)
│   └── notifications/        # Notification system
├── prisma/
│   ├── schema.prisma         # Prisma schema
│   ├── migrations/           # Migrations
│   └── seed/                 # Data seeds
├── docs/                     # Documentation
└── .cursor/                  # Cursor rules and configuration
```

### Architecture Principles

1. **Clean Architecture**

   - Layer separation: Controller → Service → Repository → Database
   - Dependencies inward
   - Framework independence

2. **Domain-Driven Design**

   - Domain entities
   - Repositories as interfaces
   - Domain events

3. **SOLID**

   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

4. **Monorepo**
   - Microservices in a single repository
   - Shared libraries
   - Compatible with scalable monolith

## 🔐 Security

### Authentication

- **JWT** with Passport
- **Strategies**: Local (email/password), JWT
- **Token refresh** mechanism
- **Email verification** required
- **Phone verification** optional

### Authorization

- **RBAC** (Role-Based Access Control)
- **Main roles**: ADMIN, PROFESSIONAL
- **Company roles**: OWNER, ADMIN, ARCHITECT, etc.
- **Project roles**: OWNER, MAIN_CONTRACTOR, etc.
- **Guards**: AuthGuard, AdminGuard, CompanyGuard, ProjectGuard

### Validation

- **class-validator** for DTOs
- **class-transformer** for transformation
- **Joi** for environment variable validation

## 🗄️ Database

### PostgreSQL (Prisma)

**Main entities:**

- User (with UserProProfile)
- Company (with normalized details)
- CompanyMember
- CompanyCustomer
- Project
- ProjectCollaborator
- Event (event sourcing)

**Patterns:**

- Soft deletes (`isDeleted`, `deletedAt`, `deletedById`)
- Archive pattern (in CompanyCustomer and Project)
- Auditing (`createdAt`, `updatedAt`)
- CUID as primary IDs

### MongoDB

- Events and notifications
- Flexible documents
- Aggregations for analytics

## 📡 Communication

### Internal Events

- **@nestjs/event-emitter** for events within the service
- Domain events (UserCreated, CompanyCreated, etc.)
- Event sourcing with Event entity

### Notifications

- **Mailjet** for transactional emails
- Event system to trigger notifications
- [FUTURE] SMS (Twilio)
- [FUTURE] Push notifications (Firebase/OneSignal)

### [FUTURE] Inter-Service Communication

- RabbitMQ or Kafka for inter-service events
- Contracts for microservices

## 🧪 Testing

### Strategy

- **70% Unit Tests**: Services, mappers, entities
- **20% Integration Tests**: Interactions between services
- **10% E2E Tests**: Complete user flows

### Tools

- **Jest** for unit tests
- **Supertest** for E2E
- **Mock repositories** for tests
- **Fixtures** for test data

### Coverage Target

- Critical services: 90%+
- Business logic: 85%+
- Controllers: 80%+
- Utilities: 95%+

## 📊 Observability

### Logging

- Centralized logger
- Traceability (correlationId, user)
- Appropriate log levels

### Error Tracking

- **Sentry** for:
  - Error traceability
  - Stacktrace captures
  - Production profiling

### Analytics

- **PostHog** for:
  - Product analytics
  - Telemetry
  - Feature flags

### [FUTURE] Monitoring

- Elastic Stack for centralized logging
- Prometheus + Grafana for metrics
- Datadog for APM

## 🚀 DevOps

### Development

- **Hot reload** with ts-node-dev
- **Docker Compose** for local services
- **ESLint + Prettier** for quality
- **Husky + lint-staged** for pre-commit hooks

### CI/CD

- **GitHub Actions** for:
  - Automated tests
  - Linting
  - Build
  - Deploy

### Configuration

- **@nestjs/config + Joi** for environments
- `.env` variables separated by environment
- Configuration validation on startup

## 📋 Phase 1 - Users & Access

### Authentication Endpoints

**Public:**

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh-token` - Refresh token
- `POST /auth/password-reset-request` - Request password reset
- `POST /auth/password-reset` - Complete password reset
- `GET /auth` - Get own profile
- `PATCH /auth` - Update own profile
- `DELETE /auth` - Delete account

**Admin:**

- `POST /admin/users` - Create user (admin)
- `GET /admin/users/:id` - Get user (admin)
- `PATCH /admin/users/:id` - Edit user (admin)
- `DELETE /admin/users/:id` - Delete user (admin)
- `GET /admin/users` - List users (admin)

## 📝 Patterns and Standards

### Naming Conventions

**Files:**

- Controllers: `*.controller.ts`
- Services: `*.service.ts`
- Use Cases: `*.use-case.ts`
- Repositories: `*.repository.ts`
- Entities: `*.entity.ts`
- DTOs: `*.dto.ts`
- Guards: `*.guard.ts`
- Mappers: `*.mapper.ts`
- Events: `*.event.ts`

**Classes:**

- Controllers: `UserController`
- Services: `UserService`
- Use Cases: `CreateUserUseCase`
- Entities: `User`
- DTOs: `CreateUserDto`

### Module Structure

Each module follows Clean Architecture:

```bash
module-name/
├── module-name.module.ts
├── application/
│   ├── services/
│   ├── use-cases/
│   └── mappers/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── events/
└── infrastructure/
    ├── controllers/
    ├── repository/
    └── transformers/
```

### Response Types

Complete response type system:

- `SuccessResponse<T>`
- `ErrorResponse`
- `WarningResponse`
- `InfoResponse`
- `PartialResponse<T>`
- `ProcessingResponse`
- `MetaResponse<T, M>` (for pagination)
- `CursorResponse<T>`

## 🎯 Next Steps

### Immediate (Priority 1)

1. **Base Configuration**

   - Create `package.json` with dependencies
   - Configure TypeScript
   - Configure NestJS
   - Docker Compose
   - Environment variables

2. **Base Libraries**

   - `libs/environment` - Configuration
   - `libs/database` - Prisma and MongoDB
   - `libs/common` - Utilities
   - `libs/contracts` - Shared DTOs

3. **Base API Gateway**
   - Main configuration
   - Global middleware
   - Filters and interceptors

### Short Term (Priority 2)

1. **Authentication Module**

   - Passport strategies
   - Guards
   - Use cases
   - Controllers

2. **Users Module**

   - Entities and repositories
   - Services and use cases
   - Controllers

3. **Database**
   - Complete Prisma schema
   - Migrations
   - Seeds

### Medium Term (Priority 3)

1. **Testing**

   - Complete configuration
   - Unit tests
   - E2E tests

2. **Documentation**
   - API documentation
   - Development guides

## 🔄 Current Status

**Last Update**: [Date]

**General Status**: Project in initial phase

- ✅ Structure and rules defined
- ✅ Architecture documentation complete
- ⏳ Base code pending implementation

**Progress**:

- Configuration: 0%
- Base libraries: 0%
- Modules: 0%
- Testing: 0%

## 📚 Resources

### Internal Documentation

- `.cursor/rules/` - All project guides
- `docs/` - Detailed documentation

### External Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💡 Important Decisions

1. **Monorepo**: Chosen to facilitate future migration to microservices
2. **Clean Architecture**: To maintain maintainable and testable code
3. **Prisma + MongoDB**: PostgreSQL for relational data, MongoDB for events
4. **Event-Driven**: Event system to decouple components
5. **Strict TypeScript**: For greater type safety

## 🚨 Considerations

- Strictly follow guides in `.cursor/rules/`
- Maintain architectural consistency
- Write tests alongside code
- Document important decisions
- Use conventional commits
