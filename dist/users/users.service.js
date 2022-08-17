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
const date_fns_1 = require("date-fns");
const nanoid_1 = require("nanoid");
const app_service_1 = require("../app.service");
const category_service_1 = require("../category/category.service");
const label_service_1 = require("../label/label.service");
const item_service_1 = require("../recommend/item/item.service");
let UsersService = class UsersService {
    constructor(prisma, ItemService, categoryService, labelService) {
        this.prisma = prisma;
        this.ItemService = ItemService;
        this.categoryService = categoryService;
        this.labelService = labelService;
    }
    async saveMusterArticle(article, context) {
        const uid = context.req.session['uid'];
        const outer_id = 'M' + (0, nanoid_1.nanoid)();
        const time = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss');
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                muster_data: {
                    create: {
                        article_data: {
                            create: {
                                article: article.article_data.article,
                                title: article.article_data.title,
                                outer_id,
                                description: article.article_data.description,
                                article_img: article.article_data.articleImg,
                                edit_time: time,
                                categorys: {
                                    create: {
                                        category: article.category
                                    }
                                },
                                labels: {
                                    createMany: {
                                        data: article.labels
                                    }
                                },
                            }
                        },
                        muster_id: (0, nanoid_1.nanoid)(),
                        muster_img: article.muster_img,
                        description: article.muster_desc
                    },
                },
                draft: {
                    create: {
                        article_id: outer_id,
                        type: "MUSTER",
                        time_stmap: time,
                        title: article.article_data.title
                    }
                }
            }
        });
        return outer_id;
    }
    async savedGather(article, context) {
        const uid = context.req.session['uid'];
        const gather_id = (0, nanoid_1.nanoid)();
        const articles = article.article_data.map((item, index) => {
            let id = 'G' + (0, nanoid_1.nanoid)();
            return Object.assign(Object.assign({}, item), { outer_id: id, edit_time: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'), release: true });
        });
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                gather_data: {
                    upsert: {
                        where: {
                            gather_id: article.gather_id
                        },
                        create: {
                            article_data: {
                                createMany: {
                                    data: articles
                                }
                            },
                            categorys: {
                                create: {
                                    category: article.category
                                }
                            },
                            labels: {
                                createMany: {
                                    data: article.labels
                                }
                            },
                            description: article.description,
                            gather_id,
                            gather_img: article.gather_img
                        },
                        update: {
                            article_data: {
                                update: {
                                    where: {},
                                    data: article.article_data
                                }
                            },
                            categorys: {
                                create: {
                                    category: article.category
                                }
                            },
                            labels: {
                                createMany: {
                                    data: article.labels
                                }
                            },
                            description: article.description,
                        }
                    }
                },
            }
        });
        return 200;
    }
    async createMuster(article, uid) {
        const outer_id = 'M' + (0, nanoid_1.nanoid)();
        const category = await this.categoryService.findCategoryById(article.category);
        const labels = await this.labelService.findLabelsById(article.labels.map((item) => item.label));
        const labels_name = labels.map((item) => item.description);
        const itemData = {
            ItemId: outer_id,
            Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            Labels: labels_name,
            Comment: null,
            Categories: [category.description, ...labels_name]
        };
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                muster_data: {
                    upsert: {
                        where: {
                            muster_id: article.muster_id
                        },
                        create: {
                            muster_id: (0, nanoid_1.nanoid)(),
                            name: "",
                            article_data: {
                                create: {
                                    article: article.article_data.article,
                                    article_img: article.article_data.articleImg,
                                    description: article.article_data.description,
                                    title: article.article_data.title,
                                    outer_id: outer_id,
                                    edit_time: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                    release: true,
                                    categorys: {
                                        create: {
                                            category: article.category
                                        }
                                    },
                                    labels: {
                                        createMany: {
                                            data: article.labels
                                        }
                                    }
                                }
                            },
                            type: 'SINGLE',
                            muster_img: article.muster_img ? article.muster_img : '',
                            description: article.muster_desc ? article.muster_desc : ''
                        },
                        update: {
                            article_data: {
                                update: {
                                    where: {
                                        outer_id: article.muster_article_id
                                    },
                                    data: {
                                        article: article.article_data.article,
                                        title: article.article_data.title,
                                        description: article.article_data.description,
                                        article_img: article.article_data.articleImg
                                    }
                                }
                            },
                            type: 'MUSTER'
                        }
                    }
                },
                dynamic: {
                    create: {
                        content: article.muster_article_id ? article.muster_article_id : outer_id,
                        type: 'RELEASE',
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                }
            }
        });
        if (!article.muster_id && !article.muster_article_id) {
            await this.ItemService.insertItem(itemData);
        }
        return {
            article_id: article.muster_article_id ? article.muster_article_id : outer_id
        };
    }
    async savedMuster(article, uid) {
        const outer_id = 'M' + (0, nanoid_1.nanoid)();
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                muster_data: {
                    upsert: {
                        where: {
                            muster_id: article.muster_id
                        },
                        create: {
                            muster_id: (0, nanoid_1.nanoid)(),
                            name: "",
                            article_data: {
                                create: {
                                    article: article.article_data.article,
                                    article_img: article.article_data.articleImg,
                                    description: article.article_data.description,
                                    title: article.article_data.title,
                                    outer_id: outer_id,
                                    edit_time: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                                }
                            },
                            type: 'SINGLE',
                            muster_img: article.muster_img,
                            description: article.muster_desc
                        },
                        update: {
                            article_data: {
                                update: {
                                    where: {
                                        outer_id: article.muster_article_id
                                    },
                                    data: {
                                        article: article.article_data.article,
                                        title: article.article_data.title,
                                        description: article.article_data.description,
                                        article_img: article.article_data.articleImg
                                    }
                                }
                            },
                        }
                    }
                }
            }
        });
        return 200;
    }
    async createGather(article, context) {
        const uid = context.req.session['uid'];
        const items = [];
        const category = await this.categoryService.findCategoryById(article.category);
        const labels = await this.labelService.findLabelsById(article.labels.map((item) => item.label));
        const labels_name = labels.map((item) => item.description);
        const gather_id = (0, nanoid_1.nanoid)();
        const articles = article.article_data.map((item, index) => {
            let id = 'G' + (0, nanoid_1.nanoid)();
            items.push({
                ItemId: id,
                Timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                Labels: labels_name,
                Categories: [category.description, ...labels_name]
            });
            return Object.assign(Object.assign({}, item), { outer_id: id, edit_time: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'), release: true });
        });
        await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                gather_data: {
                    upsert: {
                        where: {
                            gather_id: article.gather_id
                        },
                        create: {
                            article_data: {
                                createMany: {
                                    data: articles
                                }
                            },
                            categorys: {
                                create: {
                                    category: article.category
                                }
                            },
                            labels: {
                                createMany: {
                                    data: article.labels
                                }
                            },
                            description: article.description,
                            gather_id,
                            gather_img: article.gather_img
                        },
                        update: {
                            article_data: {
                                update: {
                                    where: {},
                                    data: article.article_data
                                }
                            },
                            categorys: {
                                create: {
                                    category: article.category
                                }
                            },
                            labels: {
                                createMany: {
                                    data: article.labels
                                }
                            },
                            description: article.description,
                        }
                    }
                },
                dynamic: {
                    create: {
                        type: "RELEASE",
                        content: gather_id,
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                }
            }
        });
        if (!article.gather_id) {
            await this.ItemService.insertItemList(items);
        }
        return {
            article: article.gather_id ? article.gather_id : gather_id
        };
    }
    async collectionArticle(uid, id) {
        this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                collection: {
                    create: {
                        article_id: id
                    }
                }
            }
        });
    }
    async addDynamic(uid, content, type) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid,
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
                uuid_user: uid
            },
            data: {
                follow: {
                    create: {
                        follow_user: follow_id
                    }
                }
            }
        });
    }
    async beFollowUser(uid, be_followed) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                be_follow: {
                    create: {
                        be_followed: be_followed
                    }
                }
            }
        });
    }
    async collection(uid, article_id, dynamicContent, type = 'COLLECTION') {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                collection: {
                    create: {
                        article_id
                    }
                },
                dynamic: {
                    create: {
                        content: dynamicContent,
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        type
                    }
                }
            }
        });
    }
    async getAllMusterArticles(uid, page = 0) {
        return await this.prisma.muster.findMany({
            where: {
                authorId: uid
            },
            select: {
                article_data: true,
                author: {
                    select: {
                        name: true,
                        uuid_user: true
                    }
                },
                muster_id: true,
                muster_img: true,
                name: true,
                type: true,
                description: true
            },
            skip: page * 3,
            take: 3
        });
    }
    async getAllMusterArticlesPagenation(uid, page = 0) {
        return await this.prisma.muster.findMany({
            where: {
                authorId: uid
            },
            select: {
                article_data: {
                    include: {
                        labels: {
                            select: {
                                Labels: {
                                    select: {
                                        name: true,
                                        description: true,
                                        label_id: true
                                    }
                                }
                            }
                        },
                    }
                },
                author: {
                    select: {
                        name: true,
                        uuid_user: true
                    }
                },
                muster_id: true,
                muster_img: true,
                name: true,
                type: true,
                description: true
            },
            skip: page * 3,
            take: 3
        });
    }
    async getAllGatherArticles(uid, p = 0) {
        return await this.prisma.gather.findMany({
            where: {
                authorId: uid,
                article_data: {
                    every: {
                        release: true
                    }
                }
            },
            select: {
                author: true,
                description: true,
                gather_id: true,
                article_data: true,
                labels: {
                    select: {
                        Labels: {
                            select: {
                                name: true,
                                description: true,
                                label_id: true
                            }
                        }
                    }
                }
            },
            take: 10,
            skip: 10 * p
        });
    }
    async getAllGatherArticlesPagenation(uid, p = 0) {
        return await this.prisma.gather.findMany({
            where: {
                authorId: uid,
                article_data: {
                    every: {
                        release: true
                    }
                }
            },
            select: {
                author: true,
                description: true,
                gather_id: true,
                article_data: {
                    select: {
                        title: true,
                        author: true,
                        zan: true,
                        hot: true,
                        befollowed: true,
                        outer_id: true,
                        article_img: true,
                        article_type: true,
                        edit_time: true
                    },
                },
                labels: {
                    select: {
                        Labels: {
                            select: {
                                name: true,
                                description: true,
                                label_id: true
                            }
                        }
                    }
                }
            },
            take: 3,
            skip: 3 * p
        });
    }
    async addRecords(uid, article_id) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                record: {
                    upsert: {
                        where: {
                            article_id: uid + '|' + article_id,
                        },
                        create: {
                            article_id: uid + '|' + article_id,
                            timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                            percentage: '0'
                        },
                        update: {
                            timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        }
                    }
                }
            }
        });
    }
    async getRecords(page, uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                record: {
                    skip: page * 10,
                    take: 10,
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
                uuid_user: uid,
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
    async create(data) {
        return await this.prisma.user.create({
            data
        });
    }
    async addUserZan(uid, id) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                zan_list: {
                    create: {
                        article_id: id,
                        timestamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss')
                    }
                },
                dynamic: {
                    create: {
                        type: 'ZAN',
                        time_tamp: (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                        content: id
                    }
                }
            }
        });
    }
    async findUserZan(uid, id) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid,
            },
            select: {
                zan_list: {
                    where: {
                        article_id: id
                    }
                },
                collection: {
                    where: {
                        article_id: id
                    }
                },
                be_follow: true
            }
        });
    }
    async getDraft(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            include: {
                draft: true
            }
        });
    }
    async getUserSaved(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                collection: true
            }
        });
    }
    async saveArticle(uid, id) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                collection: {
                    create: {
                        article_id: id
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
                uuid_user: uid
            },
            select: {
                user_img: true,
                name: true
            }
        });
    }
    async getWritingArticle(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                muster_data: {
                    select: {
                        article_data: {
                            select: {
                                outer_id: true
                            }
                        }
                    }
                },
                gather_data: {
                    select: {
                        article_data: {
                            select: {
                                outer_id: true
                            }
                        }
                    }
                }
            }
        });
    }
    async getBaseMusterInfo(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                muster_data: {
                    where: {
                        type: 'MUSTER'
                    },
                    select: {
                        muster_id: true,
                        name: true,
                    }
                }
            }
        });
    }
    async userBeFollowedNum(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                be_follow: true
            }
        });
    }
    async userBeFollowedStatus(uid, follow_user) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: follow_user
            },
            select: {
                be_follow: {
                    where: {
                        be_followed: uid
                    }
                }
            }
        });
    }
    async getColletionArticles(uid, page = 0) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
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
    async getMusterArticleById(mid) {
        return await this.prisma.muster.findUnique({
            where: {
                muster_id: mid
            },
            select: {
                muster_img: true,
                name: true,
                author: {
                    select: {
                        name: true,
                        user_img: true,
                        uuid_user: true
                    }
                },
                article_data: true,
                description: true
            }
        });
    }
    async cMuster(data, uid) {
        return await this.prisma.user.update({
            where: {
                uuid_user: uid
            },
            data: {
                muster_data: {
                    create: {
                        name: data.name,
                        description: data.desc,
                        muster_img: data.muster_img,
                        muster_id: (0, nanoid_1.nanoid)()
                    }
                }
            }
        });
    }
    async getMusterColumn(uid) {
        return await this.prisma.user.findUnique({
            where: {
                uuid_user: uid
            },
            select: {
                muster_data: {
                    where: {
                        type: 'MUSTER'
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
        label_service_1.LabelService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map