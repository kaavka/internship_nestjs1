import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

@Entity('news_translation')
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  language: string

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => NewsEntity, (news) => news.translations)
  news: NewsEntity
}
