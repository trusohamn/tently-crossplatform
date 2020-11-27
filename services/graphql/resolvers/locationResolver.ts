import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

import db from '../db'

@ObjectType()
class Position {
  @Field()
  lat: number
  @Field()
  lng: number
}

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
  @Field(() => Position)
  position: Position
}

@InputType()
class PositionInput {
  @Field()
  lat: number
  @Field()
  lng: number
}

@InputType()
class LocationInput {
  @Field()
  name: string
  @Field()
  description: string
  @Field()
  category: string
  @Field()
  position: PositionInput
}

@Resolver(Location)
export class LocationResolver {
  @Query(() => Location)
  getLocation(@Arg('id') id: string) {
    return Location.findOne(id)
  }

  @Query(() => [Location])
  getAllLocations() {
    return Location.find()
  }

  @Mutation(() => Location)
  async createLocation(
    @Arg('location') location: LocationInput,
  ): Promise<Location> {
    const newLocation = Location.create(location)
    await newLocation.save()
    return newLocation
  }
}
