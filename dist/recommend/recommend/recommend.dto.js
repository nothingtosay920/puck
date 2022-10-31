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
exports.RelateRecommendRes = exports.RecommendRes = exports.RecommendItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const article_dto_1 = require("../../article/article.dto");
let RecommendItem = class RecommendItem {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], RecommendItem.prototype, "Id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], RecommendItem.prototype, "Score", void 0);
RecommendItem = __decorate([
    (0, graphql_1.ObjectType)()
], RecommendItem);
exports.RecommendItem = RecommendItem;
let RecommendRes = class RecommendRes {
};
__decorate([
    (0, graphql_1.Field)(() => [article_dto_1.ArticleData]),
    __metadata("design:type", Array)
], RecommendRes.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], RecommendRes.prototype, "next", void 0);
RecommendRes = __decorate([
    (0, graphql_1.ObjectType)()
], RecommendRes);
exports.RecommendRes = RecommendRes;
let RelateRecommendRes = class RelateRecommendRes {
};
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], RelateRecommendRes.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], RelateRecommendRes.prototype, "next", void 0);
RelateRecommendRes = __decorate([
    (0, graphql_1.ObjectType)()
], RelateRecommendRes);
exports.RelateRecommendRes = RelateRecommendRes;
//# sourceMappingURL=recommend.dto.js.map