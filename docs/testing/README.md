# Testing - Reference Guide

## Testing Strategy

### Testing Pyramid

```bash
        /\
       /  \     10% E2E Tests
      /____\
     /      \    20% Integration Tests
    /________\
   /          \  70% Unit Tests
  /____________\
```

### Coverage Target

- **Critical services**: 90%+
- **Business logic**: 85%+
- **Controllers**: 80%+
- **Utilities**: 95%+

## Test Types

### Unit Tests

Test individual components in isolation.

**Location:** `*.spec.ts` (co-located with code)

**Example:**

```typescript
describe("UsersService", () => {
  let service: UsersService;
  let repository: MockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useClass: MockUserRepository,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitterMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockUserRepository>(UserRepository);
  });

  it("should create a user", async () => {
    const dto: CreateUserDto = {
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    const result = await service.createUser(dto);

    expect(result).toBeDefined();
    expect(result.email).toBe(dto.email);
  });
});
```

### Integration Tests

Test interactions between components.

**Example:**

```typescript
describe("Auth Integration", () => {
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    userService = moduleFixture.get<UserService>(UserService);
  });

  it("should register and login a user", async () => {
    const registerDto = {
      email: "test@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
    };

    await authService.register(registerDto);

    const loginResult = await authService.login({
      email: registerDto.email,
      password: registerDto.password,
    });

    expect(loginResult.accessToken).toBeDefined();
  });
});
```

### E2E Tests

Test complete user flows through the API.

**Location:** `apps/api-gateway/test/*.e2e-spec.ts`

**Example:**

```typescript
describe("AuthController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/auth/register (POST)", () => {
    it("should register a new user", () => {
      const registerDto = {
        email: "test@example.com",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      };

      return request(app.getHttpServer())
        .post("/auth/register")
        .send(registerDto)
        .expect(201)
        .expect(res => {
          expect(res.body).toHaveProperty("data");
          expect(res.body.data).toHaveProperty("accessToken");
          expect(res.body.data.user.email).toBe(registerDto.email);
        });
    });
  });
});
```

## Mocks and Fixtures

### Mock Repositories

**Pattern:** Mock repositories extend base classes.

```typescript
@Injectable()
export class MockUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findById(id: ObjectId): Promise<UserEntity | null> {
    // Mock implementation
  }

  async save(user: UserEntity): Promise<UserEntity> {
    // Mock implementation
  }
}
```

**Location:** `infrastructure/repository/mock-*.repository.ts`

### Event Emitter Mock

```typescript
// libs/events/test/event-emitter.mock.ts
export const eventEmitterMock: Partial<EventEmitter2> = {
  emit: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
};
```

**Usage:**

```typescript
{
  provide: EventEmitter2,
  useValue: eventEmitterMock,
}
```

### Prisma Service Mock

```typescript
// libs/database/prisma/test/prisma.service.mock.ts
export const prismaServiceMock: Partial<PrismaService> = {
  user: {
    create: jest.fn(),
    findFirst: jest.fn(),
    // ...
  },
};
```

### Test Constants

```typescript
// Test constants
const TEST_USER_ID = new ObjectId("507f1f77bcf86cd799439011");
const TEST_COMPANY_ID = new ObjectId("507f1f77bcf86cd799439012");
```

## Configuration

### Jest Config

**Location:** `jest.config.js`

```javascript
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/apps/"],
  moduleNameMapper: {
    "^@common/(.*)$": "<rootDir>/libs/common/src/$1",
    "^@contract/(.*)$": "<rootDir>/libs/contracts/src/$1",
    // ...
  },
};
```

### E2E Jest Config

**Location:** `apps/api-gateway/test/jest-e2e.json`

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^@common/(.*)$": "<rootDir>/../../../libs/common/src/$1"
    // ...
  }
}
```

## Commands

```bash
# All tests
npm run test:all

# Unit tests only
npm run test

# E2E tests only
npm run test:e2e

# With coverage
npm run test:cov

# Watch mode
npm run test:watch

# Debug
npm run test:debug
```

## Best Practices

### 1. AAA Pattern

Arrange, Act, Assert:

```typescript
it("should create a user", async () => {
  // Arrange
  const dto: CreateUserDto = {
    email: "test@example.com",
    password: "password123",
  };

  // Act
  const result = await service.createUser(dto);

  // Assert
  expect(result).toBeDefined();
  expect(result.email).toBe(dto.email);
});
```

### 2. Test Isolation

Each test must be independent:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 3. Descriptive Test Names

```typescript
// ✅ Good
it("should throw NotFoundException when user does not exist", async () => {
  // ...
});

// ❌ Bad
it("should work", async () => {
  // ...
});
```

### 4. Test One Thing

Each test must verify one thing:

```typescript
// ✅ Good
it("should create user with valid data", async () => {
  /* ... */
});
it("should throw error with invalid email", async () => {
  /* ... */
});
it("should throw error with short password", async () => {
  /* ... */
});

// ❌ Bad
it("should validate user creation", async () => {
  // Validates multiple things
});
```

### 5. Use Mocks Appropriately

```typescript
// ✅ Mock external dependencies
const mockRepository = {
  findById: jest.fn(),
  save: jest.fn(),
};

// ❌ Don't mock what you're testing
const mockService = {
  createUser: jest.fn(), // If you're testing the service
};
```

### 6. Test Edge Cases

```typescript
it("should handle null values", async () => {
  /* ... */
});
it("should handle empty strings", async () => {
  /* ... */
});
it("should handle very long strings", async () => {
  /* ... */
});
```

### 7. Clean Up

```typescript
afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await app.close();
  await prismaService.$disconnect();
});
```

## Testing Mappers

```typescript
describe("UserMapper", () => {
  it("should convert UserModel to UserEntity", () => {
    const model: UserModel = {
      id: new ObjectId(),
      email: "test@example.com",
      // ...
    };

    const entity = UserMapper.toEntity(model);

    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.email).toBe(model.email);
  });

  it("should maintain data integrity in round-trip conversion", () => {
    const model: UserModel = {
      /* ... */
    };
    const entity = UserMapper.toEntity(model);
    const backToModel = UserMapper.toModel(entity);

    expect(backToModel.email).toBe(model.email);
  });
});
```

## Testing Guards

```typescript
describe("AuthGuard", () => {
  let guard: AuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, Reflector],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it("should allow access for authenticated user", async () => {
    const context = createMockExecutionContext({
      user: { id: "123", isEmailVerified: true },
    });

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
  });
});
```

## References

- [Testing Strategy Guidelines](../.cursor/rules/testing-strategy-guidelines.mdc)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
