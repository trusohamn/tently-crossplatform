import React from 'react'
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import './MapLeaflet.css'
import { icon, Icon } from 'leaflet'

import { useMapLeaflet } from './hooks'
import { MarkerObject, LatLngObject } from './types'

export default ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
}: {
  markers?: MarkerObject[]
  zoom?: number
  position?: LatLngObject
}) => {
  const { mapCenterPosition, zoom } = useMapLeaflet({
    zoomSetting,
    positionSetting,
  })

  return (
    <LeafletMap center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
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
