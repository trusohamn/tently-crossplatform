export type LocationInput = {
  position: { lat: Number; lng: Number };
  category: String;
};
export type Location = LocationInput & {
  id: String;
};
