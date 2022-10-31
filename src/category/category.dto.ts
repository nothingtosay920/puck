import { Field, ObjectType } from "@nestjs/graphql";
import { Label } from "@prisma/client";


@ObjectType()
class Categorylabel {
  @Field({nullable: false})
  name: string

  @Field({nullable: false })
  description: string

  @Field({nullable: false })
  label_id: string
}

// const result = await prisma.user.findMany({
//   select: {
//     id: true,
//     name: true,
//     posts: {
//       select: {
//         id: true,
//         title: true,
//       },
//     },
//   },
// })