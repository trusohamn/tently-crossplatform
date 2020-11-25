export declare type LocationInput = {
    position: {
        lat: number;
        lng: number;
    };
    category: string;
    name: string;
    description: string;
};
export declare type Location = LocationInput & {
    id: string;
};
