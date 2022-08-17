import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";
import { LabelType } from "src/users/users.input";
import { RecommendItem } from "./recommend.dto";

@Injectable()
export class RecommendService {
  constructor(private httpService: HttpService) {}

  async latestRecoommend(label: LabelType[]): Promise<[RecommendItem]> {
    
    let data: string = ''
      label.forEach((item) => {
        data += `/${item.label}`
      })
    
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/api/latest' + data).pipe(map(res => res.data)))
  }

  async popularRecommend(label: string | string[] = ''): Promise<[RecommendItem]> {
    let data: string
    if (label instanceof Array) {
      label.forEach((item) => {
        data += `/${item}`
      })
    } else {
      data = `/${label}`
    } 
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/api/popular'+ data).pipe(map(res => res.data)))
  }


}