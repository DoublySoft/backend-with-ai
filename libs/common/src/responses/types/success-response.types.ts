import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface SuccessResponse<T = unknown> extends BaseResponse {
  status: EResponseStatus.SUCCESS;
  data?: T;
}

export function createSuccessResponse<T = unknown>({
  data,
  message,
  messageKey,
  path = "/api",
}: {
  data: T;
  message: string;
  messageKey?: string;
  path?: string;
}): SuccessResponse<T> {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.SUCCESS,
    message,
    messageKey,
    path,
    data,
    timestamp: new Date().toISOString(),
  };
}
