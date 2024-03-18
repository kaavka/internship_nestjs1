import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { NewsToItemBySlug, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('list')
  async getList(): Promise<{ data: NewsToListItem[] }> {
    const list = await this.newsService.getList()
    const fliteredList = list.data.filter((item) => item.isPublished)

    if (fliteredList.length === 0) {
      throw new NotFoundException()
    }

    return { data: fliteredList }
  }

  @Get('item/:slug')
  async getItem(@Param('slug') slug: string): Promise<{ data: NewsToItemBySlug }> {
    const item = await this.newsService.newsGetById(slug)

    if (!item.data.isPublished) {
      throw new NotFoundException()
    }

    return item
  }
}
