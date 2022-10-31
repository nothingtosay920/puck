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
exports.ArticlePanelStatus = exports.WritingArticle = exports.AllGatherPagenation = exports.AllArticlesPagenation = exports.AllArticlesInfo = exports.GatherData = exports.DynamicRes = exports.ArticleDataPagenation = exports.RecordsDataPagenation = exports.RecordsArticleData = exports.ArticleData = exports.GatherRes = exports.Category = exports.Zan = exports.Collection = exports.DraftRes = exports.Draft = exports.BeFollowed = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const label_dto_1 = require("../label/label.dto");
const users_dto_1 = require("../users/users.dto");
const users_interface_1 = require("../users/users.interface");
const article_interface_1 = require("./article.interface");
let BeFollowed = class BeFollowed {
};
BeFollowed = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.BeFollowedInter]
    })
], BeFollowed);
exports.BeFollowed = BeFollowed;
let Draft = class Draft {
};
Draft = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.DraftInter]
    })
], Draft);
exports.Draft = Draft;
let DraftRes = class DraftRes {
};
__decorate([
    (0, graphql_1.Field)(() => [Draft]),
    __metadata("design:type", Array)
], DraftRes.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], DraftRes.prototype, "next", void 0);
DraftRes = __decorate([
    (0, graphql_1.ObjectType)()
], DraftRes);
exports.DraftRes = DraftRes;
let Collection = class Collection {
};
Collection = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.CollectionInter]
    })
], Collection);
exports.Collection = Collection;
let Zan = class Zan {
};
Zan = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.ZanInter]
    })
], Zan);
exports.Zan = Zan;
let Category = class Category {
};
Category = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.CategoryInter]
    })
], Category);
exports.Category = Category;
let GatherRes = class GatherRes {
};
GatherRes = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.GatherResInterface]
    })
], GatherRes);
exports.GatherRes = GatherRes;
let ArticleData = class ArticleData {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ArticleData.prototype, "zan_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ArticleData.prototype, "collection_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ArticleData.prototype, "follow_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], ArticleData.prototype, "follow_user", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Zan]),
    __metadata("design:type", Array)
], ArticleData.prototype, "zan", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BeFollowed], { nullable: true }),
    __metadata("design:type", Array)
], ArticleData.prototype, "beFollowed", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Collection], { nullable: true }),
    __metadata("design:type", Array)
], ArticleData.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Draft]),
    __metadata("design:type", Array)
], ArticleData.prototype, "draft", void 0);
__decorate([
    (0, graphql_1.Field)(() => [label_dto_1.Label]),
    __metadata("design:type", Array)
], ArticleData.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Category]),
    __metadata("design:type", Array)
], ArticleData.prototype, "categorys", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GatherRes)
], ArticleData.prototype, "gather", void 0);
ArticleData = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.ArticleInter]
    })
], ArticleData);
exports.ArticleData = ArticleData;
let RecordsArticleData = class RecordsArticleData {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], RecordsArticleData.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Zan]),
    __metadata("design:type", Array)
], RecordsArticleData.prototype, "zan", void 0);
RecordsArticleData = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.ArticleInter]
    })
], RecordsArticleData);
exports.RecordsArticleData = RecordsArticleData;
let RecordsDataPagenation = class RecordsDataPagenation {
};
__decorate([
    (0, graphql_1.Field)(() => [RecordsArticleData]),
    __metadata("design:type", Array)
], RecordsDataPagenation.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], RecordsDataPagenation.prototype, "next", void 0);
RecordsDataPagenation = __decorate([
    (0, graphql_1.ObjectType)()
], RecordsDataPagenation);
exports.RecordsDataPagenation = RecordsDataPagenation;
let ArticleDataPagenation = class ArticleDataPagenation {
};
__decorate([
    (0, graphql_1.Field)(() => [ArticleData]),
    __metadata("design:type", Array)
], ArticleDataPagenation.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], ArticleDataPagenation.prototype, "next", void 0);
ArticleDataPagenation = __decorate([
    (0, graphql_1.ObjectType)()
], ArticleDataPagenation);
exports.ArticleDataPagenation = ArticleDataPagenation;
let DynamicRes = class DynamicRes extends ArticleData {
};
__decorate([
    (0, graphql_1.Field)(() => [ArticleData]),
    __metadata("design:type", Array)
], DynamicRes.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], DynamicRes.prototype, "next", void 0);
DynamicRes = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [users_interface_1.UserInfoInter]
    })
], DynamicRes);
exports.DynamicRes = DynamicRes;
let GatherData = class GatherData {
};
GatherData = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.GatherInter]
    })
], GatherData);
exports.GatherData = GatherData;
let AllArticlesInfo = class AllArticlesInfo {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", users_dto_1.UserData)
], AllArticlesInfo.prototype, "author", void 0);
AllArticlesInfo = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.GatherInter]
    })
], AllArticlesInfo);
exports.AllArticlesInfo = AllArticlesInfo;
let AllArticlesPagenation = class AllArticlesPagenation {
};
__decorate([
    (0, graphql_1.Field)(() => [AllArticlesInfo]),
    __metadata("design:type", Array)
], AllArticlesPagenation.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], AllArticlesPagenation.prototype, "next", void 0);
AllArticlesPagenation = __decorate([
    (0, graphql_1.ObjectType)()
], AllArticlesPagenation);
exports.AllArticlesPagenation = AllArticlesPagenation;
let AllGatherPagenation = class AllGatherPagenation {
};
__decorate([
    (0, graphql_1.Field)(() => [GatherData]),
    __metadata("design:type", Array)
], AllGatherPagenation.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], AllGatherPagenation.prototype, "next", void 0);
AllGatherPagenation = __decorate([
    (0, graphql_1.ObjectType)()
], AllGatherPagenation);
exports.AllGatherPagenation = AllGatherPagenation;
let WritingArticle = class WritingArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "gather_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], WritingArticle.prototype, "article_description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], WritingArticle.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArticleData]),
    __metadata("design:type", Array)
], WritingArticle.prototype, "article_data", void 0);
WritingArticle = __decorate([
    (0, graphql_1.ObjectType)()
], WritingArticle);
exports.WritingArticle = WritingArticle;
let ArticlePanelStatus = class ArticlePanelStatus {
};
ArticlePanelStatus = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [article_interface_1.ArticlePanelStatusInter]
    })
], ArticlePanelStatus);
exports.ArticlePanelStatus = ArticlePanelStatus;
//# sourceMappingURL=article.dto.js.map