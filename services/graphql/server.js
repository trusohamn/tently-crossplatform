const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    multiply(x: Int!, y: Int!): Int
    add(x: Int!, y: Int!): Int
  }
`);

const root = {
  multiply: ({ x, y }) => {
    return x * y;
  },
  add: ({ x, y }) => {
    return x + y;
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
