import React, { useState } from "react";
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from "react-native-webview-leaflet";
import { View, StyleSheet, Alert } from "react-native";
import { useMapLeaflet } from "./hooks";
import markers from "./markers.json";

type LatLngObject = { lat: number; lng: number };

const onMessageReceived = (message: WebviewLeafletMessage) => {
  switch (message.event) {
    case WebViewLeafletEvents.ON_MAP_TOUCHED:
      const position = message?.payload?.touchLatLng as LatLngObject;
      Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
      break;
    default:
      console.log("App received", message);
  }
};

export default () => {
  const { mapCenterPosition, zoom } = useMapLeaflet();
  const [
    webViewLeafletRef,
    setWebViewLeafletRef,
  ] = useState<WebViewLeaflet | null>(null);

  return (
    <View style={styles.container}>
      <WebViewLeaflet
        onMessageReceived={onMessageReceived}
        ref={(ref: WebViewLeaflet) => {
          setWebViewLeafletRef(ref);
        }}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          },
        ]}
        mapMarkers={markers}
        mapCenterPosition={mapCenterPosition}
        zoom={zoom}
      ></WebViewLeaflet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 400,
  },
});
