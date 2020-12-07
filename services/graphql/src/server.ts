import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { LocationResolver } from './resolvers'
import { Location } from './models'

const bootstrap = async () => {
  const connection = await createConnection({
    type: 'sqlite',
    database: './db.sqlite3',
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
