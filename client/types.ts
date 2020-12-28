export type LocationInput = {
  position: { lat: number; lng: number }
  category: string
  name: string
  description: string
  image?: string
}
export type Location = LocationInput & {
  id: string
  imageUrl?: string
}

export type LocationWithParams = Location & {
  size: IconSize
  icon: any
}

export type IconSize = [number, number]
