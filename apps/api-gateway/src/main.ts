import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { getEnvConfig } from "@libs/environment";

// Enable source map support for better error stack traces
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("source-map-support").install();
} catch {
  // source-map-support is optional
}

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const envConfig = getEnvConfig();

  // Create NestJS application
  const app = await NestFactory.create(AppModule, {
    logger:
      envConfig.nodeEnv === "production"
        ? ["error", "warn", "log"]
        : ["error", "warn", "log", "debug", "verbose"],
  });

  // Configure CORS
  const corsOptions = {
    origin:
      envConfig.cors.origin === "*"
        ? true
        : envConfig.cors.origin.split(",").map((origin) => origin.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Correlation-ID",
      "Accept",
    ],
    exposedHeaders: ["X-Correlation-ID"],
  };

  app.enableCors(corsOptions);
  logger.log(`CORS enabled with origin: ${envConfig.cors.origin}`);

  // Configure global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
      disableErrorMessages: envConfig.nodeEnv === "production", // Disable detailed error messages in production
    }),
  );

  logger.log("Global validation pipe configured");

  // Configure API prefix
  app.setGlobalPrefix(envConfig.apiPrefix);
  logger.log(`Global API prefix set to: /${envConfig.apiPrefix}`);

  // Configure Swagger/OpenAPI (only in development and staging)
  if (envConfig.nodeEnv === "development" || envConfig.nodeEnv === "staging") {
    const swaggerConfig = new DocumentBuilder()
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
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${envConfig.apiPrefix}/docs`, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: "alpha",
        operationsSorter: "alpha",
      },
    });

    logger.log(
      `Swagger documentation available at: /${envConfig.apiPrefix}/docs`,
    );
  }

  // Initialize Sentry if DSN is configured
  if (envConfig.sentry.dsn) {
    try {
      const { init } = await import("@sentry/nestjs");
      init({
        dsn: envConfig.sentry.dsn,
        environment: envConfig.sentry.environment || envConfig.nodeEnv,
        tracesSampleRate: envConfig.sentry.tracesSampleRate || 1.0,
        integrations: [],
      });
      logger.log("Sentry initialized successfully");
    } catch (error) {
      logger.warn("Failed to initialize Sentry", error);
    }
  }

  // Start the application
  const port = envConfig.port;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`API endpoint: http://localhost:${port}/${envConfig.apiPrefix}`);
  if (envConfig.nodeEnv === "development" || envConfig.nodeEnv === "staging") {
    logger.log(
      `Swagger docs: http://localhost:${port}/${envConfig.apiPrefix}/docs`,
    );
  }
  logger.log(`Environment: ${envConfig.nodeEnv}`);
}

bootstrap().catch((error) => {
  const logger = new Logger("Bootstrap");
  logger.error("Failed to start application", error);
  process.exit(1);
});
