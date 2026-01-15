import { HttpStatus } from "@nestjs/common";
import { EResponseStatus } from "../enums/response-status.enum";

export interface BaseResponse {
  code: HttpStatus;
  status: EResponseStatus;
  message: string;
  messageKey?: string;
  path: string;
  timestamp: string;
}
