import React, { useState, useEffect } from "react";
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from "react-native-webview-leaflet";
import { View, StyleSheet, Alert, Image } from "react-native";
import { useMapLeaflet } from "./hooks";
import { LatLngObject, MarkerObject } from "./types";

const onMessageReceived = (message: WebviewLeafletMessage) => {
  switch (message.event) {
    case WebViewLeafletEvents.ON_MAP_TOUCHED:
      const position = message?.payload?.touchLatLng as LatLngObject;
      Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
      break;
  }
};

export default ({ markers }: { markers: MarkerObject[] }) => {
  const { mapCenterPosition, zoom } = useMapLeaflet();
  const [
    webViewLeafletRef,
    setWebViewLeafletRef,
  ] = useState<WebViewLeaflet | null>(null);
  const [icons, setIcons] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    // TODO: first find unique paths
    // load icons to map
    const loadIcons = async () => {
      let loadedIcons = {};
      for (let marker of markers) {
        const icon = await import("../../assets/icons" + marker.icon);
        loadedIcons = { ...loadedIcons, [marker.icon]: icon };
      }

      setIcons(loadedIcons);
    };
    loadIcons();
  }, [markers]);
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
        mapMarkers={markers.map((marker) => {
          const exampleImageUri = Image.resolveAssetSource(
            icons[marker.icon] || "  "
          ).uri;
          return {
            ...marker,
            icon: exampleImageUri,
          };
        })}
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
