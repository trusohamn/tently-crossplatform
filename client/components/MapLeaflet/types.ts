export type LatLngObject = { lat: number; lng: number }

export type MarkerObject = {
  id: string
  position: LatLngObject
  icon: string
  size: [number, number]
  name: string
}

export type MapLeafletProps = {
  markers?: MarkerObject[]
  zoom?: number
  position?: LatLngObject
  selectedPosition?: LatLngObject
  setSelectedPosition?: any
  markerIcon?: any
}
