import { AppService } from "src/app.service";
export declare class MusterService {
    private readonly prisma;
    constructor(prisma: AppService);
    getMuster(id: string): import(".prisma/client").Prisma.Prisma__MusterClient<import(".prisma/client").Muster>;
}
