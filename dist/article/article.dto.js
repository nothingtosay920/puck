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
exports.MusterColumn = exports.MusterArticleById = exports.AddArticleRes = exports.AllArticlesRes = exports.AllArticles = exports.collectionArticleRes = exports.collectionList = exports.WritingList = exports.DraftArticle = exports.DynamicRes = exports.Polymerization = exports.Befollowed = exports.RecordsRes = exports.ArticleDTO = exports.GatherArticle = exports.MusterArticleDTO = exports.LabelDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let LabelDto = class LabelDto {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], LabelDto.prototype, "label", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LabelDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LabelDto.prototype, "description", void 0);
LabelDto = __decorate([
    (0, graphql_1.ObjectType)()
], LabelDto);
exports.LabelDto = LabelDto;
let MusterArticleDTO = class MusterArticleDTO {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticleDTO.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MusterArticleDTO.prototype, "article", void 0);
MusterArticleDTO = __decorate([
    (0, graphql_1.ObjectType)()
], MusterArticleDTO);
exports.MusterArticleDTO = MusterArticleDTO;
let GatherArticle = class GatherArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "article_type", void 0);
GatherArticle = __decorate([
    (0, graphql_1.ObjectType)()
], GatherArticle);
exports.GatherArticle = GatherArticle;
let ArticleDTO = class ArticleDTO {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "muster", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "edit_time", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "gather", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], ArticleDTO.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "categorys", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "zan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "hot", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], ArticleDTO.prototype, "befollowed", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticleDTO.prototype, "zan_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticleDTO.prototype, "follow_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticleDTO.prototype, "collection_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "author_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "author_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleDTO.prototype, "timestamp", void 0);
ArticleDTO = __decorate([
    (0, graphql_1.ObjectType)()
], ArticleDTO);
exports.ArticleDTO = ArticleDTO;
let RecordsRes = class RecordsRes {
};
__decorate([
    (0, graphql_1.Field)(() => [ArticleDTO]),
    __metadata("design:type", Array)
], RecordsRes.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], RecordsRes.prototype, "next", void 0);
RecordsRes = __decorate([
    (0, graphql_1.ObjectType)()
], RecordsRes);
exports.RecordsRes = RecordsRes;
let Befollowed = class Befollowed {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Befollowed.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Befollowed.prototype, "gather_article_id", void 0);
Befollowed = __decorate([
    (0, graphql_1.ObjectType)()
], Befollowed);
exports.Befollowed = Befollowed;
let Polymerization = class Polymerization {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "author_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "muster_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "muster_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], Polymerization.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Polymerization.prototype, "article_id", void 0);
Polymerization = __decorate([
    (0, graphql_1.ObjectType)()
], Polymerization);
exports.Polymerization = Polymerization;
let DynamicRes = class DynamicRes {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "acticle_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "edit_time", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "zan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "hot", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "author_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "author_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "user_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "open_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], DynamicRes.prototype, "zan_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], DynamicRes.prototype, "follow_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], DynamicRes.prototype, "collection_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], DynamicRes.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], DynamicRes.prototype, "categorys", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DynamicRes.prototype, "type", void 0);
DynamicRes = __decorate([
    (0, graphql_1.ObjectType)()
], DynamicRes);
exports.DynamicRes = DynamicRes;
let DraftArticle = class DraftArticle {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], DraftArticle.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "categorys", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArticleDTO], { nullable: true }),
    __metadata("design:type", ArticleDTO)
], DraftArticle.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "muster", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DraftArticle.prototype, "id", void 0);
DraftArticle = __decorate([
    (0, graphql_1.ObjectType)()
], DraftArticle);
exports.DraftArticle = DraftArticle;
let WritingList = class WritingList {
};
__decorate([
    (0, graphql_1.Field)(() => [ArticleIdDto]),
    __metadata("design:type", Array)
], WritingList.prototype, "muster_data", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArticleIdDto]),
    __metadata("design:type", Array)
], WritingList.prototype, "gather_data", void 0);
WritingList = __decorate([
    (0, graphql_1.ObjectType)()
], WritingList);
exports.WritingList = WritingList;
let OuterId = class OuterId {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], OuterId.prototype, "outer_id", void 0);
OuterId = __decorate([
    (0, graphql_1.ObjectType)()
], OuterId);
let ArticleIdDto = class ArticleIdDto {
};
__decorate([
    (0, graphql_1.Field)(() => [OuterId]),
    __metadata("design:type", Array)
], ArticleIdDto.prototype, "article_data", void 0);
ArticleIdDto = __decorate([
    (0, graphql_1.ObjectType)()
], ArticleIdDto);
let collectionList = class collectionList {
};
__decorate([
    (0, graphql_1.Field)(() => [collection]),
    __metadata("design:type", Array)
], collectionList.prototype, "list", void 0);
collectionList = __decorate([
    (0, graphql_1.ObjectType)()
], collectionList);
exports.collectionList = collectionList;
let collection = class collection {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], collection.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], collection.prototype, "hot", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], collection.prototype, "zan", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], collection.prototype, "edit_time", void 0);
collection = __decorate([
    (0, graphql_1.ObjectType)()
], collection);
let collectionArticleRes = class collectionArticleRes {
};
__decorate([
    (0, graphql_1.Field)(() => [ArticleDTO]),
    __metadata("design:type", Array)
], collectionArticleRes.prototype, "list", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], collectionArticleRes.prototype, "next", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], collectionArticleRes.prototype, "count", void 0);
collectionArticleRes = __decorate([
    (0, graphql_1.ObjectType)()
], collectionArticleRes);
exports.collectionArticleRes = collectionArticleRes;
let LabelTypeInArticle = class LabelTypeInArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], LabelTypeInArticle.prototype, "label_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LabelTypeInArticle.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], LabelTypeInArticle.prototype, "description", void 0);
LabelTypeInArticle = __decorate([
    (0, graphql_1.ObjectType)()
], LabelTypeInArticle);
let Labels = class Labels {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", LabelTypeInArticle)
], Labels.prototype, "Labels", void 0);
Labels = __decorate([
    (0, graphql_1.ObjectType)()
], Labels);
let AllArticles = class AllArticles {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "zan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "hot", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AllArticles.prototype, "edit_time", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Labels]),
    __metadata("design:type", Array)
], AllArticles.prototype, "labels", void 0);
AllArticles = __decorate([
    (0, graphql_1.ObjectType)()
], AllArticles);
exports.AllArticles = AllArticles;
let AllArticlesRes = class AllArticlesRes {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], AllArticlesRes.prototype, "next", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], AllArticlesRes.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [AllArticles]),
    __metadata("design:type", Array)
], AllArticlesRes.prototype, "AllArticles", void 0);
AllArticlesRes = __decorate([
    (0, graphql_1.ObjectType)()
], AllArticlesRes);
exports.AllArticlesRes = AllArticlesRes;
let AddArticleRes = class AddArticleRes {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AddArticleRes.prototype, "article_id", void 0);
AddArticleRes = __decorate([
    (0, graphql_1.ObjectType)()
], AddArticleRes);
exports.AddArticleRes = AddArticleRes;
let AuthorInfo = class AuthorInfo extends OuterId {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AuthorInfo.prototype, "uuid_user", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AuthorInfo.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AuthorInfo.prototype, "user_img", void 0);
AuthorInfo = __decorate([
    (0, graphql_1.ObjectType)()
], AuthorInfo);
let MusterArticleById = class MusterArticleById {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticleById.prototype, "muster_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticleById.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", AuthorInfo)
], MusterArticleById.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArticleDTO]),
    __metadata("design:type", Array)
], MusterArticleById.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticleById.prototype, "description", void 0);
MusterArticleById = __decorate([
    (0, graphql_1.ObjectType)()
], MusterArticleById);
exports.MusterArticleById = MusterArticleById;
let MusterColumn = class MusterColumn {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "muster_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "muster_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterColumn.prototype, "authorId", void 0);
MusterColumn = __decorate([
    (0, graphql_1.ObjectType)()
], MusterColumn);
exports.MusterColumn = MusterColumn;
//# sourceMappingURL=article.dto.js.map