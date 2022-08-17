import { HttpService } from "@nestjs/axios";
export declare class RecommendService {
    private httpService;
    constructor(httpService: HttpService);
    latestRecoommend(): Promise<any>;
}
