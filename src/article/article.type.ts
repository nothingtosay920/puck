import { Article, Collection, Draft, Zan } from "@prisma/client";


type ArticleInfo = {
  zan_status: boolean,
  follow_status: boolean,
  collection_status: boolean,
  follow_user?: boolean
}

type UserInfo = {
  author: {
    name: string,
    uuid: string,
    user_img: string
  }
}

export type GatherRes = {
  gather: {
    articles: {
      outer_id: string,
      title: string
    }[],
    gather_id: string,
    gather_name: string,
  },
  article_type: string

}

export type ArticleDataType = Article & ArticleInfo & UserInfo