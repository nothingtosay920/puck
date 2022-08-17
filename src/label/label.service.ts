import { Injectable } from '@nestjs/common';
import { prisma, Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import { AppService } from 'src/app.service';
import { ArrayType } from 'src/types/types';
import { CreateLabelInput } from './label.input';


@Injectable()
export class LabelService {
  constructor(private readonly prisma: AppService) {}

  async getLabels() {
    return await this.prisma.label.findMany()
  }

  async createLabel(data: CreateLabelInput) {
    return await this.prisma.label.create({
      data: {
        name: data.name,
        description: data.description,
        label_id: data.label_id,
        categorys: {
          connect: {
            category_id: data.categorys,
          }
        }
      }
    })
  }

  async putLabel(id: string, category: string, desc: string) {
    return await this.prisma.label.update({
      where: {
        label_id:id
      },
      data: {
        category,
        description: desc
      }
    })
  }

  async findLabelsById(id: string[]) {
    return await this.prisma.label.findMany({
      where: {
        label_id: {
          in: id
        }
      }
    })
  }


}
