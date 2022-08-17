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
exports.LabelService = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let LabelService = class LabelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLabels() {
        return await this.prisma.label.findMany();
    }
    async createLabel(data) {
        return await this.prisma.label.create({
            data: {
                name: data.name,
                description: data.description,
                label_id: data.label_id,
                categorys: {
                    connect: {
                        category_id: data.categorys,
                    }
                }
            }
        });
    }
    async putLabel(id, category, desc) {
        return await this.prisma.label.update({
            where: {
                label_id: id
            },
            data: {
                category,
                description: desc
            }
        });
    }
    async findLabelsById(id) {
        return await this.prisma.label.findMany({
            where: {
                label_id: {
                    in: id
                }
            }
        });
    }
};
LabelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], LabelService);
exports.LabelService = LabelService;
//# sourceMappingURL=label.service.js.map