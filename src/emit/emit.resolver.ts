import { Query, Resolver } from "@nestjs/graphql"
import { EmitService } from "./emit.service"
import { ListenerService } from "./listener"


@Resolver()
export class EmitResolver {
  constructor(private readonly emitService: EmitService,private listener: ListenerService) {}

  @Query(() => Number)
  emit() {
     this.emitService.articleEmit()
    return 1
  }

  @Query(() => Number)
  setListen() {
    this.listener.handleArticleCreatedEvent()
    return 1
  }
}
