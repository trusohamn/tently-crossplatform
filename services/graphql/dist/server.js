"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var express = require("express");
var graphqlHTTP = require("express-graphql").graphqlHTTP;
var buildSchema = require("graphql").buildSchema;
var cors = require("cors");
var db = require("./db");
var schema = buildSchema(
  "\ntype Position {\n    lat: Float\n    lng: Float\n}\n\ninput PositionInput {\n    lat: Float\n    lng: Float\n}\n\ninput LocationInput {\n    position: PositionInput\n    category: String\n}\n\ntype Location {\n    id: ID!\n    position: Position\n    category: String\n}\n\ntype Query {\n    getLocation(id: String!): Location\n    getAllLocations: [Location]\n}\n\ntype Mutation {\n    createLocation(location: LocationInput!): Location\n}\n"
);
var root = {
  getLocation: function (_a) {
    var id = _a.id;
    return db.find(function (location) {
      return location.id === id;
    });
  },
  getAllLocations: function () {
    return db;
  },
  createLocation: function (_a) {
    var location = _a.location;
    var id = require("crypto").randomBytes(10).toString("hex");
    var entry = __assign({ id: id }, location);
    db.push(entry);
    return entry;
  },
};
var app = express();
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
