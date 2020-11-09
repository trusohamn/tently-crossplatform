import { useState } from 'react';
export var useMapLeaflet = function (_a) {
    var zoomSetting = _a.zoomSetting, positionSetting = _a.positionSetting;
    var _b = useState(positionSetting || {
        lat: 59.5,
        lng: 18.0,
    }), mapCenterPosition = _b[0], setMapCenterPosition = _b[1];
    var _c = useState(zoomSetting || 10), zoom = _c[0], setZoom = _c[1];
    return { mapCenterPosition: mapCenterPosition, setMapCenterPosition: setMapCenterPosition, zoom: zoom, setZoom: setZoom };
};
