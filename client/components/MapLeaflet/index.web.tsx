import React, { useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapLeaflet.css";
import { useMapLeaflet } from "./hooks";

export default () => {
  const { mapCenterPosition, zoom } = useMapLeaflet();

  return (
    <LeafletMap center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapCenterPosition}>
        <Popup>
          Popup <br /> description.
        </Popup>
      </Marker>
    </LeafletMap>
  );
};
