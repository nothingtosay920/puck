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
const label_service_1 = require("../../label/label.service");
const gather_service_1 = require("../../muster/gather.service");
const muster_service_1 = require("../../muster/muster.service");
const recommend_input_1 = require("./recommend.input");
const recommend_service_1 = require("./recommend.service");
let RecommendResolver = class RecommendResolver {
    constructor(recommendService, articleService, gatherService, musterService, categoryService, labelService) {
        this.recommendService = recommendService;
        this.articleService = articleService;
        this.gatherService = gatherService;
        this.musterService = musterService;
        this.categoryService = categoryService;
        this.labelService = labelService;
    }
    async recommendList(label) {
        const recommendItems = await this.recommendService.latestRecoommend(label.labels);
        return this.handleList(recommendItems);
    }
    handleList(recommendList) {
        return recommendList.map(async (item) => {
            const type = item.Id.slice(0, 1);
            if (type === 'G') {
                const recommenditem = await this.articleService.getGatherArticle(item.Id);
                const gather = await this.gatherService.getGather(recommenditem.gather);
                const category = await this.categoryService.findCategoryById(gather.categorys[0].category);
                const labelsArr = gather.labels.map((item) => {
                    return item.label;
                });
                const labels = await this.labelService.findLabelsById(labelsArr);
                return {
                    article_img: recommenditem.article_img,
                    title: recommenditem.title,
                    type: recommenditem.article_type,
                    gather: recommenditem.gather,
                    labels: labels.map((item) => item.name),
                    categorys: category.name,
                    description: gather.description,
                    outer_id: item.Id,
                    zan: recommenditem.zan,
                    hot: recommenditem.hot,
                    author: gather.authorId,
                    muster: null,
                    edit_time: recommenditem.edit_time
                };
            }
            else if (type === "M") {
                const recommenditem = await this.articleService.getMusterArticle(item.Id);
                const muster = await this.musterService.getMuster(recommenditem.muster);
                const category = await this.categoryService.findCategoryById(recommenditem.categorys[0].category);
                const labelsArr = recommenditem.labels.map((item) => {
                    return item.label;
                });
                const labels = await this.labelService.findLabelsById(labelsArr);
                return {
                    muster: recommenditem.muster,
                    type: recommenditem.article_type,
                    description: recommenditem.description,
                    article_img: recommenditem.article_img,
                    title: recommenditem.title,
                    labels: labels.map((item) => item.name),
                    categorys: category.name,
                    outer_id: item.Id,
                    zan: recommenditem.zan,
                    hot: recommenditem.hot,
                    author: muster.authorId,
                    gather: null,
                    edit_time: recommenditem.edit_time
                };
            }
        });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.ArticleDTO]),
    __param(0, (0, graphql_1.Args)('label')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recommend_input_1.RecommendArticles]),
    __metadata("design:returntype", Promise)
], RecommendResolver.prototype, "recommendList", null);
RecommendResolver = __decorate([
    (0, graphql_1.Resolver)(() => article_dto_1.ArticleDTO),
    __metadata("design:paramtypes", [recommend_service_1.RecommendService,
        article_service_1.ArticleService,
        gather_service_1.GatherService,
        muster_service_1.MusterService,
        category_service_1.CategoryService,
        label_service_1.LabelService])
], RecommendResolver);
exports.RecommendResolver = RecommendResolver;
//# sourceMappingURL=recommend.resolver.js.map