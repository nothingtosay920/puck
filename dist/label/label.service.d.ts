import { AppService } from 'src/app.service';
import { CreateLabelInput } from './label.input';
export declare class LabelService {
    private readonly prisma;
    constructor(prisma: AppService);
    getLabels(): Promise<import(".prisma/client").Label[]>;
    createLabel(data: CreateLabelInput): Promise<import(".prisma/client").Label>;
    putLabel(id: string, category: string, desc: string): Promise<import(".prisma/client").Label>;
    findLabelsById(id: string[]): Promise<import(".prisma/client").Label[]>;
}
