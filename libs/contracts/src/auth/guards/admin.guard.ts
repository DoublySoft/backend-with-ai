import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { EUserRole } from "../../user/enums/user-role.enum";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("User not found");
    }

    if (!user.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException("User roles not found");
    }

    const hasAdminRole = user.roles.includes(EUserRole.ADMIN);

    if (!hasAdminRole) {
      throw new ForbiddenException("Admin access required");
    }

    return true;
  }
}
