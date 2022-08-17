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
exports.BaseMusterData = exports.BaseMusterInfo = exports.BaseUserInfo = exports.DynamicApiRes = exports.Dynamic = exports.Draft = exports.UsersDATA = exports.LogOutDto = exports.LoginDTO = exports.UsersDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let UsersDTO = class UsersDTO {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(11),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], UsersDTO.prototype, "phone", void 0);
UsersDTO = __decorate([
    (0, graphql_1.ObjectType)()
], UsersDTO);
exports.UsersDTO = UsersDTO;
let LoginDTO = class LoginDTO {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], LoginDTO.prototype, "code", void 0);
LoginDTO = __decorate([
    (0, graphql_1.ObjectType)()
], LoginDTO);
exports.LoginDTO = LoginDTO;
let LogOutDto = class LogOutDto {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", Number)
], LogOutDto.prototype, "code", void 0);
LogOutDto = __decorate([
    (0, graphql_1.ObjectType)()
], LogOutDto);
exports.LogOutDto = LogOutDto;
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
], UsersDATA.prototype, "open_id", void 0);
UsersDATA = __decorate([
    (0, graphql_1.ObjectType)()
], UsersDATA);
exports.UsersDATA = UsersDATA;
let Draft = class Draft {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Draft.prototype, "article_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Draft.prototype, "time_stmap", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Draft.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Draft.prototype, "title", void 0);
Draft = __decorate([
    (0, graphql_1.ObjectType)()
], Draft);
exports.Draft = Draft;
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
    (0, graphql_1.Field)(() => [BaseMusterData]),
    __metadata("design:type", Array)
], BaseMusterInfo.prototype, "muster_data", void 0);
BaseMusterInfo = __decorate([
    (0, graphql_1.ObjectType)()
], BaseMusterInfo);
exports.BaseMusterInfo = BaseMusterInfo;
let BaseMusterData = class BaseMusterData {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], BaseMusterData.prototype, "muster_id", void 0);
BaseMusterData = __decorate([
    (0, graphql_1.ObjectType)()
], BaseMusterData);
exports.BaseMusterData = BaseMusterData;
//# sourceMappingURL=users.dto.js.map