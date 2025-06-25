import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpStatus, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { CustomForbiddenException } from 'src/exceptions/custom-forbidden.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredRoles.includes(user.role)) {
      //throw new HttpException('Message d’erreur', HttpStatus.CREATED);
       //throw new ForbiddenException('Accès refusé');
      //throw new CustomForbiddenException('STEP2Error', 40301);
    }

    return true;
  }
}