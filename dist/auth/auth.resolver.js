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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_auth_guard_1 = require("../guard/user-auth.guard");
const users_dto_1 = require("../users/users.dto");
const users_input_1 = require("../users/users.input");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    Login(phone, context) {
        return this.authService.Login(phone, context);
    }
    Test() {
        return 'test';
    }
    createMusterArticle(mArticle, context) {
        return this.userService.createMusterArticle(mArticle, context);
    }
    async getUserData(context) {
        return this.authService.getUserData(context);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => users_dto_1.LoginDTO),
    __param(0, (0, graphql_1.Args)("phone")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "Login", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "Test", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => users_dto_1.Users),
    __param(0, (0, graphql_1.Args)("mArticle")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.musterInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "createMusterArticle", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.UsersDATA),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getUserData", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map