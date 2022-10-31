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
const date_fns_1 = require("date-fns");
const article_dto_1 = require("../article/article.dto");
const user_auth_guard_1 = require("../guard/user-auth.guard");
const feedback_service_1 = require("../recommend/feedback/feedback.service");
const recommend_service_1 = require("../recommend/recommend/recommend.service");
const user_dto_1 = require("../recommend/user/user.dto");
const users_dto_1 = require("../users/users.dto");
const users_input_1 = require("../users/users.input");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService, userService, feedbackService, recommendService) {
        this.authService = authService;
        this.userService = userService;
        this.feedbackService = feedbackService;
        this.recommendService = recommendService;
    }
    async Login(phone, context) {
        await this.authService.Login(phone, context);
        return 200;
    }
    async addArticle(data, context) {
        await this.userService.createArticle(data, context.req.session['uid']);
        return 200;
    }
    async savedArticle(data, context) {
        await this.userService.saveArticle(data, context.req.session['uid']);
        return 200;
    }
    async createMuster(data, context) {
        await this.userService.createColumn(data, context.req.session['uid']);
        return 200;
    }
    async getMusterColumn(context) {
        const articles = await this.userService.getColumn(context.req.session['uid']);
        return articles.articles;
    }
    async getColumnArticles(data) {
        return await this.userService.getColumnArticle(data);
    }
    async addZan(id, context) {
        const uid = context.req.session['uid'];
        const zan = await (await this.userService.findZan(uid, id)).zan;
        if (zan.length) {
            await this.userService.removeZan(uid, id);
        }
        else {
            await this.userService.addZan(uid, id);
            await this.feedbackService.insertFeedbacks({
                FeedbackType: "star",
                Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
                UserId: uid,
                ItemId: id
            });
        }
        return 200;
    }
    async getUserInfo(context) {
        return await this.userService.getUserInfo(context.req.session['uid']);
    }
    async getDynamic(page, context) {
        const res = await this.userService.getDynamic(context.req.session['uid'], page);
        return {
            dynamic: res.dynamic,
            next: page + 1,
            count: res.dynamic.length
        };
    }
    async getBaseMusterInfo(context) {
        return await (await this.userService.getBaseMusterInfo(context.req.session['uid'])).articles;
    }
    async getSingleInfo(context) {
        const data = await this.userService.getSingleInfo(context.req.session['uid']);
        const res = data.articles.reduce((prev, current) => {
            prev.push(...current.articles.map((item) => {
                return Object.assign(Object.assign({}, item), { article_type: current.article_type });
            }));
            return prev;
        }, []);
        return res;
    }
    async getAllColumnArtilces(page, context) {
        const data = await this.userService.getAllColumnArtilcesPagenation(context.req.session['uid'], page);
        return {
            data: data.articles,
            next: page + 1
        };
    }
    async getGatherArtilces(context) {
        const data = await this.userService.getAllGatherArticlesPagenation(context.req.session['uid']);
        return data.articles;
    }
    async getAllArticlesPagenation(page, context) {
        const articles = await this.userService.getAllArticles(context.req.session['uid'], page);
        return {
            data: articles,
            next: page + 1,
        };
    }
    async getAllArticles(context) {
        const articles = await this.userService.getAllArticles(context.req.session['uid']);
        return articles;
    }
    LogOut(context) {
        this.authService.LogOut(context);
        return 200;
    }
    async getUserData(context) {
        const uid = context.req.session['uid'];
        if (uid) {
            return await this.authService.getUserData(uid);
        }
        else {
            return {
                name: null,
                uuid: null,
                user_img: null
            };
        }
    }
    async followedUser(context, followed_id) {
        const uid = context.req.session['uid'];
        await this.userService.followUser(uid, followed_id);
        await this.userService.addInfo(followed_id, uid);
        return 200;
    }
    async getBeFollowedNum(context) {
        return (await this.userService.userBeFollowed(context.req.session['uid'])).info;
    }
    async getUserRecommend(page, context) {
        return await this.recommendService.userRecommend(context.req.session['uid'], page);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)("phone")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "Login", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.SavedArticleInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "addArticle", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.SavedArticleInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "savedArticle", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.GatherInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "createMuster", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.GatherData]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getMusterColumn", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.GatherData),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getColumnArticles", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "addZan", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.BaseUserInfo),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getUserInfo", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.DynamicApiRes),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getDynamic", null);
__decorate([
    (0, graphql_1.Query)(() => [users_dto_1.BaseMusterData], { nullable: true }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getBaseMusterInfo", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.ArticleData]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getSingleInfo", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.AllGatherPagenation),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllColumnArtilces", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.GatherData]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getGatherArtilces", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.AllArticlesPagenation),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllArticlesPagenation", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.AllArticlesInfo]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllArticles", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "LogOut", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.UsersDATA, { nullable: true }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getUserData", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)('followed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "followedUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_dto_1.UserBeFollowed),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getBeFollowedNum", null);
__decorate([
    (0, graphql_1.Query)(() => [String], { nullable: true }),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getUserRecommend", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        feedback_service_1.FeedbackService,
        recommend_service_1.RecommendService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map