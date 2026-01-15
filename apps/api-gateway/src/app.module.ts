import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ClsModule } from "nestjs-cls";
import { DatabaseModule } from "@libs/database";
import { CommonModule } from "@libs/common";
import { envValidationSchema } from "@libs/environment";
import { IndexModule } from "./index/index.module";
import { ApiGatewayCommonModule } from "./common/common.module";

@Module({
  imports: [
    // Configuration module with Joi validation
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    // Event emitter for internal events
    EventEmitterModule.forRoot(),

    // Request context module (nestjs-cls)
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req) => {
          // Generate correlation ID from request header or generate new one
          return (
            req.headers["x-correlation-id"] ||
            `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          );
        },
      },
    }),

    // Global modules
    DatabaseModule,
    CommonModule,

    // API Gateway common module (filters, interceptors)
    ApiGatewayCommonModule,

    // Application modules
    IndexModule,
  ],
})
export class AppModule {}
