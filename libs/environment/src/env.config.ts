export interface EnvironmentConfig {
  // Application
  nodeEnv: string;
  port: number;
  apiPrefix: string;

  // Database - PostgreSQL
  postgres: {
    uri: string;
    user?: string;
    password?: string;
    database?: string;
    port?: number;
  };

  // Database - MongoDB
  mongo: {
    uri: string;
    rootUsername?: string;
    rootPassword?: string;
    database?: string;
    port?: number;
  };

  // JWT
  jwt: {
    secret: string;
    expire: string;
    refreshSecret?: string;
    refreshExpire?: string;
  };

  // Mailjet
  mailjet: {
    apiKey?: string;
    apiSecret?: string;
    fromEmail?: string;
    fromName?: string;
  };

  // Observability - Sentry
  sentry: {
    dsn?: string;
    environment?: string;
    tracesSampleRate?: number;
  };

  // Observability - PostHog
  posthog: {
    apiKey?: string;
    host?: string;
  };

  // CORS
  cors: {
    origin: string;
  };

  // Rate Limiting
  rateLimit: {
    ttl: number;
    max: number;
  };
}

export const getEnvConfig = (): EnvironmentConfig => {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    apiPrefix: process.env.API_PREFIX || "api",

    postgres: {
      uri: process.env.POSTGRES_URI || "",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT
        ? parseInt(process.env.POSTGRES_PORT, 10)
        : 5432,
    },

    mongo: {
      uri: process.env.MONGODB_URI || "",
      rootUsername: process.env.MONGO_ROOT_USERNAME,
      rootPassword: process.env.MONGO_ROOT_PASSWORD,
      database: process.env.MONGO_DATABASE || "backend_events",
      port: process.env.MONGO_PORT
        ? parseInt(process.env.MONGO_PORT, 10)
        : 27017,
    },

    jwt: {
      secret: process.env.JWT_SECRET || "",
      expire: process.env.JWT_EXPIRE || "7d",
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpire: process.env.JWT_REFRESH_EXPIRE || "30d",
    },

    mailjet: {
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
      fromEmail: process.env.MAILJET_FROM_EMAIL,
      fromName: process.env.MAILJET_FROM_NAME,
    },

    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
      tracesSampleRate: process.env.SENTRY_TRACES_SAMPLE_RATE
        ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
        : 1.0,
    },

    posthog: {
      apiKey: process.env.POSTHOG_API_KEY,
      host: process.env.POSTHOG_HOST || "https://app.posthog.com",
    },

    cors: {
      origin: process.env.CORS_ORIGIN || "*",
    },

    rateLimit: {
      ttl: process.env.RATE_LIMIT_TTL
        ? parseInt(process.env.RATE_LIMIT_TTL, 10)
        : 60,
      max: process.env.RATE_LIMIT_MAX
        ? parseInt(process.env.RATE_LIMIT_MAX, 10)
        : 100,
    },
  };
};
