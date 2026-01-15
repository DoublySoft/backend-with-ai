import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Request, Response } from "express";
import { AuthUser } from "@libs/contracts";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthUser }>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, query } = request;
    const user: AuthUser | undefined = request.user;
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(`Incoming request: ${method} ${url}`, {
      method,
      url,
      query: Object.keys(query).length > 0 ? query : undefined,
      userId: user?.id,
      userEmail: user?.email,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          this.logger.log(
            `Request completed: ${method} ${url} - ${statusCode} (${duration}ms)`,
            {
              method,
              url,
              statusCode,
              duration,
              userId: user?.id,
            },
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error?.status || 500;

          this.logger.error(
            `Request failed: ${method} ${url} - ${statusCode} (${duration}ms)`,
            error instanceof Error ? error.stack : error,
            {
              method,
              url,
              statusCode,
              duration,
              userId: user?.id,
              error: error?.message,
            },
          );
        },
      }),
    );
  }
}
