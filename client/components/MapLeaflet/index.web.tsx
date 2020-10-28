import React, { createRef } from 'react'
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import './MapLeaflet.css'
import { Icon } from 'leaflet'

import { useMapLeaflet } from './hooks'
import { MarkerObject, LatLngObject } from './types'

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
  selectedPosition,
  setSelectedPosition,
  markerIcon,
}: {
  markers?: MarkerObject[]
  zoom?: number
  position?: LatLngObject
  selectedPosition?: LatLngObject
  setSelectedPosition?: any
  markerIcon?: string
}) => {
  const { mapCenterPosition, zoom } = useMapLeaflet({
    zoomSetting,
    positionSetting,
  })

  const refmarker = React.createRef()

  const updatePosition = () => {
    console.log('updating')
    const marker = refmarker.current
    console.log(marker)
    if (marker != null) {
      setSelectedPosition(marker.leafletElement.getLatLng())
    }
  }

  return (
    <LeafletMap center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={selectedPosition}
        draggable={true}
        ondragend={updatePosition}
        ref={refmarker}
        icon={
          new Icon({
            iconUrl: markerIcon || ' ',
            iconSize: [32, 42],
          })
        }
      ></Marker>
      {markers.map((marker, id) => {
        return (
          <Marker
            key={id}
            position={marker.position}
            icon={
              new Icon({
                iconUrl: marker.icon || ' ',
                iconSize: marker.size,
              })
            }
          >
            <Popup>
              {marker.name} <br />
            </Popup>
          </Marker>
        )
      })}
    </LeafletMap>
  )
}

export default MapLeaflet
