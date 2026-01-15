import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface PendingResponse extends BaseResponse {
  status: EResponseStatus.PENDING;
  jobId?: string;
  estimatedCompletionTime?: number; // in seconds
}

export function createPendingResponse({
  message,
  jobId,
  estimatedCompletionTime,
  messageKey,
  path = "/api",
}: {
  message: string;
  jobId?: string;
  estimatedCompletionTime?: number;
  messageKey?: string;
  path?: string;
}): PendingResponse {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.PENDING,
    message,
    messageKey,
    path,
    jobId,
    estimatedCompletionTime,
    timestamp: new Date().toISOString(),
  };
}
