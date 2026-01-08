# Project Documentation

Welcome to the complete documentation of the Backend with AI project.

## 📚 Documentation Index

### Main Documentation

- [Main README](../README.md) - Project overview
- [Project Status](./PROJECT_STATUS.md) - Current status and next steps
- [Memory Bank](./memory_bank.md) - Complete project status information

### Technical Guides

#### Architecture

- [Architecture Guide](./architecture/README.md)
  - Clean Architecture principles
  - Layer structure
  - Data flow
  - Design patterns

#### Database

- [Database Guide](./database/README.md)
  - PostgreSQL with Prisma
  - Native MongoDB
  - Main entities
  - Design patterns
  - Migrations and seeds

#### Security

- [Security Guide](./security/README.md)
  - JWT authentication
  - Authorization and roles
  - Guards and decorators
  - Validation
  - Best practices

#### Testing

- [Testing Guide](./testing/README.md)
  - Testing strategy
  - Unit tests
  - Integration tests
  - E2E tests
  - Mocks and fixtures

#### API

- [API Documentation](./api/README.md)
  - Available endpoints
  - Authentication
  - Response types
  - Error handling
  - Examples

### Project Rules

Rules and standards are in `.cursor/rules/`:

- [Backend Architecture Guidelines](../.cursor/rules/backend-architecture-guidelines.mdc)
- [Folder Structure Guidelines](../.cursor/rules/backend-folder-structure-guidelines.mdc)
- [Auth Strategy Guidelines](../.cursor/rules/auth-strategy-guidelines.mdc)
- [Database Schema Guidelines](../.cursor/rules/database-schema-guidelines.mdc)
- [Dependencies Guidelines](../.cursor/rules/dependencies-guidelines.mdc)
- [Testing Strategy Guidelines](../.cursor/rules/testing-strategy-guidelines.mdc)
- [Response Types Guidelines](../.cursor/rules/response-types-guidelines.mdc)

## 🚀 Quick Start

### For New Developers

1. Read the [Main README](../README.md)
2. Review the [Architecture Guide](./architecture/README.md)
3. Familiarize yourself with the [Project Rules](../.cursor/rules/)
4. Consult the [API Documentation](./api/README.md) to understand endpoints

### To Implement a New Feature

1. Review [Project Status](./PROJECT_STATUS.md) to see what's pending
2. Consult relevant guides:
   - [Architecture](./architecture/README.md) for structure
   - [Database](./database/README.md) for entities
   - [Security](./security/README.md) for authentication/authorization
   - [Testing](./testing/README.md) for writing tests

## 📖 Documentation Structure

```bash
docs/
├── README.md                 # This file
├── PROJECT_STATUS.md         # Current status and next steps
├── memory_bank.md            # Complete project information
├── architecture/
│   └── README.md            # Architecture guide
├── database/
│   └── README.md            # Database guide
├── security/
│   └── README.md            # Security guide
├── testing/
│   └── README.md            # Testing guide
└── api/
    └── README.md            # API documentation
```

## 🔍 Quick Search

### How to...?

- **Configure the project?** → [Main README](../README.md#initial-setup)
- **Understand the architecture?** → [Architecture Guide](./architecture/README.md)
- **Create a new entity?** → [Database Guide](./database/README.md)
- **Implement authentication?** → [Security Guide](./security/README.md)
- **Write tests?** → [Testing Guide](./testing/README.md)
- **See available endpoints?** → [API Documentation](./api/README.md)
- **See what's left to do?** → [Project Status](./PROJECT_STATUS.md)

### Key Concepts

- **Clean Architecture** → [Architecture](./architecture/README.md)
- **Domain-Driven Design** → [Architecture](./architecture/README.md)
- **Repository Pattern** → [Architecture](./architecture/README.md#repository-pattern)
- **JWT Authentication** → [Security](./security/README.md#jwt-authentication)
- **RBAC** → [Security](./security/README.md#role-system)
- **Soft Delete** → [Database](./database/README.md#soft-delete)
- **Event Sourcing** → [Database](./database/README.md#event)

## 📝 Conventions

### Naming

- **Files**: `kebab-case.ts`
- **Classes**: `PascalCase`
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

### Module Structure

Each module follows Clean Architecture:

```bash
module-name/
├── application/
├── domain/
└── infrastructure/
```

See [Folder Structure Guidelines](../.cursor/rules/backend-folder-structure-guidelines.mdc) for more details.

## 🔄 Documentation Updates

Documentation should be updated when:

- New features are added
- Architectural patterns change
- Standards are updated
- New technologies are implemented

## 📞 Support

For questions or clarifications:

1. Consult relevant guides
2. Review rules in `.cursor/rules/`
3. Consult existing code as reference

## 🎯 Next Steps

1. **Implement base configuration** → See [PROJECT_STATUS.md](./PROJECT_STATUS.md#priority-1-base-project-configuration)
2. **Create shared libraries** → See [PROJECT_STATUS.md](./PROJECT_STATUS.md#priority-2-shared-libraries)
3. **Implement API Gateway** → See [PROJECT_STATUS.md](./PROJECT_STATUS.md#priority-3-base-api-gateway)
4. **Authentication module** → See [PROJECT_STATUS.md](./PROJECT_STATUS.md#priority-4-authentication-module)

---

**Last update**: [Last update date]
