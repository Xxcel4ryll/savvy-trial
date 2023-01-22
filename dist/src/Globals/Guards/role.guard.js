"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const RoleGuard = (allowedRoles) => {
    class RoleGuardMixin extends jwt_auth_guard_1.default {
        async canActivate(context) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            allowedRoles = Array.isArray(allowedRoles)
                ? allowedRoles
                : [allowedRoles];
            return allowedRoles
                .map((allowedRole) => allowedRole.toUpperCase())
                .includes(user === null || user === void 0 ? void 0 : user.role.toUpperCase());
        }
    }
    return (0, common_1.mixin)(RoleGuardMixin);
};
exports.default = RoleGuard;
//# sourceMappingURL=role.guard.js.map