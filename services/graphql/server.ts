import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { LocationResolver } from './resolvers'
import { createConnection } from 'typeorm'

const bootstrap = async () => {
  await createConnection()
  const schema = await buildSchema({
    resolvers: [LocationResolver],
  })

  const server = new ApolloServer({
    schema,
    cors: true,
    playground: true,
  })

  const { url } = await server.listen(4000)
  console.log(
    `Server is running, GraphQL Playground available at ${url}`,
  )
}

bootstrap()
