import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";


@Injectable()
export class GatherService {
  constructor(private readonly prisma: AppService) {}
  getGather(id: string) {
    return this.prisma.gather.findUnique({
      where: {
        gather_id: id
      },
      include: {
        labels: true,
        categorys: true
      }
    })
  }
}