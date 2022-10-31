import { Injectable } from "@nestjs/common";
import { format } from "date-fns";
import { AppService } from "src/app.service";

@Injectable()
export class InfoService {
  constructor(private prisma: AppService) {}

  async createInfo(uid: string) {
    return await this.prisma.info.create({
      data: {
        uuid: uid,
        reading_time: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      }
    })
  }
  
}