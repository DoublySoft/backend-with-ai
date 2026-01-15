import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { createErrorResponse } from "@libs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Create standardized error response
    const errorResponse = createErrorResponse({
      error: exception,
      path: request.url,
      printLogger: !(exception instanceof HttpException),
    });

    // Log error details
    if (errorResponse.printLogger) {
      this.logger.error(
        `Unhandled exception: ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
        {
          method: request.method,
          url: request.url,
          statusCode: errorResponse.code,
          error: errorResponse.message,
        },
      );
    } else {
      // For HttpExceptions, log at appropriate level based on status code
      const statusCode = errorResponse.code;
      if (statusCode >= 500) {
        this.logger.error(
          `Server error: ${request.method} ${request.url} - ${statusCode}`,
          exception instanceof Error ? exception.stack : String(exception),
          {
            method: request.method,
            url: request.url,
            statusCode,
            error: errorResponse.message,
          },
        );
      } else if (statusCode >= 400) {
        this.logger.warn(
          `Client error: ${request.method} ${request.url} - ${statusCode}`,
          {
            method: request.method,
            url: request.url,
            statusCode,
            error: errorResponse.message,
          },
        );
      }
    }

    // Send error response
    response.status(errorResponse.code).json(errorResponse);
  }
}
