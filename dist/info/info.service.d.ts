import { AppService } from "src/app.service";
export declare class InfoService {
    private prisma;
    constructor(prisma: AppService);
    createInfo(uid: string): Promise<import(".prisma/client").Info>;
}
