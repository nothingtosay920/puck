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
exports.UserFollowedItem = exports.UserBeFollowed = exports.RecommendUserRes = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const users_interface_1 = require("../../users/users.interface");
let RecommendUserRes = class RecommendUserRes {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecommendUserRes.prototype, "RowAffected", void 0);
RecommendUserRes = __decorate([
    (0, graphql_1.ObjectType)()
], RecommendUserRes);
exports.RecommendUserRes = RecommendUserRes;
let UserBeFollowed = class UserBeFollowed {
};
UserBeFollowed = __decorate([
    (0, graphql_1.ObjectType)({
        implements: [users_interface_1.UserBeFollowedInter]
    })
], UserBeFollowed);
exports.UserBeFollowed = UserBeFollowed;
let UserFollowedItem = class UserFollowedItem {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], UserFollowedItem.prototype, "follow_id", void 0);
UserFollowedItem = __decorate([
    (0, graphql_1.ObjectType)()
], UserFollowedItem);
exports.UserFollowedItem = UserFollowedItem;
//# sourceMappingURL=user.dto.js.map