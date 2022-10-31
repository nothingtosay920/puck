import { HttpService } from "@nestjs/axios";
import { FeebBackArgs } from "./feedback.input";
export declare class FeedbackService {
    private httpService;
    constructor(httpService: HttpService);
    insertFeedbacks(data: FeebBackArgs): Promise<any>;
    getFeedbacks(): Promise<any>;
}
