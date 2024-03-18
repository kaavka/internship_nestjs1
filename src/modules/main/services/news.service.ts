import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { NewsToItemBySlug, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly projectDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private projectRepository: Repository<NewsEntity>,
  ) {}

  async getList(): Promise<{ data: NewsToListItem[] }> {
    const projectList = await this.projectRepository.find()

    return { data: projectList.map((project) => this.projectDataMapper.projectToSearchResult(project)) }
  }

  async newsGetById(id: string): Promise<{ data: NewsToItemBySlug }> {
    const foundItem = await this.projectRepository.findOneOrFail({
      where: {
        id,
      },
    })

    if (foundItem) {
      return { data: this.projectDataMapper.projectGetById(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }
}
