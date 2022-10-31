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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const article_dto_1 = require("../article/article.dto");
const article_resolver_1 = require("../article/article.resolver");
const search_service_1 = require("./search.service");
let SearchResolver = class SearchResolver {
    constructor(searchService, articleResolver) {
        this.searchService = searchService;
        this.articleResolver = articleResolver;
    }
    async getArtice(id) {
        let res = undefined;
        if (id[0] === 'M') {
            res = await this.articleResolver.getMusterArticle(id);
        }
        else {
            res = await this.articleResolver.getGatherArticle(id);
        }
        return res;
    }
    async Search(query, page) {
        const data = await this.searchService.Search(query, page);
        const res = data.map(async (item) => {
            return await this.getArtice(item);
        });
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.ArticleDTO]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], SearchResolver.prototype, "Search", null);
SearchResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [search_service_1.SearchService,
        article_resolver_1.ArticleResolver])
], SearchResolver);
exports.SearchResolver = SearchResolver;
//# sourceMappingURL=search.resolver.js.map