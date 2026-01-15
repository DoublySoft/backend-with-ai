import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface InfoResponse extends BaseResponse {
  status: EResponseStatus.INFO;
  info?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export function createInfoResponse({
  message,
  messageKey,
  path = "/api",
}: {
  message: string;
  messageKey?: string;
  path?: string;
}): InfoResponse {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.INFO,
    message,
    messageKey,
    path,
    timestamp: new Date().toISOString(),
  };
}
