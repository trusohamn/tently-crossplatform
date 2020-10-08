const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const db = require("./db");

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
}

type Location {
    id: ID!
    position: Position
    category: String
}

type Query {
    getLocation(id: String!): Location
    getAllLocations: [Location]
}

type Mutation {
    createLocation(location: LocationInput!): Location
}
`);

const root = {
  getLocation: ({ id }) => db.find((location) => location.id === id),
  getAllLocations: () => {
    return db;
  },
  createLocation: ({ location }) => {
    const id = require("crypto").randomBytes(10).toString("hex");
    const entry = { id, ...location };
    db.push(entry);
    return entry;
  },
};

const app = express();
app.use(cors());
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
