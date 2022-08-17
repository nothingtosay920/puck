import { Injectable } from "@nestjs/common";
import { AppService } from "src/app.service";


@Injectable()
export class MusterService {
  constructor(private readonly prisma: AppService) {}
  getMuster(id: string) {
    return this.prisma.muster.findUnique({
      where: {
        muster_id: id
      }
    })
  }
}