# Project Architecture

## Overview

This project follows **Clean Architecture** and **Domain-Driven Design** (DDD) principles, organized in a **monorepo** that allows scaling from a monolith to microservices.

## Architecture Principles

### 1. Clean Architecture

The architecture is organized in concentric layers:

```bash
┌─────────────────────────────────────┐
│     Infrastructure (Outer Layer)    │
│  - Controllers, Repositories, APIs   │
└─────────────────────────────────────┘
           ↓ depends on
┌─────────────────────────────────────┐
│      Application (Use Cases)         │
│  - Services, Use Cases, Mappers      │
└─────────────────────────────────────┘
           ↓ depends on
┌─────────────────────────────────────┐
│        Domain (Core Layer)           │
│  - Entities, Repositories, Events   │
└─────────────────────────────────────┘
```

**Dependency rules:**

- Outer layers depend on inner layers
- Domain does not depend on anything external
- Infrastructure implements domain interfaces

### 2. Domain-Driven Design

- **Entities**: Objects with unique identity
- **Value Objects**: Immutable objects without identity
- **Repositories**: Interfaces for data access
- **Domain Events**: Events that represent important changes

### 3. Separation of Responsibilities

Each layer has clear responsibilities:

- **Controllers**: Handle HTTP, input validation, responses
- **Services**: Business logic, orchestration
- **Use Cases**: Complex business flows, transactions
- **Repositories**: Data access, persistence abstraction
- **Entities**: Business rules, domain validations

## Layer Structure

### Infrastructure Layer

**Responsibilities:**

- External interface implementation
- HTTP Controllers
- Repository implementations
- External service integrations
- Response transformers

**Structure:**

```bash
infrastructure/
├── controllers/        # HTTP controllers
├── repository/         # Repository implementations
├── transformers/      # Response transformers
├── guards/            # Authorization guards
├── middlewares/       # HTTP middlewares
└── notifications/     # Notification handlers
```

### Application Layer

**Responsibilities:**

- Application logic
- Use case orchestration
- Data transformation
- Coordination between services

**Structure:**

```bash
application/
├── services/          # Application services
├── use-cases/        # Complex use cases
└── mappers/          # Mapping between layers
```

### Domain Layer

**Responsibilities:**

- Domain entities
- Business rules
- Repository interfaces
- Domain events

**Structure:**

```bash
domain/
├── entities/         # Domain entities
├── repositories/     # Repository interfaces
└── events/           # Domain events
```

## Data Flow

### Request Flow

```bash
HTTP Request
    ↓
Controller (Infrastructure)
    ↓
DTO Validation (class-validator)
    ↓
Service (Application)
    ↓
Use Case (Application) [optional]
    ↓
Repository (Domain Interface)
    ↓
Repository Implementation (Infrastructure)
    ↓
Database
```

### Response Flow

```bash
Database
    ↓
Repository Implementation
    ↓
Entity (Domain)
    ↓
Mapper (Application)
    ↓
Transformer (Infrastructure)
    ↓
Response Type (Common)
    ↓
HTTP Response
```

## Access Rules Between Layers

### ✅ Allowed

- **Controllers** → Services, Use Cases
- **Services** → Repositories, PrismaService, other Services
- **Use Cases** → Services, Repositories, PrismaService
- **Repositories** → PrismaService, MongoDB

### ❌ Forbidden

- **Controllers** → Repositories, PrismaService (directly)
- **Domain** → Infrastructure, Application
- **Application** → Infrastructure (except interfaces)

## Module Communication

### Event-Driven Architecture

Modules communicate through events:

```typescript
// Emit event
this.eventEmitter.emit('user.created', userCreatedEvent);

// Listening event
@OnEvent('user.created')
handleUserCreated(event: UserCreatedEvent) {
  // Process event
}
```

### Domain Events

Events represent important changes in the domain:

- `UserCreatedEvent`
- `UserUpdatedEvent`
- `CompanyCreatedEvent`
- `ProjectCreatedEvent`

## Design Patterns

### Repository Pattern

Abstracts data access:

```typescript
// Interface en Domain
interface UserRepository {
  findById(id: ObjectId): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
}

// Infrastructure implementation
class MockUserRepository extends UserRepository {
  // Prisma implementation
}
```

### Service Pattern

Encapsulates business logic:

```typescript
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    // Business logic
    const user = await this.userRepository.save(userEntity);
    this.eventEmitter.emit("user.created", new UserCreatedEvent(user));
    return user;
  }
}
```

### Use Case Pattern

For complex flows:

```typescript
@Injectable()
export class CreateUserUseCase {
  async execute(dto: CreateUserDto): Promise<UserEntity> {
    // Complex flow with multiple steps
    // Transactions
    // Complex validations
  }
}
```

## Scalability

### Scalable Monolith

Initially, everything is in a single service (`api-gateway`), but with:

- Well-separated modules
- Event-based communication
- Abstract repositories

### Migration to Microservices

When necessary:

1. Extract modules to independent services
2. Maintain contracts in `libs/contracts`
3. Event-based communication (RabbitMQ/Kafka)
4. Contract tests

## Security

### Authentication

- JWT tokens
- Passport strategies
- Guards for route protection

### Authorization

- RBAC (Role-Based Access Control)
- Resource-specific guards
- Permission validation in services

## Testing

### Strategy by Layer

- **Domain**: Unit tests for entities
- **Application**: Service and use case tests (with mocks)
- **Infrastructure**: Integration tests
- **E2E**: Complete flow tests

## References

- [Backend Architecture Guidelines](../.cursor/rules/backend-architecture-guidelines.mdc)
- [Folder Structure Guidelines](../.cursor/rules/backend-folder-structure-guidelines.mdc)
