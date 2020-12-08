import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'

import { Location } from '../models'
@InputType()
class LocationInput {
  @Field()
  name: string
  @Field()
  description: string
  @Field()
  category: string
  @Field()
  lat: number
  @Field()
  lng: number
}

@Resolver()
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
  ): Promise<Location | void> {
    try {
      const newLocation = Location.create(location)
      await newLocation.save()
      return newLocation
    } catch (e) {
      console.log(e)
      return new Promise(() => {})
    }
  }
}
