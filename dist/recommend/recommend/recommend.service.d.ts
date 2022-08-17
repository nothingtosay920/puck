import { HttpService } from "@nestjs/axios";
import { LabelType } from "src/users/users.input";
import { RecommendItem } from "./recommend.dto";
export declare class RecommendService {
    private httpService;
    constructor(httpService: HttpService);
    latestRecoommend(label: LabelType[]): Promise<[RecommendItem]>;
    popularRecommend(label?: string | string[]): Promise<[RecommendItem]>;
}
