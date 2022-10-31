import { HttpService } from "@nestjs/axios";
import { ItemRes } from "./item.dto";
import { Item } from "./item.input";
export declare class RecommendItemService {
    private httpService;
    constructor(httpService: HttpService);
    insertItem(data: Item): Promise<ItemRes>;
    insertItemList(data: Item[]): Promise<any>;
    getItemById(id: string): Promise<any>;
    getItemNeighbors(id: string): Promise<ItemRes>;
    patchItem(id: string): Promise<any>;
    deleteItemByItemId(id: string): Promise<any>;
}
