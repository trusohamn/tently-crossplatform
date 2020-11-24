import 'reflect-metadata'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'
import db from './db'
import { LocationInput } from './types'
import {
  Arg,
  Args,
  ArgsType,
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import {
  MaxLength,
  Length,
  ArrayMaxSize,
  Min,
  Max,
} from 'class-validator'

@ObjectType()
class Recipe {
  @Field((type) => ID)
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  creationDate: Date

  @Field((type) => [String])
  ingredients: string[]
}

@InputType()
class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string

  @Field((type) => [String])
  @ArrayMaxSize(30)
  ingredients: string[]
}

@ArgsType()
class RecipesArgs {
  @Field((type) => Int)
  @Min(0)
  skip: number = 0

  @Field((type) => Int)
  @Min(1)
  @Max(50)
  take: number = 25
}

@Resolver(Recipe)
class RecipeResolver {
  constructor(private recipeService: any) {}

  @Query((returns) => Recipe)
  async recipe(@Arg('id') id: string) {
    const recipe = await this.recipeService.findById(id)
    if (recipe === undefined) {
      throw new Error(id)
    }
    return recipe
  }

  @Query((returns) => [Recipe])
  recipes(@Args() { skip, take }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take })
  }
}

const schema = buildSchema(`
type Position {
    lat: Float
    lng: Float
}

input PositionInput {
    lat: Float
    lng: Float
}

input LocationInput {
    position: PositionInput
    category: String
    name: String
    description: String
}

type Location {
    id: ID!
    position: Position
    category: String
    name: String
    description: String
}

type Query {
    getLocation(id: String!): Location
    getAllLocations: [Location]
}

type Mutation {
    createLocation(location: LocationInput!): Location
}
`)

const root = {
  getLocation: ({ id }: { id: string }) =>
    db.find((location) => location.id === id),
  getAllLocations: () => {
    return db
  },
  createLocation: ({ location }: { location: LocationInput }) => {
    const id: string = require('crypto')
      .randomBytes(10)
      .toString('hex')
    const entry = { id, ...location }
    db.push(entry)
    return entry
  },
}

const app = express()
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)
app.listen(4000)
console.log(
  'Running a GraphQL API server at http://localhost:4000/graphql',
)
