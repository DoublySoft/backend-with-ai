import { EnvironmentConfig } from "./env.config";

export const mockEnvConfig: EnvironmentConfig = {
  nodeEnv: "test",
  port: 3000,
  apiPrefix: "api",

  postgres: {
    uri: "postgresql://postgres:postgres@localhost:5432/test_db",
    user: "postgres",
    password: "postgres",
    database: "test_db",
    port: 5432,
  },

  mongo: {
    uri: "mongodb://admin:admin@localhost:27017/test_events",
    rootUsername: "admin",
    rootPassword: "admin",
    database: "test_events",
    port: 27017,
  },

  jwt: {
    secret: "test-jwt-secret-key-minimum-32-characters-long",
    expire: "7d",
    refreshSecret: "test-jwt-refresh-secret-key-minimum-32-characters-long",
    refreshExpire: "30d",
  },

  mailjet: {
    apiKey: "test-api-key",
    apiSecret: "test-api-secret",
    fromEmail: "test@example.com",
    fromName: "Test Sender",
  },

  sentry: {
    dsn: "https://test@sentry.io/test",
    environment: "test",
    tracesSampleRate: 1.0,
  },

  posthog: {
    apiKey: "test-posthog-key",
    host: "https://app.posthog.com",
  },

  cors: {
    origin: "*",
  },

  rateLimit: {
    ttl: 60,
    max: 100,
  },
};
