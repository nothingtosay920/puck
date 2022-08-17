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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const label_dto_1 = require("./label.dto");
const label_input_1 = require("./label.input");
const label_service_1 = require("./label.service");
let LabelResolver = class LabelResolver {
    constructor(labelService) {
        this.labelService = labelService;
    }
    createManyLabels(data) {
        return this.labelService.createLabel(data);
    }
    getLabels() {
        return this.labelService.getLabels();
    }
    putLabel(id, category, desc) {
        this.labelService.putLabel(id, category, desc);
        return 200;
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => label_dto_1.Label),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [label_input_1.CreateLabelInput]),
    __metadata("design:returntype", void 0)
], LabelResolver.prototype, "createManyLabels", null);
__decorate([
    (0, graphql_1.Query)(() => [label_dto_1.Label]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LabelResolver.prototype, "getLabels", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('category')),
    __param(2, (0, graphql_1.Args)('desc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], LabelResolver.prototype, "putLabel", null);
LabelResolver = __decorate([
    (0, graphql_1.Resolver)(() => label_dto_1.Label),
    __metadata("design:paramtypes", [label_service_1.LabelService])
], LabelResolver);
exports.LabelResolver = LabelResolver;
//# sourceMappingURL=label.resolver.js.map