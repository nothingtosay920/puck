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
const elasticsearch_1 = require("@nestjs/elasticsearch");
const date_fns_1 = require("date-fns");
const nanoid_1 = require("nanoid");
const app_service_1 = require("../app.service");
const category_service_1 = require("../category/category.service");
const label_service_1 = require("../label/label.service");
const item_service_1 = require("../recommend/item/item.service");
let UsersService = class UsersService {
    constructor(prisma, ItemService, categoryService, labelService, elasticsearchService) {
        this.prisma = prisma;
        this.ItemService = ItemService;
        this.categoryService = categoryService;
        this.labelService = labelService;
        this.elasticsearchService = elasticsearchService;
    }
    async getUserFollow(uuid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid
            },
            select: {
                follow: {
                    select: {
                        follow_id: true
                    }
                }
            }
        });
    }
    async findArticleCollect(outer_id, uuid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid
            },
            select: {
                collection: {
                    where: {
                        article_id: outer_id
                    }
                }
            }
        });
    }
    async userBeFollowed(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                info: {
                    select: {
                        uuid: true
                    }
                }
            }
        });
    }
    async addInfo(uid, info_id) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                info: {
                    connect: {
                        uuid: info_id
                    }
                }
            }
        });
    }
    async getMessage(uuid, page) {
        return await this.prisma.info.findUnique({
            where: {
                uuid
            },
            include: {
                message: {
                    take: 5,
                    skip: 5 * page,
                    include: {
                        info: {
                            select: {
                                reading_time: true
                            }
                        }
                    }
                },
            },
        });
    }
    async findZan(uuid, article_id) {
        return await this.prisma.user.findUnique({
            where: {
                uuid,
            },
            select: {
                zan: {
                    where: {
                        article_id
                    }
                }
            }
        });
    }
    async saveArticle(article, uid) {
        const time = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const update_list = article.article_data.map((item) => {
            return {
                where: {
                    outer_id: item.outer_id
                },
                data: item
            };
        });
        const articles_data = article.article_data.map((item) => {
            return Object.assign(Object.assign({}, item), { categorys: {
                    connect: {
                        category_id: article.category
                    }
                }, labels: {
                    connect: article.labels.map((item) => ({
                        label_id: item
                    }))
                } });
        });
        const column_update_data = article.article_data.map((item) => {
            return {
                where: {
                    outer_id: item.outer_id
                },
                create: Object.assign(Object.assign({}, item), { categorys: {
                        connect: {
                            category_id: article.category
                        }
                    }, labels: {
                        connect: article.labels.map((item) => ({
                            label_id: item
                        }))
                    } }),
                update: item
            };
        });
        const delete_data = article.article_data.map((item) => {
            return item.outer_id;
        });
        if (article.article_type === 'GATHER') {
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    articles: {
                        upsert: {
                            where: {
                                gather_id: article.gather_id
                            },
                            create: {
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                                gather_img: article.gather_img,
                                gather_name: article.gather_name,
                            },
                            update: {
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                                gather_img: article.gather_img,
                            }
                        }
                    },
                }
            });
            article.article_data.forEach(async (item) => {
                await this.prisma.gather.update({
                    where: {
                        gather_id: article.gather_id
                    },
                    data: {
                        articles: {
                            upsert: {
                                where: {
                                    outer_id: item.outer_id
                                },
                                create: Object.assign(Object.assign({}, item), { categorys: {
                                        connect: {
                                            category_id: article.category
                                        }
                                    }, labels: {
                                        connect: article.labels.map((item) => ({
                                            label_id: item
                                        }))
                                    } }),
                                update: Object.assign(Object.assign({}, item), { categorys: {
                                        connect: {
                                            category_id: article.category
                                        }
                                    }, labels: {
                                        connect: article.labels.map((item) => ({
                                            label_id: item
                                        }))
                                    } })
                            }
                        }
                    }
                });
            });
        }
        else {
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    articles: {
                        upsert: {
                            where: {
                                gather_id: article.gather_id
                            },
                            create: {
                                articles: {
                                    create: articles_data
                                },
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                            },
                            update: {
                                articles: {
                                    upsert: column_update_data,
                                    deleteMany: {
                                        outer_id: {
                                            notIn: delete_data
                                        }
                                    }
                                },
                            }
                        }
                    },
                }
            });
        }
        if (article.article_type === 'GATHER') {
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    draft: {
                        upsert: {
                            where: {
                                draft: article.gather_id + uid
                            },
                            create: {
                                article_id: article.gather_id,
                                time_stmap: time,
                                draft: article.gather_id + uid
                            },
                            update: {
                                time_stmap: time,
                            }
                        }
                    }
                }
            });
        }
        else {
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    draft: {
                        upsert: {
                            where: {
                                draft: article.article_data[0].outer_id + uid,
                            },
                            create: {
                                article_id: article.article_data[0].outer_id,
                                time_stmap: time,
                                draft: article.article_data[0].outer_id + uid,
                            },
                            update: {
                                time_stmap: time
                            }
                        }
                    }
                }
            });
        }
        return 200;
    }
    async createArticle(article, uid) {
        const category = await this.categoryService.findCategoryById(article.category);
        const labels = await this.labelService.findLabelsById(article.labels.map((item) => item));
        const labels_name = labels.map((item) => item.description);
        const articles_data = article.article_data.map((item) => {
            return Object.assign(Object.assign({}, item), { release: true, categorys: {
                    connect: {
                        category_id: article.category
                    }
                }, labels: {
                    connect: article.labels.map((item) => ({
                        label_id: item
                    }))
                } });
        });
        const update_data = article.article_data.map((item) => {
            return {
                where: {
                    outer_id: item.outer_id
                },
                data: Object.assign(Object.assign({}, item), { release: true, categorys: {
                        connect: {
                            category_id: article.category
                        }
                    }, labels: {
                        connect: article.labels.map((item) => ({
                            label_id: item
                        }))
                    } })
            };
        });
        const column_update_data = article.article_data.map((item) => {
            return {
                where: {
                    outer_id: item.outer_id
                },
                create: Object.assign(Object.assign({}, item), { release: true, categorys: {
                        connect: {
                            category_id: article.category
                        }
                    }, labels: {
                        connect: article.labels.map((item) => ({
                            label_id: item
                        }))
                    } }),
                update: item
            };
        });
        const delete_data = article.article_data.map((item) => {
            return item.outer_id;
        });
        const items = article.article_data.reduce((prev, current) => {
            prev.push({
                ItemId: current.outer_id,
                Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                Labels: labels_name,
                Categories: [category.description]
            });
            return prev;
        }, []);
        const user = await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                info: true
            }
        });
        if (article.article_type === 'GATHER') {
            const infoList = user.info.map((item) => {
                return {
                    where: {
                        uuid: item.uuid
                    },
                    data: {
                        message: {
                            connectOrCreate: {
                                where: {
                                    article_id: article.article_data[0].outer_id
                                },
                                create: {
                                    article_id: article.article_data[0].outer_id,
                                    timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                    title: article.article_data[0].title,
                                    article_type: article.article_type
                                }
                            }
                        }
                    }
                };
            });
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    articles: {
                        upsert: {
                            where: {
                                gather_id: article.gather_id
                            },
                            create: {
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                                gather_img: article.gather_img,
                                gather_release: true
                            },
                            update: {
                                articles: {
                                    update: update_data,
                                    deleteMany: {
                                        outer_id: {
                                            notIn: delete_data
                                        }
                                    }
                                },
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                                gather_img: article.gather_img,
                            }
                        }
                    },
                    dynamic: {
                        create: {
                            content: article.gather_id,
                            type: 'RELEASE',
                            time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')
                        }
                    },
                    info: {
                        update: infoList
                    }
                },
            });
            article.article_data.forEach(async (item) => {
                await this.prisma.gather.update({
                    where: {
                        gather_id: article.gather_id
                    },
                    data: {
                        articles: {
                            create: Object.assign(Object.assign({}, item), { release: true, categorys: {
                                    connect: {
                                        category_id: article.category
                                    }
                                }, labels: {
                                    connect: article.labels.map((item) => ({
                                        label_id: item
                                    }))
                                } })
                        }
                    }
                });
            });
        }
        else {
            const infoList = user.info.map((item) => {
                return {
                    where: {
                        uuid: item.uuid
                    },
                    data: {
                        message: {
                            connectOrCreate: {
                                where: {
                                    article_id: article.gather_id
                                },
                                create: {
                                    article_id: article.gather_id,
                                    timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                    title: article.gather_name,
                                    article_type: article.article_type
                                }
                            }
                        }
                    }
                };
            });
            await this.prisma.user.update({
                where: {
                    uuid: uid
                },
                data: {
                    articles: {
                        upsert: {
                            where: {
                                gather_id: article.gather_id
                            },
                            create: {
                                articles: {
                                    create: articles_data
                                },
                                article_description: article.article_description,
                                article_type: article.article_type,
                                gather_id: article.gather_id,
                                gather_release: true
                            },
                            update: {
                                articles: {
                                    upsert: column_update_data,
                                    deleteMany: {
                                        outer_id: {
                                            notIn: delete_data
                                        }
                                    }
                                },
                            }
                        }
                    },
                    dynamic: {
                        create: {
                            content: article.article_data[0].outer_id,
                            type: 'RELEASE',
                            time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')
                        }
                    },
                    info: {
                        update: infoList
                    }
                }
            });
        }
        await this.ItemService.insertItemList(items);
        article.article_data.forEach(async (item) => {
            await this.elasticsearchService.index({
                index: 'articles',
                id: item.outer_id,
                body: {
                    id: item.outer_id,
                    title: item.title,
                    category: category.description,
                    type: article.article_type,
                    labels: labels_name
                },
            });
        });
        return {
            article_id: article.gather_id
        };
    }
    async collectionArticle(uid, id) {
        this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                collection: {
                    create: {
                        article_id: id,
                        collect_id: uid + id
                    }
                }
            }
        });
    }
    async addDynamic(uid, content, type) {
        return await this.prisma.user.update({
            where: {
                uuid: uid,
            },
            data: {
                dynamic: {
                    create: {
                        content,
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        type
                    }
                }
            }
        });
    }
    async followUser(uid, follow_id) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                follow: {
                    create: {
                        follow_id
                    }
                }
            }
        });
    }
    async collection(uid, article_id, type = 'COLLECTION') {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                collection: {
                    create: {
                        article_id,
                        collect_id: uid + article_id
                    }
                },
                dynamic: {
                    create: {
                        content: article_id,
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        type
                    }
                }
            }
        });
    }
    async removeCollect(uuid, article_id) {
        return await this.prisma.user.update({
            where: {
                uuid
            },
            data: {
                collection: {
                    delete: {
                        collect_id: uuid + article_id
                    }
                }
            }
        });
    }
    async getAllArticles(uid, page = 0) {
        return await this.prisma.gather.findMany({
            where: {
                authorId: uid,
                articles: {
                    every: {
                        outer_id: {
                            not: ""
                        },
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
            skip: page * 3,
            take: 3
        });
    }
    async getAllGatherArticlesPagenation(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: {
                            equals: 'GATHER',
                        },
                        gather_release: {
                            equals: true
                        }
                    }
                }
            }
        });
    }
    async getAllColumnArtilcesPagenation(uid, page) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: {
                            not: 'GATHER',
                        },
                        gather_release: {
                            equals: true
                        }
                    },
                    skip: 5 * page,
                    take: 5
                },
            }
        });
    }
    async addRecords(uid, article_id) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                record: {
                    upsert: {
                        where: {
                            record: uid + article_id
                        },
                        create: {
                            article_id: article_id,
                            timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                            percentage: '0',
                            record: uid + article_id
                        },
                        update: {
                            timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        }
                    }
                },
            },
        });
    }
    async getFollowUserStatus(uid, follow_id) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                follow: {
                    where: {
                        follow_id
                    }
                }
            }
        });
    }
    async addZan(uid, article_id) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                zan: {
                    connectOrCreate: {
                        where: {
                            zan_id: uid + article_id
                        },
                        create: {
                            zan_id: uid + article_id,
                            article: {
                                connect: {
                                    outer_id: article_id
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async removeZan(uuid, id) {
        return await this.prisma.user.update({
            where: {
                uuid
            },
            data: {
                zan: {
                    delete: {
                        zan_id: uuid + id
                    }
                }
            }
        });
    }
    async getRecords(page, uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                record: {
                    skip: page * 10,
                    take: 10,
                    orderBy: {
                        timestamp: 'desc'
                    },
                    select: {
                        timestamp: true,
                        article_id: true
                    }
                }
            },
        });
    }
    async getDynamic(uid, page) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid,
            },
            select: {
                dynamic: {
                    skip: page * 5,
                    take: 5
                },
            },
        });
    }
    async findOne(id) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: id
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
    async create(data) {
        return await this.prisma.user.create({
            data
        });
    }
    async getDraft(uid, page) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            include: {
                draft: {
                    skip: 5 * page,
                    take: 5
                }
            },
        });
    }
    async getUserSaved(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                collection: true
            }
        });
    }
    async collectArticle(uid, id) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                collection: {
                    connectOrCreate: {
                        where: {
                            collect_id: uid + id
                        },
                        create: {
                            article: {
                                connect: {
                                    outer_id: id
                                }
                            },
                            collect_id: uid + id
                        }
                    }
                },
                dynamic: {
                    create: {
                        type: 'COLLECTION',
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        content: 'saved article'
                    }
                }
            }
        });
    }
    async getUserInfo(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            include: {
                zan: true,
                reading: true,
            }
        });
    }
    async getWritingArticle(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    select: {
                        articles: {
                            select: {
                                outer_id: true
                            }
                        }
                    }
                },
            }
        });
    }
    async getBaseMusterInfo(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: 'COLUMN',
                    },
                    select: {
                        gather_id: true,
                        gather_name: true,
                        gather_img: true,
                        article_description: true,
                        article_type: true,
                        articles: {
                            select: {
                                outer_id: true
                            }
                        },
                    },
                },
            },
        });
    }
    async getSingleInfo(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: 'SINGLE'
                    },
                    select: {
                        articles: {
                            include: {
                                info: true,
                                zan: true,
                                collection: true,
                                categorys: true,
                                labels: true,
                            }
                        },
                        article_type: true
                    },
                }
            }
        });
    }
    async getColletionArticles(uid, page = 0) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                collection: {
                    select: {
                        article_id: true
                    },
                    take: 5,
                    skip: page * 5
                }
            }
        });
    }
    async getArticleByGatherId(id) {
        return await this.prisma.gather.findUnique({
            where: {
                gather_id: id
            },
            select: {
                gather_img: true,
                gather_name: true,
                author: {
                    select: {
                        name: true,
                        user_img: true,
                        uuid: true
                    }
                },
                articles: true,
                article_description: true
            }
        });
    }
    async createColumn(data, uid) {
        return await this.prisma.user.update({
            where: {
                uuid: uid
            },
            data: {
                articles: {
                    create: {
                        gather_name: data.gather_name,
                        article_description: data.article_description,
                        gather_img: data.gather_img,
                        gather_id: (0, nanoid_1.nanoid)()
                    }
                }
            }
        });
    }
    async getColumn(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    where: {
                        article_type: 'COLUMN'
                    },
                    include: {
                        articles: true
                    }
                }
            }
        });
    }
    async getColumnArticle(gather_id) {
        return await this.prisma.gather.findUnique({
            where: {
                gather_id: gather_id
            },
            include: {
                articles: {
                    include: {
                        zan: true,
                        labels: true,
                        categorys: true,
                    }
                },
                author: true,
            },
        });
    }
    async getArticlesInfo(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                articles: {
                    select: {
                        articles: {
                            select: {
                                zan: true,
                                hot: true
                            }
                        }
                    }
                },
            }
        });
    }
    async getLastetRecords(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid: uid
            },
            select: {
                record: {
                    select: {
                        article_id: true
                    },
                    orderBy: {
                        timestamp: 'desc'
                    }
                }
            }
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        item_service_1.RecommendItemService,
        category_service_1.CategoryService,
        label_service_1.LabelService,
        elasticsearch_1.ElasticsearchService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map