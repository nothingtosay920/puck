import { Request, Response } from 'express';
import { AppService } from './app.service';
interface MyContext {
    req: Request;
    res: Response;
}
export declare class AppResolver {
    private readonly appService;
    constructor(appService: AppService);
    getCookie(context: MyContext): Promise<string>;
}
export {};
