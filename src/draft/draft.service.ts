import { Injectable } from "@nestjs/common";
import { format } from "date-fns";
import { AppService } from "src/app.service";
import { ArticleType } from "src/article/article.dto";



@Injectable()
export class DraftService {
  constructor(private prisma: AppService) {}

  // async addDraft(uid: string, article_id: string, type: ArticleType) {
  //    await this.prisma.user.update({
  //     where: {
  //       uuid_user: uid
  //     },
  //     data: {
  //       draft: {
  //         upsert: {
  //           where: {
  //             article_id
  //           },
  //           create: {
  //             article_id,
  //             type,
  //             time_stmap: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  //           },
  //           update: {
  //             time_stmap: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //           }
  //         }
  //       }
  //     }
  //   })
  //   return 200
  // }


}