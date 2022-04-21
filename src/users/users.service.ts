import { Dependencies, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { nanoid } from 'nanoid';
import { AppService } from 'src/app.service';
import { IContext } from 'src/auth/auth.service';
import { musterInput } from './users.input';

@Injectable()
export class UsersService {
  constructor(private prisma: AppService) {}

  getUser() {
    return this.prisma.user.findMany()
  }

  async createMusterArticle(article: musterInput, context: IContext) {
    const uid: string = context.req.session['uid']
    let user = await this.prisma.user.update({
      where: {
        uuid_user: uid
      },
      data: {
        muster_data: {
          create: {
            article_data: {
              create: {
                article: article.article_data.article,
                outer_id: nanoid(),
                tilte: article.article_data.tilte
              }
            },
            muster_id: nanoid(),
            name: article.name,
          }
        }
      }
    })
    return {
      name: user.name
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        uuid_user: id
      }
    })
  }

  findOneByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: {
        phone: phone
      }
    })
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data
    })
  }

  // async login(data: Prisma.UserCreateInput) {
  //   const prt = await this.prisma.user.findUnique({
  //     where: {
  //       phone: data.phone
  //     }
  //   })
  //   if (prt === null) {
  //     await this.prisma.user.create({
  //       data
  //     })
  //   } 
  //   return {
  //     access_token: this.jwtService.sign({
  //       id: prt.uuid_user,
  //       name: data.name
  //     })
  //   }
  // }
}
