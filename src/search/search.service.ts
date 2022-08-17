import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";



@Injectable()
export class SearchService {
  constructor(private readonly prisma: AppService) {}

  // async findArticle(str: string) {
  //   return await this.prisma.musterArticle.findMany({
  //     where: {

  //     }
  //   })
  // }
 


}
