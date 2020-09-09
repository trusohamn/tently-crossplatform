import React, { useState } from "react";
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from "react-native-webview-leaflet";
import { View, StyleSheet, Alert } from "react-native";

type LatLngObject = { lat: number; lng: number };

const onMessageReceived = (message: WebviewLeafletMessage) => {
  switch (message.event) {
    case WebViewLeafletEvents.ON_MAP_TOUCHED:
      const position: LatLngObject = message?.payload?.touchLatLng;
      Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
      break;
    default:
      console.log("App received", message);
  }
};

export default () => {
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  });

  return (
    <View style={styles.container}>
      <WebViewLeaflet
        onMessageReceived={onMessageReceived}
        ref={(ref: WebViewLeaflet) => {
          setWebViewLeafletRef(ref);
        }}
        backgroundColor={"green"}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: "OpenStreetMap.Mapnik",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          },
        ]}
        mapCenterPosition={mapCenterPosition}
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
