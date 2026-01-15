import { DocumentBuilder } from "@nestjs/swagger";
import { getEnvConfig } from "@libs/environment";

/**
 * Creates Swagger DocumentBuilder configuration
 * This can be used in main.ts to configure Swagger/OpenAPI documentation
 */
export function createSwaggerDocumentBuilder(): DocumentBuilder {
  const envConfig = getEnvConfig();

  return new DocumentBuilder()
    .setTitle("Backend with AI API")
    .setDescription(
      "Scalable backend API built with NestJS, TypeScript, and Clean Architecture",
    )
    .setVersion("1.0.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("auth", "Authentication endpoints")
    .addTag("users", "User management endpoints")
    .addTag("health", "Health check endpoints")
    .addServer(`http://localhost:${envConfig.port}`, "Development server")
    .addServer(`https://api.example.com`, "Production server");
}

/**
 * Swagger UI options for SwaggerModule.setup()
 */
export const swaggerUiOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: "alpha",
    operationsSorter: "alpha",
  },
};
