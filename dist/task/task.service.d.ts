import { HttpService } from '@nestjs/axios';
export declare class TasksService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly logger;
    handleCron(): void;
    gorse(): Promise<void>;
}
