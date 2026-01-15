import { HttpStatus, HttpException } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface ErrorResponse extends BaseResponse {
  status: EResponseStatus.ERROR | EResponseStatus.UNAUTHORIZED;
  errors?: Record<string, unknown>;
  stack?: string;
  printLogger?: boolean;
}

export function createErrorResponse({
  code,
  error,
  message,
  messageKey,
  errors,
  path = "/api",
  printLogger = false,
}: {
  code?: HttpStatus;
  error: unknown;
  message?: string;
  messageKey?: string;
  errors?: Record<string, unknown>;
  path?: string;
  printLogger?: boolean;
}): ErrorResponse {
  let httpCode = code || HttpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = message || "An error occurred";
  let errorStatus = EResponseStatus.ERROR;
  let errorDetails: Record<string, unknown> | undefined = errors;
  let shouldPrintLogger = printLogger;

  // Handle NestJS HttpException
  if (error instanceof HttpException) {
    const exceptionResponse = error.getResponse();
    httpCode = error.getStatus();

    if (httpCode === HttpStatus.UNAUTHORIZED) {
      errorStatus = EResponseStatus.UNAUTHORIZED;
    }

    if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
      const responseObj = exceptionResponse as Record<string, unknown>;
      errorMessage = (responseObj.message as string) || errorMessage;
      errorDetails = responseObj.errors as Record<string, unknown> | undefined;

      // Preserve printLogger from nested error response if present
      if (
        "printLogger" in responseObj &&
        typeof responseObj.printLogger === "boolean"
      ) {
        shouldPrintLogger = responseObj.printLogger;
      }
    } else if (typeof exceptionResponse === "string") {
      errorMessage = exceptionResponse;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message || errorMessage;
    if (!errorDetails) {
      errorDetails = { error: error.message };
    }
  } else if (typeof error === "object" && error !== null) {
    errorDetails = error as Record<string, unknown>;
  }

  const response: ErrorResponse = {
    code: httpCode,
    status: errorStatus,
    message: errorMessage,
    messageKey,
    path,
    errors: errorDetails,
    printLogger: shouldPrintLogger,
    timestamp: new Date().toISOString(),
  };

  // Include stack trace only in development
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    response.stack = error.stack;
  }

  return response;
}
