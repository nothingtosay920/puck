import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleDTO } from 'src/article/article.dto';
import { ArticleService } from 'src/article/article.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { GatherService } from 'src/muster/gather.service';
import { MusterService } from 'src/muster/muster.service';
import { LabelType } from 'src/users/users.input';
import { RecommendItem } from './recommend.dto';
import { RecommendArticles } from './recommend.input';
import { RecommendService } from './recommend.service';

@Resolver(() => ArticleDTO)
export class RecommendResolver {

  constructor(
    private readonly recommendService: RecommendService,
    private readonly articleService: ArticleService,
    private readonly gatherService: GatherService,
    private readonly musterService: MusterService,
    private readonly categoryService: CategoryService,
    private readonly labelService: LabelService
  ) {}
  
  @Query(() => [ArticleDTO])
  async recommendList(@Args('label') label: RecommendArticles) {
    const recommendItems = await this.recommendService.latestRecoommend(label.labels)
    return this.handleList(recommendItems)
  }


  handleList(recommendList: RecommendItem[]) {
    return recommendList.map(async (item) => {
      const type = item.Id.slice(0, 1) // G OR M
      
      if (type === 'G') {
        
        const recommenditem = await this.articleService.getGatherArticle(item.Id)
        const gather = await this.gatherService.getGather(recommenditem.gather)

        const category = await this.categoryService.findCategoryById(gather.categorys[0].category)
        
        const labelsArr = gather.labels.map((item) => {
          return item.label
        })
        const labels = await this.labelService.findLabelsById(labelsArr)
        return {
          article_img: recommenditem.article_img,
          title: recommenditem.title,
          type: recommenditem.article_type,
          gather: recommenditem.gather,
          labels: labels.map((item) => item.name),
          categorys: category.name,
          description: gather.description,
          outer_id: item.Id,
          zan: recommenditem.zan,
          hot: recommenditem.hot,
          author: gather.authorId,
          muster: null,
          edit_time: recommenditem.edit_time
        }
      } else if (type === "M") {
        const recommenditem = await this.articleService.getMusterArticle(item.Id)
        const muster = await this.musterService.getMuster(recommenditem.muster)
        const category = await this.categoryService.findCategoryById(recommenditem.categorys[0].category)
        const labelsArr = recommenditem.labels.map((item) => {
          return item.label
        })
        const labels = await this.labelService.findLabelsById(labelsArr)
        return {
          muster: recommenditem.muster,
          type: recommenditem.article_type,
          description: recommenditem.description,
          article_img: recommenditem.article_img,
          title: recommenditem.title,
          labels: labels.map((item) => item.name),
          categorys: category.name,
          outer_id: item.Id,
          zan: recommenditem.zan,
          hot: recommenditem.hot,
          author: muster.authorId,
          gather: null,
          edit_time: recommenditem.edit_time

        }
      }
    })
  }

}
