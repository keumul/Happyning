import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.user && request.user.role;

    if (role !== 'user') {
      throw new ForbiddenException('Access denied. This is only for users.');
    }

    return true;
  }
}
