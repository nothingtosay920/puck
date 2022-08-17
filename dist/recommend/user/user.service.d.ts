import { HttpService } from "@nestjs/axios";
import { RecommendUserInput } from "./user.input";
export declare class RcommendUserService {
    private httpService;
    constructor(httpService: HttpService);
    insertUser(data: RecommendUserInput): Promise<any>;
    getUserByUserId(id: string): Promise<any>;
    getUsers(): Promise<any>;
}
