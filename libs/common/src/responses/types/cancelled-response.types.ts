import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";
import { ECancellationReason } from "../enums/cancellation-reason.enum";

export interface CancelledResponse extends BaseResponse {
  status: EResponseStatus.CANCELLED;
  reason?: ECancellationReason;
  cancelledAt?: string;
}

export function createCancelledResponse({
  message,
  reason,
  cancelledAt,
  messageKey,
  path = "/api",
}: {
  message: string;
  reason?: ECancellationReason;
  cancelledAt?: string;
  messageKey?: string;
  path?: string;
}): CancelledResponse {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.CANCELLED,
    message,
    messageKey,
    path,
    reason,
    cancelledAt: cancelledAt || new Date().toISOString(),
    timestamp: new Date().toISOString(),
  };
}
