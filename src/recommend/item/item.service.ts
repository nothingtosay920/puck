import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { firstValueFrom, map } from "rxjs"
import { ItemRes } from "./item.dto"
import { Item } from "./item.input"


@Injectable()
export class RecommendItemService {
  constructor(private httpService: HttpService) {}

  // Insert an item.Overwrite if the item exists.
  async insertItem(data: Item): Promise<ItemRes> {
    return await firstValueFrom(this.httpService.post(process.env.RECOMMEND_SERVICE + 'api/item', data).pipe(map(res => res.data)))
  }

  async insertItemList(data: Item[]) {
    return await firstValueFrom(this.httpService.post(process.env.RECOMMEND_SERVICE + 'api/items', data).pipe(map(res => res.data)))
  }

  async getItemById(id: string) {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/item' + `/${id}`).pipe(map(res => res.data)))
  }

  async getItemNeighbors(id: string): Promise<ItemRes> {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + 'api/item/' + id + '/neighbors').pipe(map(res => res.data)))
  }

  async patchItem(id: string) {
    return await firstValueFrom(this.httpService.patch(process.env.RECOMMEND_SERVICE + '/item' + `/${id}`).pipe(map(res => res.data)))
  }

  async deleteItemByItemId(id: string) {
    return await firstValueFrom(this.httpService.delete(process.env.RECOMMEND_SERVICE + '/item' + `/${id}`).pipe(map(res => res.data)))
  }

  // async putItemAddCategory() {
  // }

  // deleteItemCategory() {}
  
}