import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

@Entity()
@ObjectType()
export class Location extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Field(() => String)
  description: string

  @Column()
  @Field(() => String)
  category: string

  @Column()
  @Field()
  lat: number

  @Column()
  @Field()
  lng: number
}
