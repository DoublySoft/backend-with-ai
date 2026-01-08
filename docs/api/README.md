# API Documentation

## Base URL

```bash
Development: http://localhost:3000
Staging: https://api-staging.example.com
Production: https://api.example.com
```

## Versioning

The API uses versioning by URL:

```bash
/v1/auth/login
/v2/users
```

## Authentication

### JWT Authentication

Most endpoints require authentication via JWT token.

**Required header:**

```bash
Authorization: Bearer <token>
```

### Get Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clx123...",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "message": "Login successful",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Response Types

The API uses a consistent response type system. See [Response Types Guidelines](../.cursor/rules/response-types-guidelines.mdc) for more details.

### Base Structure

```typescript
{
  code: number;           // HTTP status code
  status: string;         // Response status (success, error, etc.)
  message: string;        // Human-readable message
  messageKey?: string;     // i18n key
  path: string;           // Request path
  timestamp: string;      // ISO timestamp
  data?: T;              // Response data (if applicable)
}
```

## Endpoints

### Authentication endpoint

#### POST /auth/register

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response:** `201 Created`

```json
{
  "code": 201,
  "status": "success",
  "data": {
    "accessToken": "...",
    "user": { ... }
  },
  "message": "User registered successfully"
}
```

#### POST /auth/login

Log in.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

#### POST /auth/refresh-token

Refresh access token.

**Headers:**

```bash
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "accessToken": "..."
  }
}
```

#### POST /auth/logout

Log out.

**Headers:**

```bash
Authorization: Bearer <token>
```

**Response:** `200 OK`

#### POST /auth/password-reset-request

Request password reset.

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK`

#### POST /auth/password-reset

Complete password reset.

**Request:**

```json
{
  "email": "user@example.com",
  "code": "123456",
  "newPassword": "newPassword123"
}
```

**Response:** `200 OK`

#### GET /auth

Get authenticated user profile.

**Headers:**

```bash
Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "code": 200,
  "status": "success",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "isEmailVerified": true,
    "isPhoneNumberVerified": true,
    "roles": ["professional"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### PATCH /auth

Update authenticated user profile.

**Headers:**

```bash
Authorization: Bearer <token>
```

**Request:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response:** `200 OK`

#### DELETE /auth

Delete authenticated user account.

**Headers:**

```bash
Authorization: Bearer <token>
```

**Response:** `200 OK`

### Administration - Users

All admin endpoints require `ADMIN` role.

#### POST /admin/users

Create a new user (admin).

**Headers:**

```bash
Authorization: Bearer <admin-token>
```

**Request:**

```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "New",
  "lastName": "User",
  "roles": ["professional"]
}
```

**Response:** `201 Created`

#### GET /admin/users/:id

Get a user by ID (admin).

**Headers:**

```bash
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`

#### PATCH /admin/users/:id

Update a user (admin).

**Headers:**

```bash
Authorization: Bearer <admin-token>
```

**Request:**

```json
{
  "firstName": "Updated",
  "roles": ["professional", "admin"]
}
```

**Response:** `200 OK`

#### DELETE /admin/users/:id

Delete a user (admin).

**Headers:**

```bash
Authorization: Bearer <admin-token>
```

**Response:** `200 OK`

#### GET /admin/users

List users with pagination (admin).

**Headers:**

```bash
Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string, optional)
- `role` (string, optional)

**Response:** `200 OK`

```json
{
  "code": 200,
  "status": "success",
  "data": [
    { ... },
    { ... }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "message": "Users fetched successfully"
}
```

## HTTP Status Codes

- `200 OK` - Successful operation
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - No permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Conflict (e.g., duplicate email)
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

## Error Handling

### Error Response Structure

```json
{
  "code": 400,
  "status": "error",
  "message": "Validation failed",
  "messageKey": "validation.error",
  "errors": {
    "email": "Email is required",
    "password": "Password must be at least 8 characters"
  },
  "path": "/auth/register",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Common Errors

#### 401 Unauthorized

```json
{
  "code": 401,
  "status": "unauthorized",
  "message": "Authentication required",
  "messageKey": "auth.required"
}
```

#### 403 Forbidden

```json
{
  "code": 403,
  "status": "error",
  "message": "Insufficient permissions",
  "messageKey": "auth.forbidden"
}
```

#### 404 Not Found

```json
{
  "code": 404,
  "status": "error",
  "message": "Resource not found",
  "messageKey": "resource.not.found"
}
```

## Pagination

Listing endpoints support page-based pagination:

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response:**

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "nextPage": 2,
    "previousPage": null
  }
}
```

## Filtering and Search

Many listing endpoints support filtering:

**Common Query Parameters:**

- `search` - Text search
- `role` - Filter by role
- `status` - Filter by status
- `createdFrom` - Date from (ISO 8601)
- `createdTo` - Date to (ISO 8601)

## Rate Limiting

[FUTURE] The API will implement rate limiting to prevent abuse.

## Interactive Documentation

[FUTURE] ApiDog or Swagger will be used for interactive documentation.

## Examples

### cURL

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get Profile
curl -X GET http://localhost:3000/auth \
  -H "Authorization: Bearer <token>"
```

### JavaScript (Fetch)

```javascript
// Login
const response = await fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const data = await response.json();
const token = data.data.accessToken;

// Get Profile
const profileResponse = await fetch("http://localhost:3000/auth", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const profile = await profileResponse.json();
```

## Notes

- All timestamps are in ISO 8601 format
- All IDs are CUIDs (strings)
- Dates are sent and received in ISO 8601 format
- Booleans are sent as `true`/`false`
