# Database - Reference Guide

## Overview

The project uses a hybrid database architecture:

- **PostgreSQL** with Prisma ORM for relational data
- **MongoDB** native for events and flexible documents

## PostgreSQL (Prisma)

### Configuration

**Schema Location:** `prisma/schema.prisma`

**Client Generation:**

```bash
npm run prisma:generate
```

**Migrations:**

```bash
npm run prisma:migrate        # Create and apply migration
npm run prisma:migrate:deploy # Apply migrations in production
```

### Main Entities

#### User

System user with authentication and profile.

**Main fields:**

- `id` (CUID)
- `email` (unique)
- `password` (hashed)
- `firstName`, `lastName`
- `phoneNumber`
- `roles` (array de UserRole)
- `isEmailVerified`, `isPhoneNumberVerified`
- `emailVerifyCode`, `phoneNumberVerifyCode`
- `passwordRecoveryCode`
- `locale`
- `isDeleted`, `deletedAt`, `deletedById`
- `createdAt`, `updatedAt`

**Relations:**

- `companyMemberships` → CompanyMember[]
- `proProfile` → UserProProfile (optional)
- `events` → Event[]

#### Company

Company or organization.

**Main fields:**

- `id` (CUID)
- `name`
- `description`
- `isDeleted`, `deletedAt`, `deletedById`
- `createdAt`, `updatedAt`

**One-to-One Relations:**

- `contact` → CompanyContact
- `address` → CompanyAddress
- `billing` → CompanyBilling
- `profile` → CompanyProfile
- `segmentation` → CompanySegmentation
- `config` → CompanyConfig
- `unit` → CompanyUnit
- `marginPolicy` → CompanyMarginPolicy

**One-to-Many Relations:**

- `members` → CompanyMember[]
- `customers` → CompanyCustomer[]
- `collaborators` → ProjectCollaborator[]

#### CompanyMember

Member of a company with a specific role.

**Main fields:**

- `id` (CUID)
- `companyId`
- `userId` (optional, for invites)
- `role` (CompanyMemberRole)
- `email` (for invites)
- `invitedBy`
- `status` (invited, active, suspended)
- `expiredAt` (for invites)
- `createdAt`, `updatedAt`

**Constraints:**

- `@@unique([companyId, userId])`

#### Project

Construction/renovation project.

**Main fields:**

- `id` (CUID)
- `name`
- `description`
- `status` (EProjectStatus)
- `buildingYear`
- `totalArea`
- `customerBudgetAmount`
- `isArchived`, `archivedAt`, `archivedById`
- `isDeleted`, `deletedAt`, `deletedById`
- `lastActivityAt`
- `createdAt`, `updatedAt`

**Relations:**

- `address` → ProjectAddress
- `config` → ProjectConfig
- `unit` → ProjectUnit
- `marginPolicy` → ProjectMarginPolicy
- `projectCustomers` → ProjectCustomer[]
- `collaborators` → ProjectCollaborator[]

#### Event

Event sourcing and auditing.

**Main fields:**

- `id` (CUID)
- `type` (string)
- `entityId` (string)
- `data` (JSON)
- `executedBy` (userId, optional)
- `executionType` (EventExecutionType)
- `createdAt`

### Design Patterns

#### Soft Delete

All main entities implement soft delete:

```prisma
model User {
  isDeleted    Boolean    @default(false)
  deletedAt    DateTime?
  deletedById  String?
  deletedBy    User?      @relation("UserDeletedBy", fields: [deletedById], references: [id], onDelete: SetNull)
}
```

**Usage:**

- Do not physically delete data
- Maintain audit trail
- Allow recovery

#### Archive Pattern

Some entities (CompanyCustomer, Project) implement archive:

```prisma
model Project {
  isArchived   Boolean    @default(false)
  archivedAt   DateTime?
  archivedById String?
  archivedBy    User?      @relation("ProjectArchivedBy", fields: [archivedById], references: [id], onDelete: SetNull)
}
```

**Difference from Soft Delete:**

- Archive: Temporarily hide (can be easily restored)
- Delete: Logical deletion (more permanent)

#### Company Normalization

Company details are normalized into separate entities:

- `CompanyContact` - Email, phone, website
- `CompanyAddress` - Address with geocoding
- `CompanyBilling` - Billing information
- `CompanyProfile` - Specialties and work types
- `CompanySegmentation` - Company classification
- `CompanyConfig` - Configuration (locale, currency, country)
- `CompanyUnit` - Measurement units
- `CompanyMarginPolicy` - Margin policies

**Benefits:**

- Optional data
- Better organization
- Facilitates specific queries

### Main Enums

```prisma
enum UserRole {
  admin
  professional
}

enum CompanyMemberRole {
  owner
  admin
  architect
  technical_architect
  interior_designer
  budget_technician
  project_manager
  site_manager
  construction_supervisor
  installer
  operator
}

enum CompanyMemberStatus {
  invited
  active
  suspended
}

enum EProjectStatus {
  draft
  planning
  in_progress
  on_hold
  completed
  cancelled
}
```

### Migrations

**Structure:**

```bash
prisma/
├── migrations/
│   ├── 20241219112751_init/
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
```

**Commands:**

```bash
# Create new migration
npm run prisma:migrate

# Apply migrations in production
npm run prisma:migrate:deploy

# Reset database
npm run prisma:reset
```

### Seeds

**Location:** `prisma/seed/`

**Files:**

- `users.seed.ts`
- `companies.seed.ts`
- `projects.seed.ts`
- `events.seed.ts`
- `notifications.seed.ts`
- `user-profiles.seed.ts`

**Run:**

```bash
npm run data:seed
```

## MongoDB

### MongoDB Configuration

**Provider:** MongoDB Native Driver

**Location:** `libs/database/src/mongo/`

### Usage

MongoDB is primarily used for:

- Events and notifications
- Flexible documents
- Aggregations for analytics

### Connection

```typescript
// En libs/database/src/mongo/mongo.provider.ts
@Injectable()
export class MongoProvider {
  // Connection configuration
}
```

## PrismaService

### Usage in Repositories

```typescript
@Injectable()
export class MockUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: ObjectId): Promise<UserEntity | null> {
    const result = await this.prisma.user.findFirst({
      where: { id: id.toString(), isDeleted: false },
    });
    return result ? UserEntity.fromPrisma(result) : null;
  }
}
```

### Transactions

```typescript
async createUserWithProfile(userData: CreateUserDto, profileData: CreateProfileDto) {
  return await this.prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ data: userData });
    const profile = await tx.userProProfile.create({
      data: { ...profileData, id: user.id },
    });
    return { user, profile };
  });
}
```

## Best Practices

### 1. Always Filter Soft Deletes

```typescript
// ✅ Correct
await this.prisma.user.findFirst({
  where: { id: id.toString(), isDeleted: false },
});

// ❌ Incorrect
await this.prisma.user.findFirst({
  where: { id: id.toString() },
});
```

### 2. Use Transactions for Multiple Operations

```typescript
await this.prisma.$transaction([
  this.prisma.user.create({ data: userData }),
  this.prisma.company.create({ data: companyData }),
]);
```

### 3. Indexes for Performance

Define indexes in the schema:

```prisma
model User {
  email String @unique

  @@index([email, isDeleted])
  @@index([createdAt])
}
```

### 4. Validate Relations

```typescript
// Verify that the relationship exists before using
const company = await this.prisma.company.findFirst({
  where: { id: companyId, isDeleted: false },
});

if (!company) {
  throw new NotFoundException("Company not found");
}
```

### 5. Use CUIDs

All IDs are automatically generated CUIDs:

```prisma
model User {
  id String @id @default(cuid())
}
```

## References

- [Database Schema Guidelines](../.cursor/rules/database-schema-guidelines.mdc)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
