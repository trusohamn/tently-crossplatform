const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var cors = require("cors");

const db = [
  {
    id: "1",
    position: { lat: 59.5, lng: 18.08 },
    category: "hut",
  },
  {
    id: "2",
    position: { lat: 59.56, lng: 18.04 },
    category: "kayak",
  },
  {
    id: "3",
    position: { lat: 59.59, lng: 18.06 },
    category: "camping",
  },
  {
    id: "4",
    position: { lat: 59.6, lng: 18.02 },
    category: "camping",
  },
  {
    id: "5",
    position: { lat: 59.61, lng: 18.01 },
    category: "camping",
  },
];

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
  getAllLocations: () => db,
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
