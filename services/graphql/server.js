const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const db = {};
const schema = buildSchema(`
  input LocationInput {
    description: String
  }

  type Location {
    id: ID!
    description: String
  }

  type Query {
    multiply(x: Int!, y: Int!): Int
    add(x: Int!, y: Int!): Int
    getLocation(id: Int!): Location
}

  type Mutation {
    createLocation(id:Int, location: LocationInput!): Location
  }
`);

const root = {
  multiply: ({ x, y }) => {
    return x * y;
  },
  add: ({ x, y }) => {
    return x + y;
  },
  getLocation: ({ id }) => db[id],
  createLocation: ({ location }) => {
    const id = require("crypto").randomBytes(10).toString("hex");
    db[id] = location;
    return { id, ...location };
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
