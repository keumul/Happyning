import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isAdmin = request.user && request.user.isAdmin;

    if (!isAdmin) {
      throw new ForbiddenException('Access denied. User is not an administrator.');
    }

    return true;
  }
}
