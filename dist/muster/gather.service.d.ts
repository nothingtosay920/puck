import { AppService } from "src/app.service";
export declare class GatherService {
    private readonly prisma;
    constructor(prisma: AppService);
    getGather(id: string): import(".prisma/client").Prisma.Prisma__GatherClient<import(".prisma/client").Gather & {
        labels: import(".prisma/client").GatherLabelMap[];
        categorys: import(".prisma/client").CategoryGatherMap[];
    }>;
}
