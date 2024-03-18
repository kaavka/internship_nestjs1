import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsTranslationEntity } from './news_translations.entity'

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column('text')
  description: string

  @CreateDateColumn('')
  createdAt: Date

  @Column()
  publishedAt: Date

  @Column('boolean')
  isPublished: boolean

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news, { cascade: true })
  translations: NewsTranslationEntity[]
}
