import React, { useState } from "react";

export const useMapLeaflet = () => {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  });

  const [zoom, setZoom] = useState(10);

  return { mapCenterPosition, setMapCenterPosition, zoom, setZoom };
};
