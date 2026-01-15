import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface PartialResponse<T = unknown> extends BaseResponse {
  status: EResponseStatus.PARTIAL;
  data?: T;
  succeeded?: number;
  failed?: number;
  total?: number;
  errors?: Array<{
    item: unknown;
    error: string;
    index?: number;
  }>;
}

export function createPartialResponse<T = unknown>({
  data,
  message,
  succeeded,
  failed,
  total,
  errors,
  messageKey,
  path = "/api",
}: {
  data: T;
  message: string;
  succeeded: number;
  failed: number;
  total: number;
  errors?: Array<{ item: unknown; error: string; index?: number }>;
  messageKey?: string;
  path?: string;
}): PartialResponse<T> {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.PARTIAL,
    message,
    messageKey,
    path,
    data,
    succeeded,
    failed,
    total,
    errors,
    timestamp: new Date().toISOString(),
  };
}
