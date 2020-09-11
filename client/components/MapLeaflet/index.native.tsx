import React, { useState } from "react";
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from "react-native-webview-leaflet";
import { View, StyleSheet, Alert, Image } from "react-native";
import { useMapLeaflet } from "./hooks";
import camp from "../../assets/icons/012-camp.png";
import { LatLngObject } from "./types";

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

export default ({ markers }) => {
  const { mapCenterPosition, zoom } = useMapLeaflet();
  const [
    webViewLeafletRef,
    setWebViewLeafletRef,
  ] = useState<WebViewLeaflet | null>(null);
  const exampleImageUri = Image.resolveAssetSource(camp).uri;
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
        mapMarkers={markers.map((marker) => ({
          ...marker,
          icon: exampleImageUri,
        }))}
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
