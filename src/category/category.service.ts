import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';
import { CreateLabelInput } from 'src/label/label.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: AppService) {}

  async getCategory() {
    return await this.prisma.category.findMany({
      select: {
        name: true,
        description: true,
        category_id: true,
        labels: {
          select: {
            label_id: true,
            category: true,
            name: true,
            description: true
          }
        }
      },
      orderBy: {
        category_id: 'asc'
      }
    })
  }

  async findCategoryById(id: string) {
    return await this.prisma.category.findUnique({
      where: {
        category_id: id
      }
    })
  }

  async createUserCategory(data: Prisma.CategoryCreateInput) {
    return await this.prisma.category.create({ 
      data: {
        description: data.description,
        name: data.name,
        category_id: data.category_id,
      }
     })
  }

  async testChange(id: string, d: string) {
    return await this.prisma.category.update({
      where: {
        category_id: id
      },
      data: {
        description: d
      }
    })
  }

  async putCategory(id: string, desc: string) {
    return await this.prisma.category.update({
      where: {
        category_id: id
      },
      data: {
        description: desc
      }
    })
  }
}
