type Location = {
  category: string
  name: string
  description: string
}

export type LocationInput = Location & {
  position: { lat: number; lng: number }
  image?: string
}

export type LocationOutput = Location & {
  id: string
  imageUrl?: string
  lat: number
  lng: number
}

export type LocationWithParams = LocationInput & {
  size: IconSize
  icon: any
}

export type IconSize = [number, number]
