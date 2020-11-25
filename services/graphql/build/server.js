"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const resolver_1 = require("./resolver");
async function bootstrap() {
    const schema = await type_graphql_1.buildSchema({
        resolvers: [resolver_1.LocationResolver],
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        cors: true,
        playground: true,
    });
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}
bootstrap();
//# sourceMappingURL=server.js.map