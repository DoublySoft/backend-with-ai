import { HttpStatus } from "@nestjs/common";
import { BaseResponse } from "./base-response.types";
import { EResponseStatus } from "../enums/response-status.enum";

export interface ProcessingResponse extends BaseResponse {
  status: EResponseStatus.PROCESSING;
  progress?: number; // 0-100
  stage?: string;
  estimatedTimeRemaining?: number; // in seconds
  currentStep?: string;
  totalSteps?: number;
  currentStepNumber?: number;
}

export function createProcessingResponse({
  message,
  progress,
  stage,
  estimatedTimeRemaining,
  currentStep,
  totalSteps,
  currentStepNumber,
  messageKey,
  path = "/api",
}: {
  message: string;
  progress?: number;
  stage?: string;
  estimatedTimeRemaining?: number;
  currentStep?: string;
  totalSteps?: number;
  currentStepNumber?: number;
  messageKey?: string;
  path?: string;
}): ProcessingResponse {
  return {
    code: HttpStatus.OK,
    status: EResponseStatus.PROCESSING,
    message,
    messageKey,
    path,
    progress,
    stage,
    estimatedTimeRemaining,
    currentStep,
    totalSteps,
    currentStepNumber,
    timestamp: new Date().toISOString(),
  };
}
