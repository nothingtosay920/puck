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
exports.musterInput = exports.musterArticle = exports.UsersInput = void 0;
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
let musterArticle = class musterArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], musterArticle.prototype, "tilte", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], musterArticle.prototype, "article", void 0);
musterArticle = __decorate([
    (0, graphql_1.InputType)()
], musterArticle);
exports.musterArticle = musterArticle;
let musterInput = class musterInput {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", musterArticle)
], musterInput.prototype, "article_data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], musterInput.prototype, "name", void 0);
musterInput = __decorate([
    (0, graphql_1.InputType)()
], musterInput);
exports.musterInput = musterInput;
//# sourceMappingURL=users.input.js.map