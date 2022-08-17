import { Dependencies, Injectable } from '@nestjs/common';
import { DynamicType, Prisma, User } from '@prisma/client';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { firstValueFrom, map, take } from 'rxjs';
import { AppService } from 'src/app.service';
import { CMuster } from 'src/article/article.input';
import { IContext } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { ListenerService } from 'src/emit/listener';
import { LabelService } from 'src/label/label.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { GatherInput, MusterInput } from './users.input';

@Injectable()
export class UsersService {
  constructor(private prisma: AppService,
     private ItemService: RecommendItemService,
     private categoryService: CategoryService,
     private labelService: LabelService
     ) {}

  async saveMusterArticle(article: MusterInput, context: IContext) {
    const uid: string = context.req.session['uid']
    const outer_id = 'M' + nanoid()
    const time = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

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
            muster_id: nanoid(),
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
    })
    return outer_id
  }

  async savedGather(article: GatherInput, context: IContext) {
    const uid: string = context.req.session['uid']
    const gather_id = nanoid()
    const articles = article.article_data.map((item, index) => {
      let id = 'G' + nanoid()
      return {
        ...item,
        outer_id: id,
        edit_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        release: true,
      }
    })
    
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
    })

    return 200
  }

  // async createMusterArticle(article: MusterInput, context: IContext) {
  //   const uid: string = context.req.session['uid']
  //   const outer_id = 'M' + nanoid()
  //   const category = await this.categoryService.findCategoryById(article.category)
  //   const labels = await this.labelService.findLabelsById(article.labels.map((item) => item.label))
  //   const labels_name = labels.map((item) => item.description)
  //   const itemData = {
  //     ItemId: outer_id,
  //     Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     Labels: labels_name,
  //     Comment: null,
  //     Categories: [category.description, ...labels_name]
  //   }
  //   await this.prisma.user.upsert({
  //     where: {
  //       uuid_user: uid
  //     },
  //     update: {
  //       muster_data: {
  //         create: {
  //           article_data: {
  //             create: {
  //               article: article.article_data.article,
  //               title: article.article_data.title,
  //               outer_id,
  //               description: article.article_data.description,
  //               article_img: article.article_data.articleImg,
  //               release: true,
  //               edit_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //               categorys: {
  //                 create: {
  //                  category: article.category
  //                 }
  //               },
  //               labels: {
  //                 createMany: {
  //                   data: article.labels
  //                 }
  //               },
  //             }
  //           },
  //           muster_id: nanoid(),
  //         },
  //       },
  //       dynamic: {
  //         create: {
  //           type: "RELEASE",
  //           content: outer_id,
  //           time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  //         }
  //       }
  //     }
  //   })
  //   await this.ItemService.insertItem(itemData)
  //   // await this.listenerService.handleUserCreatedEvent()
  //   return outer_id
  // }

  async createMuster(article: MusterInput, uid: string) {

    const outer_id = 'M' + nanoid()
    const category = await this.categoryService.findCategoryById(article.category)
    
    const labels = await this.labelService.findLabelsById(article.labels.map((item) => item.label))
    const labels_name = labels.map((item) => item.description)
    const itemData = {
      ItemId: outer_id,
      Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      Labels: labels_name,
      Comment: null,
      Categories: [category.description, ...labels_name]
    }
    await this.prisma.user.update({
      where: {
        uuid_user: uid
      },
      data: {
        muster_data: {
          upsert: {
            where: {
              muster_id:article.muster_id
            },
            create: {
              muster_id: nanoid(),
              name: "",
              article_data: {
                create: {
                  article: article.article_data.article,
                  article_img: article.article_data.articleImg,
                  description: article.article_data.description,
                  title: article.article_data.title,
                  
                  outer_id: outer_id,
                  edit_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          }
        }
      }
    })
    if (!article.muster_id && !article.muster_article_id) {
      await this.ItemService.insertItem(itemData)
    }
    return {
      article_id: article.muster_article_id ? article.muster_article_id : outer_id
    }
  }

  async savedMuster(article: MusterInput, uid: string) {
    const outer_id = 'M' + nanoid()
    await this.prisma.user.update({
      where: {
        uuid_user: uid
      },
      data: {
        muster_data: {
          upsert: {
            where: {
              muster_id:article.muster_id
            },
            create: {
              muster_id: nanoid(),
              name: "",
              article_data: {
                create: {
                  article: article.article_data.article,
                  article_img: article.article_data.articleImg,
                  description: article.article_data.description,
                  title: article.article_data.title,
                  outer_id: outer_id,
                  edit_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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
    })
    return 200
  }

  async createGather(article: GatherInput, context: IContext) {
    const uid: string = context.req.session['uid']
    const items: {
      ItemId: string,
      Timestamp: string,
      Labels: string[],
      Categories: string[]
    }[] = []
    const category = await this.categoryService.findCategoryById(article.category)
    const labels = await this.labelService.findLabelsById(article.labels.map((item) => item.label))
    const labels_name = labels.map((item) => item.description)

    const gather_id = nanoid()
    const articles = article.article_data.map((item, index) => {
      let id = 'G' + nanoid()
      items.push({
        ItemId: id,
        Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        Labels: labels_name,
        Categories: [category.description, ...labels_name]
      })
      return {
        ...item,
        outer_id: id,
        edit_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        release: true,
      }
    })

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
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          }
        }
      }
    })
    if (!article.gather_id) {
      await this.ItemService.insertItemList(items)
    }


    return {
      article: article.gather_id ? article.gather_id : gather_id
    }
  }
  
  async collectionArticle(uid: string, id: string) {
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
    })
  }

  async addDynamic(uid: string, content: string, type: DynamicType) {
    return await this.prisma.user.update({
      where: {
        uuid_user: uid,
      },
      data: {
        dynamic: {
          create: {
            content,
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            type
          }
        }
      }
    })
  }

  async followUser(uid: string, follow_id: string) {
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
    })
  }

  async beFollowUser(uid: string, be_followed: string) {
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
    })
  }

  async collection(uid:string, article_id: string, dynamicContent: string, type: DynamicType = 'COLLECTION') {
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
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            type
          }
        }
      }
    })
  }

  async getAllMusterArticles(uid: string, page: number = 0) {

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
    })
  }

  async getAllMusterArticlesPagenation(uid: string, page: number = 0) {

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
    })

  }

  async getAllGatherArticles(uid: string, p: number = 0) {



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
    })
  }

  async getAllGatherArticlesPagenation(uid: string, p: number = 0) {

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
    })
  }

  async addRecords(uid: string, article_id: string) {
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
              timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
              percentage: '0'
            },
            update: {
              timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            }
          }
        }
      }      
    })
  }

  async getRecords(page: number, uid: string) {
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
    })
  }

  async getDynamic(uid: string, page: number) {
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
    })
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid_user: id
      }
    })
  }

  findOneByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: {
        phone: phone
      }
    })
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data
    })
  }

  async addUserZan(uid: string, id: string) {
    return await this.prisma.user.update({
      where: {
        uuid_user: uid
      },
      data: {
        zan_list: {
          create: {
            article_id: id,
            timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          }
        },
        dynamic: {
          create: {
            type: 'ZAN',
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            content: id
          }
        }
      }
    })
  }

  async findUserZan(uid: string, id: string) {
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
    })
  }

  async getDraft(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid_user: uid
      },
      include: {
        draft: true
      }
    })
  }

  async getUserSaved(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid_user: uid
      },
      select: {
        collection: true
      }
    })
  }

  async saveArticle(uid: string, id: string) {
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
            time_tamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            content: 'saved article'
          }
        }
      }
    })
  }

  async getUserInfo(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid_user: uid
      },
      select: {
        user_img: true,
        name: true
      }
    })
  }

  async getWritingArticle(uid: string) {
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
    })
  }

  async getBaseMusterInfo(uid: string) {
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
    })
  }

  async userBeFollowedNum(uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid_user: uid
      },
      select: {
        be_follow: true
      }
    })
  }

  async userBeFollowedStatus(uid: string, follow_user: string) {
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
    })
  }

  async getColletionArticles(uid: string, page: number = 0) {
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
    })
  }

  async getMusterArticleById(mid: string) {
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
    })
  }

  async cMuster(data: CMuster, uid: string) {
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
            muster_id: nanoid()
          }
        }
      }
    })
  }

  async getMusterColumn(uid: string) {
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
    })
  }

}
