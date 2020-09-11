export type LatLngObject = { lat: number; lng: number };

export type MarkerObject = {
  id: string;
  position: LatLngObject;
  icon: string;
  size: [number, number];
};
