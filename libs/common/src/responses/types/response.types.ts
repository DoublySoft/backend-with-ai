import { SuccessResponse } from "./success-response.types";
import { ErrorResponse } from "./error-response.types";
import { WarningResponse } from "./warning-response.types";
import { InfoResponse } from "./info-response.types";
import { PartialResponse } from "./partial-response.types";
import { PendingResponse } from "./pending-response.types";
import { ProcessingResponse } from "./processing-response.types";
import { CancelledResponse } from "./cancelled-response.types";
import { TimeoutResponse } from "./timeout-response.types";
import { MetaResponse } from "./meta-response.types";
import { CursorResponse } from "./cursor-response.types";

export type Response<T = unknown> =
  | SuccessResponse<T>
  | ErrorResponse
  | WarningResponse
  | InfoResponse
  | PartialResponse<T>
  | PendingResponse
  | ProcessingResponse
  | CancelledResponse
  | TimeoutResponse
  | MetaResponse<T>
  | CursorResponse<T>;
