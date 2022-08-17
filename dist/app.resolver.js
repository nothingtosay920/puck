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
exports.AppResolver = void 0;
const axios_1 = require("@nestjs/axios");
const graphql_1 = require("@nestjs/graphql");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
let AppResolver = class AppResolver {
    constructor(httpService) {
        this.httpService = httpService;
    }
    hello() {
        const tod = (0, date_fns_1.parse)("2022-07-31 22:54:24", 'yyyy-MM-dd HH:mm:ss', new Date());
        const v = (0, date_fns_1.formatDistance)(tod, new Date(), { locale: locale_1.zhCN });
        console.log(v, tod);
        return 'test:';
    }
};
__decorate([
    (0, graphql_1.Query)(returns => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppResolver.prototype, "hello", null);
AppResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppResolver);
exports.AppResolver = AppResolver;
//# sourceMappingURL=app.resolver.js.map