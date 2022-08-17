import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, isNotEmpty, IsObject, IsString, MaxLength } from "class-validator";

@ObjectType()
export class UsersDTO {

  @IsString()
  @MaxLength(11)
  @Field({ nullable: false})
  phone: string;
}

@ObjectType()
export class LoginDTO {
  @Field({ nullable: false})
  @IsString()
  message: string

  @Field({nullable: false})
  code: number
}

@ObjectType()
export class LogOutDto {
  @Field({nullable: false})
  code: number
}


@ObjectType()
export class UsersDATA {
  @Field({ nullable: true })
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  user_img: string

  @Field({ nullable: true })
  @IsString()
  open_id: string
}

@ObjectType()
export class Draft {
  @Field({nullable: false})
  article_id: string

  @Field({nullable: false})
  time_stmap: string

  @Field({nullable: false})
  type: string

  @Field({nullable: false})
  title: string
}

@ObjectType()
export class Dynamic {
  @Field({nullable: false})
  content: string

  @Field({nullable: false})
  type: string

  @Field({nullable: false})
  time_tamp: string

  @Field({nullable: false})
  dynamic_id: string
}

@ObjectType()
export class DynamicApiRes {
  @Field(() => [Dynamic])
  dynamic: Dynamic[]

  @Field({nullable: false})
  next: number

  @Field({nullable: false})
  count: number
}

@ObjectType()
export class BaseUserInfo {
  @Field({nullable: false})
  user_img: string

  @Field({nullable: false})
  name: string
}

@ObjectType()
export class BaseMusterInfo {
  @Field(() => [BaseMusterData])
  muster_data: BaseMusterData[]
}

@ObjectType()
export class BaseMusterData {
  @Field({nullable: true})
  name: string

  @Field({nullable: false})
  muster_id: string
}