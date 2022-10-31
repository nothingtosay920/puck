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
exports.ArticleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const constants_1 = require("../jwt/constants");
const feedback_service_1 = require("../recommend/feedback/feedback.service");
const item_service_1 = require("../recommend/item/item.service");
const user_service_1 = require("../recommend/user/user.service");
const search_service_1 = require("../search/search.service");
const users_dto_1 = require("../users/users.dto");
const users_service_1 = require("../users/users.service");
const article_dto_1 = require("./article.dto");
const article_service_1 = require("./article.service");
let ArticleResolver = class ArticleResolver {
    constructor(articleService, feedbackService, userSerivce, jwtService, recommendItemService, searchService, rcommendUserService) {
        this.articleService = articleService;
        this.feedbackService = feedbackService;
        this.userSerivce = userSerivce;
        this.jwtService = jwtService;
        this.recommendItemService = recommendItemService;
        this.searchService = searchService;
        this.rcommendUserService = rcommendUserService;
    }
    async getArticleById(id, token) {
        let uid = undefined;
        if (token) {
            uid = this.jwtService.verify(token, {
                secret: constants_1.jwtConstants.secret
            }).uuid;
        }
        let zan_status = false;
        let follow_status = false;
        let collection_status = false;
        let follow_user = false;
        const article = await this.articleService.getArticle(id);
        const gather = await this.articleService.getGather(article.gather_id);
        if (uid) {
            await this.userSerivce.addRecords(uid, id);
            follow_user = await (await this.userSerivce.getFollowUserStatus(uid, gather.author.uuid)).follow.length > 0;
            zan_status = !!article.zan.find((element) => element.authorId === uid);
            follow_status = !!article.info.find((element) => element.uuid === uid);
            collection_status = !!article.collection.find((element) => element.user_id === uid);
            await this.feedbackService.insertFeedbacks({
                FeedbackType: "read",
                Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
                UserId: uid,
                ItemId: id
            });
        }
        return Object.assign(Object.assign({}, article), { zan_status,
            follow_status,
            collection_status,
            follow_user, author: {
                name: gather.author.name,
                user_img: gather.author.user_img,
                uuid: gather.author.uuid
            }, gather, article_type: gather.article_type });
    }
    async insertFeeback(id, vid) {
        await this.rcommendUserService.insertUser({
            UserId: vid,
            Labels: []
        });
        await this.feedbackService.insertFeedbacks({
            FeedbackType: "read",
            Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
            UserId: vid,
            ItemId: id
        });
        return 200;
    }
    async getArticleByIdNotFB(id, context) {
        const uid = context.req.session['uid'];
        let zan_status = false;
        let follow_status = false;
        let collection_status = false;
        let user = undefined;
        const article = await this.articleService.getArticle(id);
        const gather = await this.articleService.getGather(article.gather_id);
        if (uid) {
            user = await this.userSerivce.findOne(uid);
            zan_status = !!article.zan.find((element) => element.authorId === uid);
            follow_status = !!article.info.find((element) => element.uuid === uid);
            collection_status = !!article.collection.find((element) => element.user_id === uid);
        }
        return Object.assign(Object.assign({}, article), { zan_status,
            follow_status,
            collection_status, author: {
                name: user.name,
                user_img: user.user_img,
                uuid: user.uuid
            }, gather, article_type: gather.article_type });
    }
    async removeArticleById(id) {
        await this.articleService.removeArticleById(id);
        return 200;
    }
    async getRecords(page, context) {
        const records = await this.userSerivce.getRecords(page, context.req.session['uid']);
        const res = records.record.map(async (item) => {
            const article = await this.getArticleByIdNotFB(item.article_id, context);
            return Object.assign(Object.assign({}, article), { timestamp: item.timestamp });
        });
        return {
            data: res,
            next: page + 1
        };
    }
    async Search(query, page) {
        const data = await this.searchService.Search(query, page);
        const res = data.map(async (item) => {
            const article = await this.articleService.getArticle(item);
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
    async SearchAuthorArticle(query, author_id, page) {
        const data = await this.articleService.searchAuthorArticle(query, author_id, page);
        return {
            data,
            next: page + 1,
        };
    }
    async SearchAllArticle(query, page, context) {
        const res = await this.articleService.searchAllArticle(query, context.req.session['uid']);
        return {
            data: res.articles,
            next: page + 1
        };
    }
    async getUserSavedApi(context) {
        const collection = await this.userSerivce.getUserSaved(context.req.session['uid']);
        const res = collection.collection.map(async (item) => {
            return await this.articleService.getArticle(item.article_id);
        });
        return {
            data: res
        };
    }
    async collectArticle(id, context) {
        const uid = context.req.session['uid'];
        const data = await (await this.userSerivce.findArticleCollect(id, uid)).collection;
        if (data.length) {
            await this.userSerivce.removeCollect(uid, id);
        }
        else {
            await this.userSerivce.collection(uid, id);
        }
        return 200;
    }
    async dynamicApi(content, type, context) {
        switch (type) {
            case 'ZAN':
                return await this.getArticleByIdNotFB(content, context);
            case 'RELEASE':
                return await this.getArticleByIdNotFB(content, context);
            case 'FollowArticle':
                return await this.getArticleByIdNotFB(content, context);
            case 'COLLECTION':
                return await this.getArticleByIdNotFB(content, context);
            case 'Follow':
                const user = await this.userSerivce.findOne(content);
                return {
                    author: user
                };
        }
    }
    async getDraft(page, context) {
        const data = await this.userSerivce.getDraft(context.req.session['uid'], page);
        const res = data.draft.map(async (item) => {
            console.log(item);
            return await this.getArticleByIdNotFB(item.article_id, context);
        });
        return {
            data: res,
            next: page + 1,
        };
    }
    async getCollectionArticles(page, context) {
        const list = await (await this.userSerivce.getColletionArticles(context.req.session['uid'], page)).collection;
        const res = list.map(async (item) => {
            return await this.getArticleByIdNotFB(item.article_id, context);
        });
        return {
            data: res,
            next: page + 1,
        };
    }
    async indexPanelArticle(context) {
        const lastestRecords = await (await this.userSerivce.getLastetRecords(context.req.session['uid'])).record[0].article_id;
        const value = await this.recommendItemService.getItemNeighbors(lastestRecords);
        console.log(value);
        return 200;
    }
    async getArticleNeighbors(id) {
        const v = await this.recommendItemService.getItemNeighbors(id);
        console.log(v);
        return 200;
    }
    async followArticle(id, context) {
        const uid = context.req.session['uid'];
        const data = await (await this.articleService.findArticleFollow(id, uid)).info;
        if (data.length) {
            await this.articleService.remoceArticleFollow(id, uid);
        }
        else {
            await this.articleService.artilceBeFollowed(uid, id);
        }
        return 200;
    }
    async getUserMessage(page, context) {
        const data = await (await this.userSerivce.getMessage(context.req.session['uid'], page)).message;
        return {
            data,
            next: page + 1,
        };
    }
    async getWritingArticle(id) {
        const article = await this.articleService.getArticle(id);
        const gather = await this.articleService.getGather(article.gather_id);
        return {
            type: gather.article_type,
            article_data: gather.article_type === 'GATHER' ? gather.articles : [article],
            gather_id: gather.gather_id,
            gather_name: gather.gather_name,
            gather_img: gather.gather_img,
            category: article.categorys[0].category_id,
            labels: article.labels.map((item) => item.label_id),
            article_description: gather.article_description
        };
    }
    async getArticlePanelStatus(article_id, context) {
        const uid = context.req.session['uid'];
        const res = {
            zan_status: false,
            collect_status: false,
            follow_status: false
        };
        if (uid) {
            const data = await this.articleService.getArticlePanelStatus(uid, article_id);
            res.zan_status = data.zan.length > 0;
            res.collect_status = data.collection.length > 0;
            res.follow_status = data.follow.length > 0;
        }
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleData),
    __param(0, (0, graphql_1.Args)('article_id')),
    __param(1, (0, graphql_1.Args)('token', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticleById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('article_id')),
    __param(1, (0, graphql_1.Args)('vid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "insertFeeback", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleData),
    __param(0, (0, graphql_1.Args)('article_id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticleByIdNotFB", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "removeArticleById", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.RecordsDataPagenation),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getRecords", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDataPagenation),
    __param(0, (0, graphql_1.Args)('query')),
    __param(1, (0, graphql_1.Args)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "Search", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.AllArticlesPagenation),
    __param(0, (0, graphql_1.Args)('query')),
    __param(1, (0, graphql_1.Args)('author')),
    __param(2, (0, graphql_1.Args)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "SearchAuthorArticle", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDataPagenation),
    __param(0, (0, graphql_1.Args)('query')),
    __param(1, (0, graphql_1.Args)('page')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "SearchAllArticle", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDataPagenation),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getUserSavedApi", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "collectArticle", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleData),
    __param(0, (0, graphql_1.Args)('content')),
    __param(1, (0, graphql_1.Args)('type')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "dynamicApi", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDataPagenation),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getDraft", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDataPagenation),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getCollectionArticles", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "indexPanelArticle", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticleNeighbors", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)("article_id")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "followArticle", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.MessageDataRes, { nullable: true }),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getUserMessage", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.WritingArticle),
    __param(0, (0, graphql_1.Args)('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getWritingArticle", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticlePanelStatus),
    __param(0, (0, graphql_1.Args)('artcle_id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticlePanelStatus", null);
ArticleResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [article_service_1.ArticleService,
        feedback_service_1.FeedbackService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        item_service_1.RecommendItemService,
        search_service_1.SearchService,
        user_service_1.RcommendUserService])
], ArticleResolver);
exports.ArticleResolver = ArticleResolver;
//# sourceMappingURL=article.resolver.js.map