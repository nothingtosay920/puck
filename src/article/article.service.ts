import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';


@Injectable()
export class ArticleService {
  constructor (private prisma: AppService) {}

  async findArticleFollow(outer_id: string, uuid: string) {
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
    })
  }

  async remoceArticleFollow(outer_id: string, uuid: string) {
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
    })
  }


  async getArticle(id: string) {
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
    })
  }

  async getGather(gather_id: string) {
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
    })
  }

  async removeArticleById(id: string) {
    return await this.prisma.article.delete({
      where: {
        outer_id: id
      },
    })
  }

  async searchAllArticle(query: string, uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid: uid
      },
      select: {
        articles:{
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
    })
  }


  async searchGatherArticle(query: string, uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid: uid
      },
      select: {
        articles:{
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
    })
  }

  async searchColumnArticle(query: string, uid: string) {
    return await this.prisma.user.findUnique({
      where: {
        uuid: uid
      },
      select: {
        articles:{
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
    })
  }

  async searchAuthorArticle(query: string, uid: string, page: number) {
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
      
    })
  }

  // async addZanInArticle(id: string) {
  //   return await this.prisma.article.update({
  //     where: {
  //       outer_id: id
  //     },
  //     data: {
  //       zan: {
  //         increment: 1
  //       }
  //     }
  //   })
  // }

  // async readingsArticle(id: string) {
  //   return await this.prisma.article.update({
  //     where: {
  //       outer_id: id
  //     },
  //     data: {
  //       readings: {
  //         increment: 1
  //       },
  //       hot: {
  //         increment: 1
  //       }
  //     }
  //   })
  // }

  async artilceBeFollowed(uid: string, id: string) {
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
    })
  }

  async getGatherById(id: string) {
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
    })
  } 
  
  async getArticlePanelStatus(uuid: string, article_id: string) {
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
    })
  }

}
