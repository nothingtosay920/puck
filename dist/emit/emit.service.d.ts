import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class EmitService {
    private eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    articleEmit(): void;
    userEmit(): void;
}
