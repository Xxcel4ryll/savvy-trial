import { CanActivate, Type } from '@nestjs/common';
declare const RoleGuard: (allowedRoles: any) => Type<CanActivate>;
export default RoleGuard;
