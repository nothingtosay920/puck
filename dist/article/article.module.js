"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const category_service_1 = require("../category/category.service");
const label_service_1 = require("../label/label.service");
const gather_service_1 = require("../muster/gather.service");
const muster_service_1 = require("../muster/muster.service");
const feedback_service_1 = require("../recommend/feedback/feedback.service");
const item_service_1 = require("../recommend/item/item.service");
const recommend_service_1 = require("../recommend/recommend/recommend.service");
const users_service_1 = require("../users/users.service");
const article_resolver_1 = require("./article.resolver");
const article_service_1 = require("./article.service");
let ArticleModule = class ArticleModule {
};
ArticleModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [
            app_service_1.AppService,
            gather_service_1.GatherService,
            muster_service_1.MusterService,
            article_service_1.ArticleService,
            article_resolver_1.ArticleResolver,
            recommend_service_1.RecommendService,
            users_service_1.UsersService,
            feedback_service_1.FeedbackService,
            item_service_1.RecommendItemService,
            category_service_1.CategoryService,
            label_service_1.LabelService
        ],
        exports: [recommend_service_1.RecommendService]
    })
], ArticleModule);
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map