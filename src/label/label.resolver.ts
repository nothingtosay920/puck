import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Label } from './label.dto';
import { CreateLabelInput } from './label.input';
import { LabelService } from './label.service';

@Resolver(() => Label)
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  // @Query(() => Label)
  // createCategory(@Args('data') data: CreateLabelInput) {
  //   return this.labelService.createCategory(data)
  // }

  @Mutation(() => Label)
  createManyLabels(@Args('data') data: CreateLabelInput) {
    return this.labelService.createLabel(data)
  }

  @Query(() => [Label])
  getLabels() {
    return this.labelService.getLabels()
  }

  @Query(() => Number)
  putLabel(@Args('id') id: string, @Args('category') category: string, @Args('desc') desc: string) {
    this.labelService.putLabel(id, category, desc)
    return 200
  }
}
