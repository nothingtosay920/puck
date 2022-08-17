import { Module } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AppService } from "src/app.service";
import { EmitResolver } from "./emit.resolver";
import { EmitService } from "./emit.service";
import { ListenerService } from "./listener";


@Module({
  providers: [
    AppService,
    EmitResolver,
    ListenerService,
    EmitService,
    EventEmitter2
  ],
})
export class EmitModule {}