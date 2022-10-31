import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Timeout } from "@nestjs/schedule";
import { format } from "date-fns";
import { UsersService } from "src/users/users.service";


@Injectable()
export class EmitService {
  constructor(private eventEmitter: EventEmitter2) {}

  articleEmit() {
    console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
    
    this.eventEmitter.emitAsync('article')
  }

  userEmit() {}

}