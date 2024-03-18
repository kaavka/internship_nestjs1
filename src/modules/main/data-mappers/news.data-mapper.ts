import { Injectable } from '@nestjs/common'

import { NewsToItemBySlug, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  projectToSearchResult(entity: NewsEntity): NewsToListItem {
    const { id, description, createdAt, publishedAt, isPublished } = entity

    return { id, description, createdAt, publishedAt, isPublished }
  }

  projectGetById(entity: NewsEntity): NewsToItemBySlug {
    const { id, description, createdAt, publishedAt, isPublished } = entity

    return { id, description, createdAt, publishedAt, isPublished }
  }
}
