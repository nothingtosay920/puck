import { Field, InterfaceType } from "@nestjs/graphql"


@InterfaceType()
export class UserInfoInter {
  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  user_img: string

  @Field({nullable: false})
  uuid: string
}

@InterfaceType()
export class BeFollowedData {
  @Field({nullable: false})
  uuid: string
}

@InterfaceType()
export class UserBeFollowedInter {
  @Field(() => [BeFollowedData])
  info: BeFollowedData[]
}

@InterfaceType()
export class InfoReadDataInter {
  @Field({nullable: false})
  reading_time: string
}

