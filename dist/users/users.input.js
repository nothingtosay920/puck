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
exports.LabelType = exports.SavedArticleInput = exports.ArticleInput = exports.GatherInput = exports.UsersInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
let UsersInput = class UsersInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], UsersInput.prototype, "phone", void 0);
UsersInput = __decorate([
    (0, graphql_1.InputType)()
], UsersInput);
exports.UsersInput = UsersInput;
let GatherInput = class GatherInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "article_description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "gather_img", void 0);
GatherInput = __decorate([
    (0, graphql_1.InputType)()
], GatherInput);
exports.GatherInput = GatherInput;
let ArticleInput = class ArticleInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInput.prototype, "outer_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInput.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInput.prototype, "article_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], ArticleInput.prototype, "edit_time", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ArticleInput.prototype, "description", void 0);
ArticleInput = __decorate([
    (0, graphql_1.InputType)()
], ArticleInput);
exports.ArticleInput = ArticleInput;
let SavedArticleInput = class SavedArticleInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "article_description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "gather_img", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArticleInput]),
    __metadata("design:type", Array)
], SavedArticleInput.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], SavedArticleInput.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], SavedArticleInput.prototype, "category", void 0);
SavedArticleInput = __decorate([
    (0, graphql_1.InputType)()
], SavedArticleInput);
exports.SavedArticleInput = SavedArticleInput;
let LabelType = class LabelType {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], LabelType.prototype, "label", void 0);
LabelType = __decorate([
    (0, graphql_1.InputType)()
], LabelType);
exports.LabelType = LabelType;
//# sourceMappingURL=users.input.js.map