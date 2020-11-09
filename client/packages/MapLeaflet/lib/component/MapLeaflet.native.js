var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { WebViewLeaflet, WebViewLeafletEvents, } from '@trusohamn/react-native-webview-leaflet';
import { View, Alert, Image } from 'react-native';
import { useMapLeaflet } from '../hooks';
import styles from '../style';
var MapLeaflet = function (_a) {
    var _b = _a.markers, markers = _b === void 0 ? [] : _b, zoomSetting = _a.zoom, positionSetting = _a.position, selectedPosition = _a.selectedPosition, setSelectedPosition = _a.setSelectedPosition, markerIcon = _a.markerIcon;
    var _c = useMapLeaflet({
        zoomSetting: zoomSetting,
        positionSetting: positionSetting,
    }), mapCenterPosition = _c.mapCenterPosition, zoom = _c.zoom;
    var _d = useState(null), webViewLeafletRef = _d[0], setWebViewLeafletRef = _d[1];
    var onMessageReceived = function (message) {
        var _a, _b, _c;
        switch (message.event) {
            case WebViewLeafletEvents.ON_MAP_TOUCHED:
                var position = (_a = message === null || message === void 0 ? void 0 : message.payload) === null || _a === void 0 ? void 0 : _a.touchLatLng;
                setSelectedPosition(position);
                break;
            case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
                Alert.alert(" " + (((_b = message === null || message === void 0 ? void 0 : message.payload) === null || _b === void 0 ? void 0 : _b.mapMarkerID) ? markers[parseInt((_c = message === null || message === void 0 ? void 0 : message.payload) === null || _c === void 0 ? void 0 : _c.mapMarkerID, 10) - 1].name
                    : 'unknown'));
                break;
        }
    };
    var setMarkersOnMap = function () {
        var locationMarkers = markers.map(function (marker) {
            return __assign(__assign({}, marker), { icon: Image.resolveAssetSource(marker.icon || 0).uri });
        });
        if (!!selectedPosition) {
            locationMarkers.push({
                id: 'selectedMarker',
                icon: Image.resolveAssetSource(markerIcon || 0).uri,
                position: selectedPosition,
                size: [32, 42],
                name: 'selectedMarker',
            });
        }
        return locationMarkers;
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(WebViewLeaflet, { onMessageReceived: onMessageReceived, ref: function (ref) {
                setWebViewLeafletRef(ref);
            }, mapLayers: [
                {
                    attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    baseLayerIsChecked: true,
                    baseLayerName: 'OpenStreetMap.Mapnik',
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                },
            ], mapMarkers: setMarkersOnMap(), mapCenterPosition: mapCenterPosition, zoom: zoom })));
};
export default MapLeaflet;
