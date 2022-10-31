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
exports.RecommendResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const article_dto_1 = require("../../article/article.dto");
const article_service_1 = require("../../article/article.service");
const category_service_1 = require("../../category/category.service");
const recommend_dto_1 = require("./recommend.dto");
const recommend_service_1 = require("./recommend.service");
let RecommendResolver = class RecommendResolver {
    constructor(recommendService, articleService, categoryService) {
        this.recommendService = recommendService;
        this.articleService = articleService;
        this.categoryService = categoryService;
    }
    async recommendList(label, newest, page) {
        if (newest === 'newest') {
            return this.latestList(label, page);
        }
        else {
            return this.popularList(label, page);
        }
    }
    async latestList(label, page) {
        const list = await this.recommendService.latestRecoommend(label, page);
        const res = list.map(async (item) => {
            const article = await this.articleService.getArticle(item.Id);
            const gather = await this.articleService.getGather(article.gather_id);
            return Object.assign(Object.assign({}, article), { gather, author: {
                    name: gather.author.name,
                    uuid: gather.author.uuid,
                    user_img: gather.author.user_img
                }, article_type: gather.article_type });
        });
        return {
            data: res,
            next: page + 1
        };
    }
    async popularList(label, page) {
        const list = await this.recommendService.popularRecommend(label, page);
        const res = list.map(async (item) => {
            const article = await this.articleService.getArticle(item.Id);
            const gather = await this.articleService.getGather(article.gather_id);
            return Object.assign(Object.assign({}, article), { gather, author: {
                    name: gather.author.name,
                    uuid: gather.author.uuid,
                    user_img: gather.author.user_img
                }, article_type: gather.article_type });
        });
        return {
            data: res,
            next: page + 1
        };
    }
    async userRecommend(context, page) {
        const uid = context.req.session['uid'];
        let data = await this.recommendService.userRecommend(uid, page);
        if (!data) {
            data = [''];
        }
        return {
            data: data,
            next: page + 1
        };
    }
    async relateRecommend(label, context) {
        const uid = context.req.session['uid'];
        let data = [];
        if (uid) {
            try {
                data = await this.recommendService.relateRecommend(uid);
            }
            catch (error) {
                data = [];
            }
        }
        else {
            try {
                const category = await (await this.categoryService.findCategoryById(label)).description;
                const res = await this.recommendService.popularRelate(category);
                data = res.map((item) => item.Id);
            }
            catch (error) {
                data = [];
            }
        }
        if (data === null) {
            data = [];
        }
        const res = data.map(async (item) => {
            const article = await this.articleService.getArticle(item);
            const gather = await this.articleService.getGather(article.gather_id);
            return Object.assign(Object.assign({}, article), { gather, author: {
                    name: gather.author.name,
                    uuid: gather.author.uuid,
                    user_img: gather.author.user_img
                }, article_type: gather.article_type });
        });
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)(() => recommend_dto_1.RecommendRes, { nullable: true }),
    __param(0, (0, graphql_1.Args)('label')),
    __param(1, (0, graphql_1.Args)('newest')),
    __param(2, (0, graphql_1.Args)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], RecommendResolver.prototype, "recommendList", null);
__decorate([
    (0, graphql_1.Query)(() => recommend_dto_1.RelateRecommendRes),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], RecommendResolver.prototype, "userRecommend", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.ArticleData]),
    __param(0, (0, graphql_1.Args)('label')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RecommendResolver.prototype, "relateRecommend", null);
RecommendResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [recommend_service_1.RecommendService,
        article_service_1.ArticleService,
        category_service_1.CategoryService])
], RecommendResolver);
exports.RecommendResolver = RecommendResolver;
//# sourceMappingURL=recommend.resolver.js.map