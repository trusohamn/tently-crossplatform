import React, { useState, useEffect } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapLeaflet.css";
import { icon, Icon } from "leaflet";

import { useMapLeaflet } from "./hooks";
import { MarkerObject } from "./types";

export default ({ markers }: { markers: MarkerObject[] }) => {
  const { mapCenterPosition, zoom } = useMapLeaflet();

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
                iconUrl: marker.icon || " ",
                iconSize: marker.size,
              })
            }
          >
            <Popup>
              Popup <br /> description.
            </Popup>
          </Marker>
        );
      })}
    </LeafletMap>
  );
};
