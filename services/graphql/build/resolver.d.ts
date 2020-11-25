declare class Position {
    lat: number;
    lng: number;
}
declare class Location {
    id: string;
    name: string;
    description: string;
    category: string;
    position: Position;
}
declare class PositionInput {
    lat: number;
    lng: number;
}
declare class LocationInput {
    name: string;
    description: string;
    category: string;
    position: PositionInput;
}
export declare class LocationResolver {
    getLocation(id: string): import("./types").Location | undefined;
    getAllLocations(): import("./types").Location[];
    createLocation(location: LocationInput): Location;
}
export {};
