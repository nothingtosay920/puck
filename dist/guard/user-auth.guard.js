"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const role_service_1 = require("../role/role.service");
let UserAuthGuard = class UserAuthGuard {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        let uid = req.session['uid'];
        if (!uid) {
            throw new common_1.UnauthorizedException('用户未登录');
        }
        const userRole = (await this.roleService.findOne(uid)).role;
        if (userRole === 'USER') {
            return true;
        }
        else {
            return false;
        }
    }
};
UserAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(role_service_1.RoleService)),
    __metadata("design:paramtypes", [Object])
], UserAuthGuard);
exports.UserAuthGuard = UserAuthGuard;
//# sourceMappingURL=user-auth.guard.js.map