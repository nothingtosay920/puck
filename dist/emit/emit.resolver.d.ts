import { EmitService } from "./emit.service";
import { ListenerService } from "./listener";
export declare class EmitResolver {
    private readonly emitService;
    private listener;
    constructor(emitService: EmitService, listener: ListenerService);
    emit(): number;
    setListen(): number;
}
