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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const FormData = require("form-data");
const fs_1 = require("fs");
const rxjs_1 = require("rxjs");
let TasksService = TasksService_1 = class TasksService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    handleCron() {
        this.gorse();
        this.logger.debug('Called when the second is 6');
    }
    async gorse() {
        const file = new FormData();
        const form = (0, fs_1.createReadStream)('./feedback.csv');
        file.append('file', form);
        const res = await (0, rxjs_1.firstValueFrom)(this.httpService.post('http://180.76.174.196:8088/api/bulk/feedback', file, {
            headers: Object.assign({}, file.getHeaders())
        }).pipe((0, rxjs_1.map)(res => res.data)));
    }
};
__decorate([
    (0, schedule_1.Interval)(1 * 1000 * 6),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksService.prototype, "handleCron", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=task.service.js.map