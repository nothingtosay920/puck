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
    async findArticleFollow(outer_id, uuid) {
        return await this.prisma.article.findUnique({
            where: {
                outer_id
            },
            select: {
                info: {
                    where: {
                        uuid
                    }
                }
            }
        });
    }
    async remoceArticleFollow(outer_id, uuid) {
        return await this.prisma.article.update({
            where: {
                outer_id
            },
            data: {
                info: {
                    disconnect: {
                        uuid
                    }
                }
            }
        });
    }
    async getArticle(id) {
        return await this.prisma.article.update({
            where: {
                outer_id: id,
            },
            data: {
                hot: {
                    increment: 1
                }
            },
            include: {
                info: true,
                zan: true,
                collection: true,
                categorys: true,
                labels: true,
            }
        });
    }
    async getGather(gather_id) {
        return await this.prisma.gather.findUnique({
            where: {
                gather_id
            },
            select: {
                articles: {
                    select: {
                        outer_id: true,
                        title: true,
                        article: true,
                        description: true,
                        article_img: true,
                        edit_time: true
                    }
                },
                gather_id: true,
                gather_name: true,
                article_type: true,
                author: true,
                gather_img: true,
                article_description: true
            }
        });
    }
    async removeArticleById(id) {
        return await this.prisma.article.delete({
            where: {
                outer_id: id
            },
        });
    }
    async searchAllArticle(query, uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    select: {
                        articles: {
                            where: {
                                title: {
                                    contains: query
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async searchGatherArticle(query, uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: 'GATHER'
                    },
                    select: {
                        articles: {
                            where: {
                                title: {
                                    contains: query
                                }
                            }
                        },
                    }
                }
            }
        });
    }
    async searchColumnArticle(query, uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: {
                            not: 'GATHER'
                        }
                    },
                    select: {
                        articles: {
                            where: {
                                title: {
                                    contains: query
                                }
                            }
                        },
                    }
                }
            }
        });
    }
    async searchAuthorArticle(query, uid, page) {
        return await this.prisma.gather.findMany({
            where: {
                authorId: uid,
                articles: {
                    every: {
                        outer_id: {
                            not: ""
                        },
                        title: {
                            contains: query
                        }
                    }
                },
                gather_release: true
            },
            include: {
                articles: {
                    include: {
                        zan: true,
                        categorys: true,
                        labels: true,
                        info: true
                    }
                },
                author: true,
            },
        });
    }
    async artilceBeFollowed(uid, id) {
        return await this.prisma.article.update({
            where: {
                outer_id: id
            },
            data: {
                info: {
                    connect: {
                        uuid: uid
                    }
                }
            }
        });
    }
    async getGatherById(id) {
        return await this.prisma.gather.findUnique({
            where: {
                gather_id: id
            },
            include: {
                articles: {
                    include: {
                        categorys: true,
                        labels: true
                    }
                },
            }
        });
    }
    async getArticlePanelStatus(uuid, article_id) {
        return await this.prisma.user.findUnique({
            where: {
                uuid
            },
            select: {
                zan: {
                    where: {
                        article_id: {
                            equals: article_id
                        }
                    }
                },
                follow: {
                    where: {
                        follow_id: {
                            equals: article_id
                        }
                    }
                },
                collection: {
                    where: {
                        collect_id: {
                            equals: article_id
                        }
                    }
                }
            }
        });
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map