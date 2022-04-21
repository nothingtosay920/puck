import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';

@Injectable()
export class ArticleService {
  constructor (private prisma: AppService) {}

  createGather(data: Prisma.GatherCreateInput) {
    return this.prisma.gather.create({ data })
  }

  // getArticle() {
  //   return this.prisma.article.findMany()
  // }
}
