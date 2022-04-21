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
exports.UsersDATA = exports.Users = exports.LoginDTO = exports.UsersDTO = void 0;
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
let Users = class Users {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
Users = __decorate([
    (0, graphql_1.ObjectType)()
], Users);
exports.Users = Users;
let UsersDATA = class UsersDATA {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Users)
], UsersDATA.prototype, "data", void 0);
UsersDATA = __decorate([
    (0, graphql_1.ObjectType)()
], UsersDATA);
exports.UsersDATA = UsersDATA;
//# sourceMappingURL=users.dto.js.map