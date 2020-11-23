export type LocationInput = {
  position: { lat: number; lng: number }
  category: string
  name: string
  description: string
}
export type Location = LocationInput & {
  id: string
}

export type LocationWithParams = Location & {
  size: IconSize
  icon: any
}

export type IconSize = [number, number]
