import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isUser = request.user && !request.user.isAdmin;

    if (!isUser) {
      throw new ForbiddenException('Access denied. This is not for administrators.');
    }

    return true;
  }
}
