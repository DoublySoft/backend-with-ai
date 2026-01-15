import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { IS_UNVERIFIED_KEY } from "../decorators/unverified.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = unknown>(
    err: Error,
    user: TUser,
    info: unknown,
    context: ExecutionContext,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException("Authentication required");
    }

    const isUnverified = this.reflector.getAllAndOverride<boolean>(
      IS_UNVERIFIED_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If route is not marked as unverified, check email verification
    if (
      !isUnverified &&
      user &&
      typeof user === "object" &&
      "isEmailVerified" in user
    ) {
      const authUser = user as { isEmailVerified: boolean };
      if (!authUser.isEmailVerified) {
        throw new UnauthorizedException("Email verification required");
      }
    }

    return user;
  }
}
