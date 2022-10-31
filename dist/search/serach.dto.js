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
exports.IndexQuery = exports.IndexData = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
let IndexData = class IndexData {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], IndexData.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], IndexData.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], IndexData.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], IndexData.prototype, "labels", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], IndexData.prototype, "title", void 0);
IndexData = __decorate([
    (0, graphql_1.InputType)()
], IndexData);
exports.IndexData = IndexData;
let IndexQuery = class IndexQuery {
};
__decorate([
    (0, graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], IndexQuery.prototype, "title", void 0);
IndexQuery = __decorate([
    (0, graphql_1.InputType)()
], IndexQuery);
exports.IndexQuery = IndexQuery;
//# sourceMappingURL=serach.dto.js.map