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
exports.Item = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let Item = class Item {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "ItemId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], Item.prototype, "Timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], Item.prototype, "Labels", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "Categories", void 0);
Item = __decorate([
    (0, graphql_1.InputType)()
], Item);
exports.Item = Item;
//# sourceMappingURL=item.input.js.map