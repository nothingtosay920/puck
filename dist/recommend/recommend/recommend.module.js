"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const app_service_1 = require("../../app.service");
const article_service_1 = require("../../article/article.service");
const recommend_service_1 = require("./recommend.service");
const recommend_resolver_1 = require("./recommend.resolver");
const axios_1 = require("@nestjs/axios");
const gather_service_1 = require("../../muster/gather.service");
const muster_service_1 = require("../../muster/muster.service");
const category_service_1 = require("../../category/category.service");
const label_service_1 = require("../../label/label.service");
let RecommendModule = class RecommendModule {
};
RecommendModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            passport_1.PassportModule,
        ],
        providers: [app_service_1.AppService, recommend_service_1.RecommendService, recommend_resolver_1.RecommendResolver, article_service_1.ArticleService, gather_service_1.GatherService, muster_service_1.MusterService, category_service_1.CategoryService, label_service_1.LabelService],
        exports: [recommend_service_1.RecommendService, axios_1.HttpModule]
    })
], RecommendModule);
exports.RecommendModule = RecommendModule;
//# sourceMappingURL=recommend.module.js.map