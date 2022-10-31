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
exports.ArticlePanelStatusInter = exports.GatherResInterface = exports.ArticleStatusInterface = exports.CategoryInter = exports.CollectionInter = exports.DraftInter = exports.ZanInter = exports.BeFollowedInter = exports.ArticleInter = exports.GatherInter = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const label_dto_1 = require("../label/label.dto");
const users_dto_1 = require("../users/users.dto");
const article_dto_1 = require("./article.dto");
let GatherInter = class GatherInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "article_description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "gather_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "authorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [article_dto_1.ArticleData]),
    __metadata("design:type", Array)
], GatherInter.prototype, "articles", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInter.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", users_dto_1.UserData)
], GatherInter.prototype, "author", void 0);
GatherInter = __decorate([
    (0, graphql_1.InterfaceType)()
], GatherInter);
exports.GatherInter = GatherInter;
let ArticleInter = class ArticleInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], ArticleInter.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], ArticleInter.prototype, "hot", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInter.prototype, "edit_time", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticleInter.prototype, "release", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", users_dto_1.UserData)
], ArticleInter.prototype, "author", void 0);
ArticleInter = __decorate([
    (0, graphql_1.InterfaceType)()
], ArticleInter);
exports.ArticleInter = ArticleInter;
let BeFollowedInter = class BeFollowedInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BeFollowedInter.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BeFollowedInter.prototype, "user_id", void 0);
BeFollowedInter = __decorate([
    (0, graphql_1.InterfaceType)()
], BeFollowedInter);
exports.BeFollowedInter = BeFollowedInter;
let ZanInter = class ZanInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ZanInter.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ZanInter.prototype, "authorId", void 0);
ZanInter = __decorate([
    (0, graphql_1.InterfaceType)()
], ZanInter);
exports.ZanInter = ZanInter;
let DraftInter = class DraftInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], DraftInter.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], DraftInter.prototype, "time_stmap", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], DraftInter.prototype, "user_id", void 0);
DraftInter = __decorate([
    (0, graphql_1.InterfaceType)()
], DraftInter);
exports.DraftInter = DraftInter;
let CollectionInter = class CollectionInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], CollectionInter.prototype, "collection_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CollectionInter.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CollectionInter.prototype, "user_id", void 0);
CollectionInter = __decorate([
    (0, graphql_1.InterfaceType)()
], CollectionInter);
exports.CollectionInter = CollectionInter;
let CategoryInter = class CategoryInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CategoryInter.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CategoryInter.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CategoryInter.prototype, "category_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [label_dto_1.Label]),
    __metadata("design:type", Array)
], CategoryInter.prototype, "labels", void 0);
CategoryInter = __decorate([
    (0, graphql_1.InterfaceType)()
], CategoryInter);
exports.CategoryInter = CategoryInter;
let ArticleStatusInterface = class ArticleStatusInterface {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleStatusInterface.prototype, "author", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleStatusInterface.prototype, "author_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleStatusInterface.prototype, "author_name", void 0);
ArticleStatusInterface = __decorate([
    (0, graphql_1.InterfaceType)()
], ArticleStatusInterface);
exports.ArticleStatusInterface = ArticleStatusInterface;
let ParalArticleInfoInter = class ParalArticleInfoInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ParalArticleInfoInter.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ParalArticleInfoInter.prototype, "outer_id", void 0);
ParalArticleInfoInter = __decorate([
    (0, graphql_1.InterfaceType)()
], ParalArticleInfoInter);
let ParalArticleInfo = class ParalArticleInfo {
};
ParalArticleInfo = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [ParalArticleInfoInter]
    })
], ParalArticleInfo);
let GatherResInterface = class GatherResInterface {
};
__decorate([
    (0, graphql_1.Field)(() => [ParalArticleInfo]),
    __metadata("design:type", Array)
], GatherResInterface.prototype, "articles", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherResInterface.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherResInterface.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherResInterface.prototype, "article_type", void 0);
GatherResInterface = __decorate([
    (0, graphql_1.InterfaceType)()
], GatherResInterface);
exports.GatherResInterface = GatherResInterface;
let ArticlePanelStatusInter = class ArticlePanelStatusInter {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticlePanelStatusInter.prototype, "zan_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticlePanelStatusInter.prototype, "collect_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Boolean)
], ArticlePanelStatusInter.prototype, "follow_status", void 0);
ArticlePanelStatusInter = __decorate([
    (0, graphql_1.InterfaceType)()
], ArticlePanelStatusInter);
exports.ArticlePanelStatusInter = ArticlePanelStatusInter;
//# sourceMappingURL=article.interface.js.map