import { HttpStatus } from "@nestjs/common";
import { SuccessResponse } from "./success-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface PaginatedMeta extends Record<string, unknown> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  nextPage?: number;
  previousPage?: number;
}

export interface MetaResponse<T = unknown, M = unknown> extends SuccessResponse<
  T[]
> {
  meta: M;
}

export function createPaginatedResponse<
  T = unknown,
  M extends PaginatedMeta = PaginatedMeta,
>({
  data,
  message,
  page,
  limit,
  total,
  messageKey,
  path = "/api",
  additionalMeta,
}: {
  data: T[];
  message: string;
  page: number;
  limit: number;
  total: number;
  messageKey?: string;
  path?: string;
  additionalMeta?: Omit<M, keyof PaginatedMeta>;
}): MetaResponse<T, M> {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const meta: M = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage: hasNextPage ? page + 1 : undefined,
    previousPage: hasPreviousPage ? page - 1 : undefined,
    ...additionalMeta,
  } as M;

  return {
    code: HttpStatus.OK,
    status: EResponseStatus.SUCCESS,
    message,
    messageKey,
    path,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };
}
