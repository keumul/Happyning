import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ModeratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.user && request.user.role;

    if (role !== 'moderator') {
      throw new ForbiddenException('Access denied. User is not a moderator.');
    }

    return true;
  }
}
