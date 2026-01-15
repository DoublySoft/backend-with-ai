import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
}

export const GetAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
