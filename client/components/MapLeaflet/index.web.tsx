import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapLeaflet.css";
import { useMapLeaflet } from "./hooks";
import markers from "./markers.json";
import { Icon } from "leaflet";

export default () => {
  const { mapCenterPosition, zoom } = useMapLeaflet();

  return (
    <LeafletMap center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          position={marker.position}
          icon={new Icon({ iconUrl: marker.icon, iconSize: marker.size })}
        >
          <Popup>
            Popup <br /> description.
          </Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
};
