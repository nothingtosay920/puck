"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const users_service_1 = require("../users/users.service");
const app_service_1 = require("../app.service");
const auth_resolver_1 = require("./auth.resolver");
const role_service_1 = require("../role/role.service");
const users_model_1 = require("../users/users.model");
const category_service_1 = require("../category/category.service");
const label_service_1 = require("../label/label.service");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../jwt/constants");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
const search_module_1 = require("../search/search.module");
const feedback_service_1 = require("../recommend/feedback/feedback.service");
const recommend_service_1 = require("../recommend/recommend/recommend.service");
const info_service_1 = require("../info/info.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            search_module_1.SearchModule,
            passport_1.PassportModule,
            users_model_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '7d' },
            }),
            search_module_1.SearchModule
        ],
        providers: [info_service_1.InfoService, auth_service_1.AuthService, app_service_1.AppService, auth_resolver_1.AuthResolver, role_service_1.RoleService, users_service_1.UsersService, category_service_1.CategoryService, label_service_1.LabelService, jwt_strategy_1.JwtStrategy, feedback_service_1.FeedbackService, recommend_service_1.RecommendService],
        exports: [role_service_1.RoleService]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map