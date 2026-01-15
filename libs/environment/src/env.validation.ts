import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid("development", "staging", "production", "test")
    .default("development"),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default("api"),

  // Database - PostgreSQL
  POSTGRES_URI: Joi.string().required(),
  POSTGRES_USER: Joi.string().optional(),
  POSTGRES_PASSWORD: Joi.string().optional(),
  POSTGRES_DB: Joi.string().optional(),
  POSTGRES_PORT: Joi.number().optional().default(5432),

  // Database - MongoDB
  MONGODB_URI: Joi.string().required(),
  MONGO_ROOT_USERNAME: Joi.string().optional(),
  MONGO_ROOT_PASSWORD: Joi.string().optional(),
  MONGO_DATABASE: Joi.string().optional().default("backend_events"),
  MONGO_PORT: Joi.number().optional().default(27017),

  // JWT
  JWT_SECRET: Joi.string().required().min(32),
  JWT_EXPIRE: Joi.string().default("7d"),
  JWT_REFRESH_SECRET: Joi.string().optional().min(32),
  JWT_REFRESH_EXPIRE: Joi.string().optional().default("30d"),

  // Mailjet
  MAILJET_API_KEY: Joi.string().optional(),
  MAILJET_API_SECRET: Joi.string().optional(),
  MAILJET_FROM_EMAIL: Joi.string().email().optional(),
  MAILJET_FROM_NAME: Joi.string().optional(),

  // Observability - Sentry
  SENTRY_DSN: Joi.string().uri().optional().allow(""),
  SENTRY_ENVIRONMENT: Joi.string().optional(),
  SENTRY_TRACES_SAMPLE_RATE: Joi.number().min(0).max(1).optional().default(1.0),

  // Observability - PostHog
  POSTHOG_API_KEY: Joi.string().optional().allow(""),
  POSTHOG_HOST: Joi.string()
    .uri()
    .optional()
    .default("https://app.posthog.com"),

  // CORS
  CORS_ORIGIN: Joi.string().optional().default("*"),

  // Rate Limiting
  RATE_LIMIT_TTL: Joi.number().optional().default(60),
  RATE_LIMIT_MAX: Joi.number().optional().default(100),
});
