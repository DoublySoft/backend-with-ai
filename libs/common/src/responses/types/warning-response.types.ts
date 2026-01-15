import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface WarningResponse extends BaseResponse {
  status: EResponseStatus.WARNING;
  warnings?: string[];
  details?: Record<string, unknown>;
}

export function createWarningResponse({
  message,
  warnings,
  details,
  messageKey,
  path = "/api",
}: {
  message: string;
  warnings?: string[];
  details?: Record<string, unknown>;
  messageKey?: string;
  path?: string;
}): WarningResponse {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.WARNING,
    message,
    messageKey,
    path,
    warnings,
    details,
    timestamp: new Date().toISOString(),
  };
}
