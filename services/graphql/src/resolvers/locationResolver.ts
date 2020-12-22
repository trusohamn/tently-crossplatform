import { v2 as cloudinary } from 'cloudinary'

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
  lat: string
  @Field()
  lng: string
  @Field({ nullable: true })
  image: string
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
    let uploadResponse
    if (location.image) {
      uploadResponse = await cloudinary.uploader.upload(
        location.image,
        {},
      )
    }
    console.log(uploadResponse)
    const locationToSave = {
      ...location,
      imageUrl: uploadResponse?.url,
    }
    const newLocation = Location.create(locationToSave)
    await newLocation.save()
    return newLocation
  }
}
