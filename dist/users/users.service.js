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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const app_service_1 = require("../app.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUser() {
        return this.prisma.user.findMany();
    }
    async createMusterArticle(article, context) {
        const uid = context.req.session['uid'];
        let user = await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                muster_data: {
                    create: {
                        article_data: {
                            create: {
                                article: article.article_data.article,
                                outer_id: (0, nanoid_1.nanoid)(),
                                tilte: article.article_data.tilte
                            }
                        },
                        muster_id: (0, nanoid_1.nanoid)(),
                        name: article.name,
                    }
                }
            }
        });
        return {
            name: user.name
        };
    }
    findOne(id) {
        return this.prisma.user.findUnique({
            where: {
                uuid_user: id
            }
        });
    }
    findOneByPhone(phone) {
        return this.prisma.user.findUnique({
            where: {
                phone: phone
            }
        });
    }
    create(data) {
        return this.prisma.user.create({
            data
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map