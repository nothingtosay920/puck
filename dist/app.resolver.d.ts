import { HttpService } from '@nestjs/axios';
export declare class AppResolver {
    private readonly httpService;
    constructor(httpService: HttpService);
    hello(): string;
}
