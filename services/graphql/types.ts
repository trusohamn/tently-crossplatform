export type LocationInput = {
  position: { lat: number; lng: number }
  category: string
  name: string
}
export type Location = LocationInput & {
  id: string
}
