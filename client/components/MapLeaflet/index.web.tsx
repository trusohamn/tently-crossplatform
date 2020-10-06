import React, { useState, useEffect } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./MapLeaflet.css";
import { Icon } from "leaflet";

import { useMapLeaflet } from "./hooks";
import { MarkerObject } from "./types";

export default ({ markers }: { markers: MarkerObject[] }) => {
  const { mapCenterPosition, zoom } = useMapLeaflet();
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    // first find unique paths
    // load icons to map
    const loadIcons = async () => {
      let loadedIcons = {};
      for (let marker of markers) {
        const iconUrl = await import("../../assets/icons" + marker.icon);
        loadedIcons = { ...loadedIcons, [marker.icon]: iconUrl.default };
      }

      setIcons(loadedIcons);
    };
    loadIcons();
  }, []);

  return (
    <LeafletMap center={mapCenterPosition} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {!!icons &&
        markers.map((marker) => {
          return (
            <Marker
              position={marker.position}
              icon={
                new Icon({
                  iconUrl: icons[marker.icon],
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
