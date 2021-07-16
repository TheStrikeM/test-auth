import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import AuthService from '../services/auth.service';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    return this.matchRoles(roles, req.user);
  }

  matchRoles(roles: string[], user: any) {
    const verifiedUser = this.authService.validateUserWithPassword(user);
    if (!verifiedUser) return false;

    const hasRole = roles.indexOf(user.role) > -1;
    return hasRole;
  }
}
