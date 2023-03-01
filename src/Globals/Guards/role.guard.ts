// import Role from '../role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import JwtAuthGuard from './jwt-auth.guard';

const RoleGuard = (allowedRoles): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      allowedRoles = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];
        
      return allowedRoles
        .map((allowedRole) => allowedRole.toUpperCase())
        .includes(user?.role.toUpperCase());
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
