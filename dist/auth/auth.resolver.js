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
const article_dto_1 = require("../article/article.dto");
const article_input_1 = require("../article/article.input");
const user_auth_guard_1 = require("../guard/user-auth.guard");
const users_dto_1 = require("../users/users.dto");
const users_input_1 = require("../users/users.input");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    Login(phone, context) {
        return this.authService.Login(phone, context);
    }
    async addMuster(data, context) {
        return await this.userService.createMuster(data, context.req.session['uid']);
    }
    savedMuster(data, context) {
        return this.userService.savedMuster(data, context.req.session['uid']);
    }
    addGather(data, context) {
        console.log(data.labels);
        return this.userService.createGather(data, context.req.session['uid']);
    }
    saveGather(data, context) {
        return this.userService.savedGather(data, context.req.session['uid']);
    }
    async createMuster(data, context) {
        await this.userService.cMuster(data, context.req.session['uid']);
        return 200;
    }
    async getMusterColumn(context) {
        return await (await this.userService.getMusterColumn(context.req.session['uid'])).muster_data;
    }
    getUserInfo(context) {
        return this.userService.getUserInfo(context.req.session['uid']);
    }
    async getDraft(context) {
        const user = await this.userService.getDraft(context.req.session['uid']);
        return user.draft;
    }
    async getDynamic(page, context) {
        const res = await this.userService.getDynamic(context.req.session['uid'], page);
        return {
            dynamic: res.dynamic,
            next: page + 1,
            count: res.dynamic.length
        };
    }
    getBaseMusterInfo(context) {
        return this.userService.getBaseMusterInfo(context.req.session['uid']);
    }
    async saveArticle(data, context) {
        await this.userService.saveArticle(context.req.session['uid'], data);
        return 200;
    }
    async getAllMuster(page, context) {
        const article = await this.userService.getAllMusterArticles(context.req.session['uid'], page);
        const res = article.map((item) => {
            return Object.assign(Object.assign({}, item), { author_name: item.author.name, author: item.author.uuid_user, article_data: item.article_data.length, name: item.name ? item.name : item.article_data[0].title, muster_img: item.muster_img ? item.muster_img : item.article_data[0].article_img, description: item.description ? item.description : item.article_data[0].description, article_id: item.type === 'SINGLE' ? item.article_data[0].outer_id : null });
        });
        return res;
    }
    async getMusterInfoById(mid) {
        return await this.userService.getMusterArticleById(mid);
    }
    async getGatherArtilces(context) {
        const article = await this.userService.getAllGatherArticlesPagenation(context.req.session['uid']);
        const res = article.map((item) => {
            return Object.assign(Object.assign({}, item), { author_name: item.author.name, author: item.author.uuid_user, article_data: item.article_data.map((item) => {
                    return Object.assign(Object.assign({}, item), { befollowed: item.befollowed.length });
                }) });
        });
        return res;
    }
    async getAllArticles(page, context) {
        const muster = await this.userService.getAllMusterArticlesPagenation(context.req.session['uid'], page);
        const musterArticle = muster.reduce((prev, current) => {
            prev.push(...current.article_data);
            return prev;
        }, []);
        const gather = await (await this.userService.getAllGatherArticlesPagenation(context.req.session['uid'], page)).reduce((prev, current) => {
            prev.push(...current.article_data.map((item) => {
                return Object.assign(Object.assign({}, item), { labels: current.labels });
            }));
            return prev;
        }, []);
        const res = [...musterArticle, ...gather].sort((a, b) => {
            return a.edit_time - b.edit_time;
        });
        return {
            AllArticles: res,
            next: page + 1,
            count: res.length
        };
    }
    LogOut(context) {
        console.log(context.req.session['uid']);
        return this.authService.LogOut(context);
    }
    async getWritingArticle(uid) {
        return await this.userService.getWritingArticle(uid);
    }
    getUserData(context) {
        return this.authService.getUserData(context);
    }
    async followedUser(uid, followed_id) {
        await this.userService.followUser(uid, followed_id);
        await this.userService.beFollowUser(followed_id, uid);
        return 200;
    }
    async getBeFollowedNum(context) {
        return (await this.userService.userBeFollowedNum(context.req.session['uid'])).be_follow.length;
    }
    async getBeFollowedStatus(follow_user, context) {
        return await (await this.userService.userBeFollowedStatus(context.req.session['uid'], follow_user)).be_follow.length > 0;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => users_dto_1.LoginDTO),
    __param(0, (0, graphql_1.Args)("phone")),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "Login", null);
__decorate([
    (0, graphql_1.Mutation)(() => article_dto_1.AddArticleRes),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.MusterInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "addMuster", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.MusterInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "savedMuster", null);
__decorate([
    (0, graphql_1.Mutation)(() => article_dto_1.AddArticleRes),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.GatherInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "addGather", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_input_1.GatherInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "saveGather", null);
__decorate([
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_input_1.CMuster, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "createMuster", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.MusterColumn]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getMusterColumn", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.BaseUserInfo),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "getUserInfo", null);
__decorate([
    (0, graphql_1.Query)(() => [users_dto_1.Draft]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getDraft", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.DynamicApiRes),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getDynamic", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.BaseMusterInfo),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "getBaseMusterInfo", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "saveArticle", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.Polymerization]),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllMuster", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.MusterArticleById),
    __param(0, (0, graphql_1.Args)('mid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getMusterInfoById", null);
__decorate([
    (0, graphql_1.Query)(() => [article_dto_1.Polymerization]),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getGatherArtilces", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.AllArticlesRes),
    __param(0, (0, graphql_1.Args)('page')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getAllArticles", null);
__decorate([
    (0, graphql_1.Mutation)(() => users_dto_1.LogOutDto),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "LogOut", null);
__decorate([
    (0, graphql_1.Query)(() => article_dto_1.WritingList),
    __param(0, (0, graphql_1.Args)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getWritingArticle", null);
__decorate([
    (0, graphql_1.Query)(() => users_dto_1.UsersDATA),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "getUserData", null);
__decorate([
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    (0, graphql_1.Mutation)(() => Number),
    __param(0, (0, graphql_1.Args)('uid')),
    __param(1, (0, graphql_1.Args)('followed_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "followedUser", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getBeFollowedNum", null);
__decorate([
    (0, graphql_1.Query)(() => Boolean),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getBeFollowedStatus", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map