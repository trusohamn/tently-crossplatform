import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'

import db from '../db'

@ObjectType()
@InputType()
class Position {
  @Field()
  lat: number
  @Field()
  lng: number
}

@ObjectType()
export class Location {
  @Field()
  id: string
  @Field()
  name: string
  @Field()
  description: string
  @Field()
  category: string
  @Field()
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
    return db.find((location) => location.id === id)
  }

  @Query(() => [Location])
  getAllLocations() {
    return db
  }

  @Mutation(() => Location)
  createLocation(@Arg('location') location: LocationInput): Location {
    const id: string = require('crypto')
      .randomBytes(10)
      .toString('hex')
    const entry = { id, ...location }
    db.push(entry)
    return entry
  }
}
