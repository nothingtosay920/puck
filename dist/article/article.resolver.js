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
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const gather_service_1 = require("../muster/gather.service");
const muster_service_1 = require("../muster/muster.service");
const feedback_service_1 = require("../recommend/feedback/feedback.service");
const users_service_1 = require("../users/users.service");
const article_dto_1 = require("./article.dto");
const article_service_1 = require("./article.service");
let ArticleResolver = class ArticleResolver {
    constructor(articleService, feedbackService, musterService, gatherArticle, userSerivce) {
        this.articleService = articleService;
        this.feedbackService = feedbackService;
        this.musterService = musterService;
        this.gatherArticle = gatherArticle;
        this.userSerivce = userSerivce;
    }
    async getArticleById(id, context) {
        const v = id[0];
        let uid = context.req.session['uid'];
        let status = false;
        let follow_status = false;
        let collection_status = false;
        let res = undefined;
        if (v === 'M') {
            res = await this.getMusterArticle(id);
        }
        else if (v === 'G') {
            res = await this.getGatherArticle(id);
        }
        else {
            return null;
        }
        if (uid) {
            await this.userSerivce.addRecords(uid, id);
            const findUser = await this.userSerivce.findUserZan(uid, id);
            status = findUser.zan_list.length > 0;
            collection_status = findUser.collection.length > 0;
            follow_status = res.befollowed.find((element) => element === uid);
        }
        return Object.assign(Object.assign({}, res), { zan_status: status, follow_status: !!follow_status, collection_status, befollowed: res.befollowed.length });
    }
    async getArticleByIdNotFB(id, context) {
        const v = id[0];
        let res = undefined;
        if (v === 'M') {
            res = await this.getMusterArticle(id);
        }
        else if (v === 'G') {
            res = await this.getGatherArticle(id);
        }
        else {
            return null;
        }
        const findUser = await this.userSerivce.findUserZan(context.req.session['uid'], id);
        const status = findUser.zan_list.length > 0;
        const collection_status = findUser.collection.length > 0;
        const follow_status = res.befollowed.find((element) => element === context.req.session['uid']);
        return Object.assign(Object.assign({}, res), { zan_status: status, follow_status: !!follow_status, collection_status, befollowed: res.befollowed.length });
    }
    async getRecords(page, context) {
        const records = await this.userSerivce.getRecords(page, context.req.session['uid']);
        const res = records.record.map(async (item) => {
            const article_id = item.article_id.split('|')[1];
            const article = await this.getArticleByIdNotFB(article_id, context);
            return Object.assign(Object.assign({}, article), { timestamp: item.timestamp });
        });
        return {
            article_data: res,
            next: page + 1
        };
    }
    async getWritingArticleById(id) {
        const v = id[0];
        let res = undefined;
        let categorys = undefined;
        let labels = undefined;
        if (v === 'M') {
            res = await this.getMusterArticle(id);
            categorys = res.categorys;
            labels = res.labels;
        }
        else {
            res = await this.articleService.getGatherById(id);
            res = Object.assign(Object.assign({}, res), { type: 'GATHER' });
            categorys = res.categorys.map((item) => item.category)[0];
            labels = res.labels.map((item) => item.label);
        }
        return Object.assign(Object.assign({}, res), { categorys,
            labels });
    }
    async getUserSavedApi(context) {
        const collection = await this.userSerivce.getUserSaved(context.req.session['uid']);
        const res = collection.collection.map(async (item) => {
            const article = await this.getArticleById(item.article_id, context);
            return {
                title: article.title,
                hot: article.hot,
                zan: article.zan,
                edit_time: article.edit_time
            };
        });
        return {
            list: res
        };
    }
    async getDraftArticleById(id) {
        const v = id[0];
        let res = undefined;
        if (v === 'M') {
            res = await this.getMusterArticle(id);
        }
        else if (v === 'G') {
            res = await this.articleService.getGatherById(id);
        }
        else {
            throw Error("article_id错误");
        }
        return res;
    }
    addZan(id, type, context) {
        if (type === 'MUSTER') {
            this.articleService.addZanInMuster(id);
        }
        else if (type === 'GATHER') {
            this.articleService.addZanInGather(id);
        }
        this.userSerivce.addUserZan(context.req.session['uid'], id);
        return 200;
    }
    async followedArticle(id, type, context) {
        const uid = context.req.session['uid'];
        await this.articleService.artilceBeFollowed(uid, id, type);
        await this.userSerivce.collection(uid, id, uid + '|' + id);
        return 200;
    }
    async getGatherArticle(article_id) {
        let data = {};
        try {
            data = await this.articleService.getGatherArticle(article_id);
        }
        catch (error) {
            throw new common_1.ForbiddenException('文章id错误');
        }
        const author = await this.gatherArticle.getGather(data.gather);
        const user = await this.userSerivce.findOne(author.authorId);
        return {
            description: author.description,
            article: data.article,
            title: data.title,
            img: data.article_img,
            labels: author.labels.map((item) => item.label),
            categorys: author.categorys[0].category,
            author: author.authorId,
            gather: author.gather_id,
            id: data.outer_id,
            type: data.article_type,
            article_img: data.article_img,
            befollowed: data.befollowed.map((item) => item.user_id),
            author_img: user.user_img,
            author_name: user.name,
            hot: data.hot,
            zan: data.zan,
            edit_time: data.edit_time
        };
    }
    async getMusterArticle(article_id) {
        let data = {};
        try {
            data = await this.articleService.getMusterArticle(article_id);
        }
        catch (error) {
            throw new common_1.ForbiddenException('文章id错误');
        }
        const author = await this.musterService.getMuster(data.muster);
        const user = await this.userSerivce.findOne(author.authorId);
        return {
            description: data.description,
            article: data.article,
            title: data.title,
            img: data.article_img,
            labels: data.labels.map((item) => item.label),
            categorys: data.categorys[0].category,
            author: author.authorId,
            muster: data.muster,
            id: data.outer_id,
            type: data.article_type,
            article_img: data.article_img,
            befollowed: data.befollowed.map((item) => item.user_id),
            author_img: user.user_img,
            author_name: user.name,
            hot: data.hot,
            zan: data.zan,
            edit_time: data.edit_time
        };
    }
    async dynamicApi(content, type, context) {
        switch (type) {
            case 'ZAN':
                return await this.getArticleById(content, context);
            case 'RELEASE':
                return await this.getArticleById(content, context);
            case 'FollowArticle':
                return await this.getArticleById(content, context);
            case 'COLLECTION':
                return await this.getArticleById(content, context);
            case 'Follow':
                return await this.userSerivce.findOne(content);
        }
    }
    async getCollectionArticles(page, context) {
        const list = await (await this.userSerivce.getColletionArticles(context.req.session['uid'], page)).collection;
        const res = list.map(async (item) => {
            return await this.getArticleByIdNotFB(item.article_id, context);
        });
        return {
            list: res,
            next: page + 1,
            count: res.length
        };
    }
    async removeMusterArticleById(id, context) {
        await this.articleService.removeMusterArticleById(id, context.req.session['uid']);
        return 200;
    }
};
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDTO),
    __param(0, (0, graphql_1.Args)('article_id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticleById", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.ArticleDTO),
    __param(0, (0, graphql_1.Args)('article_id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getArticleByIdNotFB", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.RecordsRes),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getRecords", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.DraftArticle),
    __param(0, (0, graphql_1.Args)('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getWritingArticleById", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.collectionList),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getUserSavedApi", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.DraftArticle),
    __param(0, (0, graphql_1.Args)('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getDraftArticleById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Args)("type")),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ArticleResolver.prototype, "addZan", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('type')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "followedArticle", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.DynamicRes),
    __param(0, (0, graphql_1.Args)('content')),
    __param(1, (0, graphql_1.Args)('type')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "dynamicApi", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.collectionArticleRes),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "getCollectionArticles", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "removeMusterArticleById", null);
ArticleResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [article_service_1.ArticleService,
        feedback_service_1.FeedbackService,
        muster_service_1.MusterService,
        gather_service_1.GatherService,
        users_service_1.UsersService])
], ArticleResolver);
exports.ArticleResolver = ArticleResolver;
//# sourceMappingURL=article.resolver.js.map