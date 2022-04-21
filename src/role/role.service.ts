import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class RoleService {

  constructor(private prisma: AppService) {}

  findOne(id: string) {
    return this.prisma.role.findUnique({
      where: {
        uuid: id
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
