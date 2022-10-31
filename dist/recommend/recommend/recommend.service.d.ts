import { HttpService } from "@nestjs/axios";
import { RecommendItem } from "./recommend.dto";
export declare class RecommendService {
    private httpService;
    constructor(httpService: HttpService);
    latestRecoommend(label: string, page: number): Promise<[RecommendItem]>;
    popularRecommend(label: string, page: number): Promise<[RecommendItem]>;
    userRecommend(uid: string, page: number): Promise<[string]>;
    relateRecommend(uid: string): Promise<[string]>;
    popularRelate(label: string): Promise<[RecommendItem]>;
}
