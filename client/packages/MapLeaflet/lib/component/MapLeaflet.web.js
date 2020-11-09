import React, { createRef } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup, } from 'react-leaflet';
import '../MapLeaflet.css';
import { Icon } from 'leaflet';
import { useMapLeaflet } from '../hooks';
var MapLeaflet = function (_a) {
    var _b = _a.markers, markers = _b === void 0 ? [] : _b, zoomSetting = _a.zoom, positionSetting = _a.position, selectedPosition = _a.selectedPosition, setSelectedPosition = _a.setSelectedPosition, markerIcon = _a.markerIcon;
    var _c = useMapLeaflet({
        zoomSetting: zoomSetting,
        positionSetting: positionSetting,
    }), mapCenterPosition = _c.mapCenterPosition, zoom = _c.zoom;
    var refmarker = createRef();
    var updatePosition = function () {
        var marker = refmarker.current;
        if (marker != null) {
            setSelectedPosition(marker.leafletElement.getLatLng());
        }
    };
    return (React.createElement(LeafletMap, { center: mapCenterPosition, zoom: zoom, onclick: function (e) { return setSelectedPosition(e.latlng); } },
        React.createElement(TileLayer, { attribution: '\u00A9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
        !!selectedPosition && (React.createElement(Marker, { position: selectedPosition, draggable: true, ondragend: updatePosition, ref: refmarker, icon: new Icon({
                iconUrl: markerIcon || ' ',
                iconSize: [32, 42],
            }) })),
        markers.map(function (marker, id) {
            return (React.createElement(Marker, { key: id, position: marker.position, icon: new Icon({
                    iconUrl: marker.icon || ' ',
                    iconSize: marker.size,
                }) },
                React.createElement(Popup, null,
                    marker.name,
                    " ",
                    React.createElement("br", null))));
        })));
};
export default MapLeaflet;
