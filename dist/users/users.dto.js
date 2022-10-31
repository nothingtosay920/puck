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
exports.MessageDataRes = exports.MessageData = exports.InfoReadData = exports.BaseMusterData = exports.BaseMusterArticle = exports.BaseMusterInfo = exports.BaseUserInfo = exports.DynamicApiRes = exports.Dynamic = exports.UsersDATA = exports.UserData = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const users_interface_1 = require("./users.interface");
let UserData = class UserData {
};
UserData = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [users_interface_1.UserInfoInter]
    })
], UserData);
exports.UserData = UserData;
let UsersDATA = class UsersDATA {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersDATA.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersDATA.prototype, "user_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UsersDATA.prototype, "uuid", void 0);
UsersDATA = __decorate([
    (0, graphql_1.ObjectType)()
], UsersDATA);
exports.UsersDATA = UsersDATA;
let Dynamic = class Dynamic {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Dynamic.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Dynamic.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Dynamic.prototype, "time_tamp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Dynamic.prototype, "dynamic_id", void 0);
Dynamic = __decorate([
    (0, graphql_1.ObjectType)()
], Dynamic);
exports.Dynamic = Dynamic;
let DynamicApiRes = class DynamicApiRes {
};
__decorate([
    (0, graphql_1.Field)(() => [Dynamic]),
    __metadata("design:type", Array)
], DynamicApiRes.prototype, "dynamic", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], DynamicApiRes.prototype, "next", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], DynamicApiRes.prototype, "count", void 0);
DynamicApiRes = __decorate([
    (0, graphql_1.ObjectType)()
], DynamicApiRes);
exports.DynamicApiRes = DynamicApiRes;
let BaseUserInfo = class BaseUserInfo {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BaseUserInfo.prototype, "user_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BaseUserInfo.prototype, "name", void 0);
BaseUserInfo = __decorate([
    (0, graphql_1.ObjectType)()
], BaseUserInfo);
exports.BaseUserInfo = BaseUserInfo;
let BaseMusterInfo = class BaseMusterInfo {
};
__decorate([
    (0, graphql_1.Field)(() => [BaseMusterData], { nullable: true }),
    __metadata("design:type", Array)
], BaseMusterInfo.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], BaseMusterInfo.prototype, "next", void 0);
BaseMusterInfo = __decorate([
    (0, graphql_1.ObjectType)()
], BaseMusterInfo);
exports.BaseMusterInfo = BaseMusterInfo;
let BaseMusterArticle = class BaseMusterArticle {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterArticle.prototype, "outer_id", void 0);
BaseMusterArticle = __decorate([
    (0, graphql_1.ObjectType)()
], BaseMusterArticle);
exports.BaseMusterArticle = BaseMusterArticle;
let BaseMusterData = class BaseMusterData {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "gather_name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "gather_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "gather_img", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "article_description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BaseMusterArticle]),
    __metadata("design:type", Array)
], BaseMusterData.prototype, "articles", void 0);
BaseMusterData = __decorate([
    (0, graphql_1.ObjectType)()
], BaseMusterData);
exports.BaseMusterData = BaseMusterData;
let InfoReadData = class InfoReadData {
};
InfoReadData = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [users_interface_1.InfoReadDataInter]
    })
], InfoReadData);
exports.InfoReadData = InfoReadData;
let MessageData = class MessageData {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MessageData.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MessageData.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MessageData.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], MessageData.prototype, "article_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", InfoReadData)
], MessageData.prototype, "info", void 0);
MessageData = __decorate([
    (0, graphql_1.ObjectType)()
], MessageData);
exports.MessageData = MessageData;
let MessageDataRes = class MessageDataRes {
};
__decorate([
    (0, graphql_1.Field)(() => [MessageData]),
    __metadata("design:type", Array)
], MessageDataRes.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], MessageDataRes.prototype, "next", void 0);
MessageDataRes = __decorate([
    (0, graphql_1.ObjectType)()
], MessageDataRes);
exports.MessageDataRes = MessageDataRes;
//# sourceMappingURL=users.dto.js.map