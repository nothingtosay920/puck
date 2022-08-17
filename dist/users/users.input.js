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
exports.GatherInput = exports.GatherArticle = exports.MusterInput = exports.LabelType = exports.MusterArticle = exports.UsersInput = void 0;
const graphql_1 = require("@nestjs/graphql");
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
let MusterArticle = class MusterArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticle.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticle.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticle.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterArticle.prototype, "articleImg", void 0);
MusterArticle = __decorate([
    (0, graphql_1.InputType)()
], MusterArticle);
exports.MusterArticle = MusterArticle;
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
let MusterInput = class MusterInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", MusterArticle)
], MusterInput.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MusterInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => [LabelType]),
    __metadata("design:type", Array)
], MusterInput.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MusterInput.prototype, "muster_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MusterInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MusterInput.prototype, "muster_article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MusterInput.prototype, "muster_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MusterInput.prototype, "muster_desc", void 0);
MusterInput = __decorate([
    (0, graphql_1.InputType)()
], MusterInput);
exports.MusterInput = MusterInput;
let GatherArticle = class GatherArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "article", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherArticle.prototype, "article_img", void 0);
GatherArticle = __decorate([
    (0, graphql_1.InputType)()
], GatherArticle);
exports.GatherArticle = GatherArticle;
let GatherInput = class GatherInput {
};
__decorate([
    (0, graphql_1.Field)(() => [GatherArticle]),
    __metadata("design:type", Array)
], GatherInput.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => [LabelType]),
    __metadata("design:type", Array)
], GatherInput.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "gather_article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], GatherInput.prototype, "gather_img", void 0);
GatherInput = __decorate([
    (0, graphql_1.InputType)()
], GatherInput);
exports.GatherInput = GatherInput;
//# sourceMappingURL=users.input.js.map