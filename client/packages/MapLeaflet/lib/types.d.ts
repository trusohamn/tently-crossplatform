export declare type LatLngObject = {
    lat: number;
    lng: number;
};
export declare type MarkerObject = {
    id: string;
    position: LatLngObject;
    icon: string;
    size: [number, number];
    name: string;
};
export declare type MapLeafletProps = {
    markers?: MarkerObject[];
    zoom?: number;
    position?: LatLngObject;
    selectedPosition?: LatLngObject;
    setSelectedPosition?: any;
    markerIcon?: any;
};
