import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map } from "rxjs";
import { RecommendUserInput } from "./user.input";

@Injectable()
export class RcommendUserService {
  constructor(private httpService: HttpService) {}

  async insertUser(data: RecommendUserInput) {
    return await firstValueFrom(this.httpService.post(process.env.RECOMMEND_SERVICE + 'api/user', data).pipe(map(res => res.data)))
  }

  async getUserByUserId(id: string) {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/user' + `/${id}`).pipe(map(res => res.data)))
  }

  async getUsers() {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/users').pipe(map(res => res.data)))
  }
}