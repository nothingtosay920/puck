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
exports.EmitResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const emit_service_1 = require("./emit.service");
const listener_1 = require("./listener");
let EmitResolver = class EmitResolver {
    constructor(emitService, listener) {
        this.emitService = emitService;
        this.listener = listener;
    }
    emit() {
        this.emitService.articleEmit();
        return 1;
    }
    setListen() {
        this.listener.handleArticleCreatedEvent();
        return 1;
    }
};
__decorate([
    (0, graphql_1.Query)(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmitResolver.prototype, "emit", null);
__decorate([
    (0, graphql_1.Query)(() => Number),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmitResolver.prototype, "setListen", null);
EmitResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [emit_service_1.EmitService, listener_1.ListenerService])
], EmitResolver);
exports.EmitResolver = EmitResolver;
//# sourceMappingURL=emit.resolver.js.map