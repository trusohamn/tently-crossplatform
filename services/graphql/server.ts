import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import cors from "cors";
import db from "./db";
import { LocationInput } from "./types";

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
  getLocation: ({ id }: { id: String }) =>
    db.find((location) => location.id === id),
  getAllLocations: () => {
    return db;
  },
  createLocation: ({ location }: { location: LocationInput }) => {
    const id: String = require("crypto").randomBytes(10).toString("hex");
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
