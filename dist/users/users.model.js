"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const category_service_1 = require("../category/category.service");
const label_service_1 = require("../label/label.service");
const item_module_1 = require("../recommend/item/item.module");
const user_model_1 = require("../recommend/user/user.model");
const user_service_1 = require("../recommend/user/user.service");
const search_module_1 = require("../search/search.module");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_model_1.RecommendUserModule,
            item_module_1.RecommendItemModule,
            search_module_1.SearchModule
        ],
        providers: [users_service_1.UsersService, app_service_1.AppService, user_service_1.RcommendUserService, category_service_1.CategoryService, label_service_1.LabelService],
        exports: [user_model_1.RecommendUserModule, item_module_1.RecommendItemModule]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.model.js.map