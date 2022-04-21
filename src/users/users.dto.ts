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
export class Users {
  @Field({ nullable: false })
  @IsString()
  name: string
}


@ObjectType()
export class UsersDATA {
  @Field({ nullable: false })
  @IsObject()
  data: Users
}
