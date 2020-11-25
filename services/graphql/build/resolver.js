"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolver = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const db_1 = require("./db");
let Position = class Position {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Position.prototype, "lat", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Position.prototype, "lng", void 0);
Position = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], Position);
let Location = class Location {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "description", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "category", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Position)
], Location.prototype, "position", void 0);
Location = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], Location);
let PositionInput = class PositionInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], PositionInput.prototype, "lat", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], PositionInput.prototype, "lng", void 0);
PositionInput = tslib_1.__decorate([
    type_graphql_1.InputType()
], PositionInput);
let LocationInput = class LocationInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "description", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], LocationInput.prototype, "category", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", PositionInput)
], LocationInput.prototype, "position", void 0);
LocationInput = tslib_1.__decorate([
    type_graphql_1.InputType()
], LocationInput);
let LocationResolver = class LocationResolver {
    getLocation(id) {
        return db_1.default.find((location) => location.id === id);
    }
    getAllLocations() {
        return db_1.default;
    }
    createLocation(location) {
        const id = require('crypto')
            .randomBytes(10)
            .toString('hex');
        const entry = { id, ...location };
        db_1.default.push(entry);
        return entry;
    }
};
tslib_1.__decorate([
    type_graphql_1.Query(() => Location),
    tslib_1.__param(0, type_graphql_1.Arg('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], LocationResolver.prototype, "getLocation", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => [Location]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], LocationResolver.prototype, "getAllLocations", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => Location),
    tslib_1.__param(0, type_graphql_1.Arg('location')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [LocationInput]),
    tslib_1.__metadata("design:returntype", Location)
], LocationResolver.prototype, "createLocation", null);
LocationResolver = tslib_1.__decorate([
    type_graphql_1.Resolver(Location)
], LocationResolver);
exports.LocationResolver = LocationResolver;
//# sourceMappingURL=resolver.js.map