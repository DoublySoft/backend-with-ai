import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request } from "express";
import { createSuccessResponse, BaseResponse } from "@libs/common";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse> {
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        // If data is already a formatted response (has code and status), return as is
        if (
          data &&
          typeof data === "object" &&
          "code" in data &&
          "status" in data
        ) {
          return data as BaseResponse;
        }

        // If data is undefined or null, still create a success response
        return createSuccessResponse({
          data: data ?? null,
          message: "Operation completed successfully",
          messageKey: "operation.success",
          path: request.url,
        });
      }),
    );
  }
}
