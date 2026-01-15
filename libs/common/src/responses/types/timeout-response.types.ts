import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";
import { ETimeoutType } from "../enums/timeout-type.enum";

export interface TimeoutResponse extends BaseResponse {
  status: EResponseStatus.TIMEOUT;
  timeoutType?: ETimeoutType;
  timeoutDuration?: number; // in seconds
  retryAfter?: number; // in seconds
}

export function createTimeoutResponse({
  message,
  timeoutType,
  timeoutDuration,
  retryAfter,
  messageKey,
  path = "/api",
}: {
  message: string;
  timeoutType?: ETimeoutType;
  timeoutDuration?: number;
  retryAfter?: number;
  messageKey?: string;
  path?: string;
}): TimeoutResponse {
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    status: EResponseStatus.TIMEOUT,
    message,
    messageKey,
    path,
    timeoutType,
    timeoutDuration,
    retryAfter,
    timestamp: new Date().toISOString(),
  };
}
