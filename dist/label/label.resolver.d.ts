import { CreateLabelInput } from './label.input';
import { LabelService } from './label.service';
export declare class LabelResolver {
    private readonly labelService;
    constructor(labelService: LabelService);
    createManyLabels(data: CreateLabelInput): Promise<import(".prisma/client").Label>;
    getLabels(): Promise<import(".prisma/client").Label[]>;
    putLabel(id: string, category: string, desc: string): number;
}
