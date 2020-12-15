require('dotenv').config()
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { LocationResolver } from './resolvers'
import { Location } from './models'

const bootstrap = async () => {
  await createConnection({
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: 5432,
    type: 'postgres',
    entities: [Location],
    synchronize: true,
  })

  const schema = await buildSchema({
    resolvers: [LocationResolver],
  })

  const server = new ApolloServer({
    schema,
    cors: true,
  })

  const { url } = await server.listen(4000)
  console.log(
    `Server is running, GraphQL Playground available at ${url}`,
  )
}

bootstrap()
