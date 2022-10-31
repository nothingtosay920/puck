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
exports.RecommendService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RecommendService = class RecommendService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async latestRecoommend(label, page) {
        return await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/latest/' + label + `?n=8&offset=${page}`).pipe((0, rxjs_1.map)(res => res.data)));
    }
    async popularRecommend(label, page) {
        return await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/popular/' + label + `?n=8&offset=${page}`).pipe((0, rxjs_1.map)(res => res.data)));
    }
    async userRecommend(uid, page) {
        return await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/recommend/' + uid + `?n=8&offset=${page}`).pipe((0, rxjs_1.map)(res => res.data)));
    }
    async relateRecommend(uid) {
        return await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/recommend/' + uid + `?n=5`).pipe((0, rxjs_1.map)(res => res.data)));
    }
    async popularRelate(label) {
        return await (0, rxjs_1.firstValueFrom)(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/popular/' + label + '?n=5').pipe((0, rxjs_1.map)(res => res.data)));
    }
};
RecommendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RecommendService);
exports.RecommendService = RecommendService;
//# sourceMappingURL=recommend.service.js.map