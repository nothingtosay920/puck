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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let ArticleService = class ArticleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGatherArticle(id) {
        return await this.prisma.gatherArticle.update({
            where: {
                outer_id: id
            },
            data: {
                hot: {
                    increment: 1
                }
            },
            include: {
                befollowed: true,
            }
        });
    }
    async getMusterArticle(id) {
        return await this.prisma.musterArticle.update({
            where: {
                outer_id: id
            },
            data: {
                hot: {
                    increment: 1
                },
            },
            include: {
                labels: true,
                categorys: true,
                befollowed: true,
            }
        });
    }
    async addZanInMuster(id) {
        return await this.prisma.musterArticle.update({
            where: {
                outer_id: id
            },
            data: {
                zan: {
                    increment: 1
                }
            }
        });
    }
    async addZanInGather(id) {
        return await this.prisma.gatherArticle.update({
            where: {
                outer_id: id
            },
            data: {
                zan: {
                    increment: 1
                }
            }
        });
    }
    async readingsMuster(id) {
        return await this.prisma.musterArticle.update({
            where: {
                outer_id: id
            },
            data: {
                readings: {
                    increment: 1
                },
                hot: {
                    increment: 1
                }
            }
        });
    }
    async artilceBeFollowed(uid, id, type) {
        if (type === 'GATHER') {
            return await this.prisma.gatherArticle.update({
                where: {
                    outer_id: id
                },
                data: {
                    befollowed: {
                        create: {
                            user_id: uid
                        }
                    }
                }
            });
        }
        else if (type === 'MUSTER') {
            return await this.prisma.musterArticle.update({
                where: {
                    outer_id: id
                },
                data: {
                    befollowed: {
                        create: {
                            user_id: uid
                        }
                    }
                }
            });
        }
        {
            throw Error();
        }
    }
    async getGatherById(id) {
        return await this.prisma.gather.findUnique({
            where: {
                gather_id: id
            },
            include: {
                article_data: true,
                categorys: {
                    select: {
                        category: true
                    }
                },
                labels: {
                    select: {
                        label: true
                    }
                }
            }
        });
    }
    async removeMusterArticleById(id, uid) {
        await this.prisma.musterArticle.delete({
            where: {
                outer_id: id,
            },
        });
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                dynamic: {
                    deleteMany: {
                        content: {
                            contains: id
                        }
                    }
                },
                collection: {
                    deleteMany: {
                        article_id: id
                    }
                },
                record: {
                    deleteMany: {
                        article_id: id
                    }
                }
            }
        });
        return 200;
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map