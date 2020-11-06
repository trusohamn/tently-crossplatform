import { useState } from 'react';
export const useMapLeaflet = ({ zoomSetting, positionSetting, }) => {
    const [mapCenterPosition, setMapCenterPosition] = useState(positionSetting || {
        lat: 59.5,
        lng: 18.0,
    });
    const [zoom, setZoom] = useState(zoomSetting || 10);
    return { mapCenterPosition, setMapCenterPosition, zoom, setZoom };
};
