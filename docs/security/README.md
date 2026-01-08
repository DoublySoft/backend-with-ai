# Security - Reference Guide

## Authentication

### JWT Authentication

The system uses JWT (JSON Web Tokens) for authentication.

**Configuration:**

- Secret: `JWT_SECRET` (environment variable)
- Expiration: `JWT_EXPIRE` (environment variable)
- Algorithm: HS256

**Token Payload:**

```typescript
interface JWTPayload {
  userId: ObjectId;
  expired: Date; // Session expiration timestamp
}
```

### Passport Strategies

#### Local Strategy

Authentication with email and password.

**Usage:**

```typescript
@UseGuards(AuthGuard('local'))
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // ...
}
```

#### JWT Strategy

JWT token validation.

**Usage:**

```typescript
@UseGuards(AuthGuard('jwt'))
@Get('profile')
async getProfile() {
  // ...
}
```

### Authentication Flow

1. **Registration:**

   - User registers with email and password
   - Email verification code is generated
   - Email is sent with code

2. **Email Verification:**

   - User enters code
   - Email is marked as verified

3. **Login:**

   - User enters email and password
   - Credentials are validated
   - JWT token is generated
   - Token is returned to client

4. **Refresh Token:**

   - Client sends current token
   - Token expiration is validated
   - New token is generated

5. **Logout:**
   - [FUTURE] Invalidate token on server

## Authorization

### Role System

#### Main Roles

```typescript
enum EUserRole {
  ADMIN = "admin",
  PROFESSIONAL = "professional",
}
```

Users can have multiple roles simultaneously.

#### Company Roles

```typescript
enum ECompanyMemberRole {
  OWNER = "owner",
  ADMIN = "admin",
  ARCHITECT = "architect",
  TECHNICAL_ARCHITECT = "technical_architect",
  INTERIOR_DESIGNER = "interior_designer",
  BUDGET_TECHNICIAN = "budget_technician",
  PROJECT_MANAGER = "project_manager",
  SITE_MANAGER = "site_manager",
  CONSTRUCTION_SUPERVISOR = "construction_supervisor",
  INSTALLER = "installer",
  OPERATOR = "operator",
}
```

#### Project Roles

```typescript
enum EProjectCollaboratorRole {
  OWNER = "owner",
  MAIN_CONTRACTOR = "main_contractor",
  SUBCONTRACTOR = "subcontractor",
  ARCHITECT = "architect",
  ENGINEER = "engineer",
  SUPPLIER = "supplier",
  OTHER = "other",
}
```

### Guards

#### AuthGuard

Validates authentication and email verification.

**Usage:**

```typescript
@UseGuards(AuthGuard)
@Get('profile')
async getProfile() {
  // ...
}
```

**Behavior:**

- Validates JWT token
- Extracts user from token
- Verifies that email is verified
- Rejects if user is deleted

#### AdminGuard

Validates administrator role.

**Usage:**

```typescript
@UseGuards(AuthGuard, AdminGuard)
@Get('admin/users')
async getUsers() {
  // ...
}
```

#### CompanyGuard

Validates company membership and roles.

**Usage:**

```typescript
@UseGuards(AuthGuard, CompanyGuard)
@CompanyRoles(ECompanyMemberRole.OWNER, ECompanyMemberRole.ADMIN)
@Get('companies/:id')
async getCompany() {
  // ...
}
```

#### ProjectGuard

Validates project access.

**Usage:**

```typescript
@UseGuards(AuthGuard, ProjectGuard)
@Get('projects/:projectId')
async getProject() {
  // ...
}
```

### Decorators

#### @Public()

Marks endpoint as public (without authentication).

```typescript
@Public()
@Post('register')
async register() {
  // ...
}
```

#### @CompanyRoles()

Specifies required roles in company.

```typescript
@CompanyRoles(ECompanyMemberRole.OWNER, ECompanyMemberRole.ADMIN)
@UseGuards(AuthGuard, CompanyGuard)
@Patch('companies/:id')
async updateCompany() {
  // ...
}
```

## Validation

### DTOs with class-validator

```typescript
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
```

### Global Validation

```typescript
// In main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
);
```

## Password Security

### Hashing

Passwords are hashed with bcrypt:

```typescript
import * as bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hashedPassword);
```

**Configuration:**

- Salt rounds: 10

### Password Requirements

- Minimum 8 characters
- [FUTURE] Additional requirements (uppercase, numbers, symbols)

## Verification

### Email Verification

1. User registers
2. Verification code is generated
3. Code is sent by email
4. User enters code
5. Email is marked as verified

**Code:**

- Length: 6 digits
- Expiration: 15 minutes (configurable)

### Phone Verification

Similar to email verification, but via SMS.

[FUTURE] Implement with Twilio

## Rate Limiting

[FUTURE] Implement rate limiting for:

- Login attempts
- Password reset requests
- Email verification requests

## CORS

```typescript
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
```

## Helmet

[FUTURE] Configure Helmet for security headers:

```typescript
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
      },
    },
  })
);
```

## Security Logging

### Events to Log

- Failed login attempts
- Unauthorized access
- Permission changes
- Password changes
- User deletions

### Information NOT to Log

- Passwords (never)
- Complete tokens (only IDs)
- Sensitive user data

## Best Practices

### 1. Never Expose Sensitive Information

```typescript
// ✅ Correct
return {
  id: user.id,
  email: user.email,
  // password is never included
};

// ❌ Incorrect
return user; // May include password
```

### 2. Validate Permissions in Services

```typescript
// ✅ Correct
async updateUser(userId: string, requesterId: string, data: UpdateUserDto) {
  // Verify permissions
  if (userId !== requesterId && !this.isAdmin(requesterId)) {
    throw new ForbiddenException();
  }
  // ...
}
```

### 3. Use HTTPS in Production

Always use HTTPS in production. HTTP only for local development.

### 4. Rotate Secrets Regularly

- JWT_SECRET
- Database passwords
- API keys

### 5. Implement Token Blacklisting

[FUTURE] For effective logout and token revocation.

## References

- [Auth Strategy Guidelines](../.cursor/rules/auth-strategy-guidelines.mdc)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
