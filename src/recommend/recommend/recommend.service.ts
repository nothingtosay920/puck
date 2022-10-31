import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";
import { LabelType } from "src/users/users.input";
import { RecommendItem } from "./recommend.dto";

@Injectable()
export class RecommendService {
  constructor(private httpService: HttpService) {}

  async latestRecoommend(label: string, page: number): Promise<[RecommendItem]> {

    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/latest/' + label + `?n=8&offset=${page}`).pipe(map(res => res.data)))
  }

  async popularRecommend(label: string, page: number): Promise<[RecommendItem]> {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/popular/'+ label + `?n=8&offset=${page}`).pipe(map(res => res.data)))
  }

  async userRecommend(uid: string, page: number): Promise<[string]> {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/recommend/'+ uid + `?n=8&offset=${page}`).pipe(map(res => res.data)))
  }

  async relateRecommend(uid: string): Promise<[string]> {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/recommend/'+ uid + `?n=5`).pipe(map(res => res.data)))
  }


  async popularRelate(label: string): Promise<[RecommendItem]> {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/popular/'+ label + '?n=5').pipe(map(res => res.data)))
  }
}