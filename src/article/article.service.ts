import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { AppService } from 'src/app.service';
import { ArticleType, ArtiType } from './article.dto';

@Injectable()
export class ArticleService {
  constructor (private prisma: AppService) {}

  async getGatherArticle(id: string) {
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
    })

  }

  async getMusterArticle(id: string) {
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
    })
  }

  async addZanInMuster(id: string) {
    return await this.prisma.musterArticle.update({
      where: {
        outer_id: id
      },
      data: {
        zan: {
          increment: 1
        }
      }
    })
  }

  async addZanInGather(id: string) {
    return await this.prisma.gatherArticle.update({
      where: {
        outer_id: id
      },
      data: {
        zan: {
          increment: 1
        }
      }
    }) 
  }

  async readingsMuster(id: string) {
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
    })
  }

  async artilceBeFollowed(uid: string, id: string, type: ArticleType) {
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
      })
    } else if (type === 'MUSTER') {
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
      })
    } {
      throw Error()
    }
  }

  async getGatherById(id: string) {
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
    })
  } 

  async removeMusterArticleById(id: string, uid: string) {
    await this.prisma.musterArticle.delete({
      where: {
        outer_id: id,
        
      },
    })
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
    })
    return 200
  }
}
