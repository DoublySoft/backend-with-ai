import { HttpStatus } from "@nestjs/common";
import { SuccessResponse } from "./success-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface CursorMeta extends Record<string, unknown> {
  cursor?: string;
  limit: number;
  hasMore: boolean;
  nextCursor?: string;
}

export interface CursorResponse<T = unknown> extends SuccessResponse<T[]> {
  meta: CursorMeta;
}

export function createCursorResponse<T = unknown>({
  data,
  message,
  limit,
  hasMore,
  cursor,
  nextCursor,
  messageKey,
  path = "/api",
}: {
  data: T[];
  message: string;
  limit: number;
  hasMore: boolean;
  cursor?: string;
  nextCursor?: string;
  messageKey?: string;
  path?: string;
}): CursorResponse<T> {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.SUCCESS,
    message,
    messageKey,
    path,
    data,
    meta: {
      cursor,
      limit,
      hasMore,
      nextCursor,
    },
    timestamp: new Date().toISOString(),
  };
}
