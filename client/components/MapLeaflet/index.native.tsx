import React, { useState } from 'react'
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from 'react-native-webview-leaflet'
import { View, StyleSheet, Alert, Image } from 'react-native'
import { useMapLeaflet } from './hooks'
import { LatLngObject, MarkerObject } from './types'

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
}: {
  markers?: MarkerObject[]
  zoom?: number
  position?: LatLngObject
}) => {
  const { mapCenterPosition, zoom } = useMapLeaflet({
    zoomSetting,
    positionSetting,
  })
  const [
    webViewLeafletRef,
    setWebViewLeafletRef,
  ] = useState<WebViewLeaflet | null>(null)

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position = message?.payload?.touchLatLng as LatLngObject
        Alert.alert(
          `Map Touched at:`,
          `${position.lat}, ${position.lng}`,
        )
        break
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          ` ${
            markers[message?.payload?.mapMarkerID - 1].name ||
            'unknown'
          }`,
        )

        break
    }
  }

  return (
    <View style={styles.container}>
      <WebViewLeaflet
        onMessageReceived={onMessageReceived}
        ref={(ref: WebViewLeaflet) => {
          setWebViewLeafletRef(ref)
        }}
        mapLayers={[
          {
            attribution:
              '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            baseLayerIsChecked: true,
            baseLayerName: 'OpenStreetMap.Mapnik',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          },
        ]}
        mapMarkers={markers.map((marker) => {
          const exampleImageUri = Image.resolveAssetSource(
            marker.icon || '  ',
          ).uri
          return {
            ...marker,
            icon: exampleImageUri,
          }
        })}
        mapCenterPosition={mapCenterPosition}
        zoom={zoom}
      ></WebViewLeaflet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 400,
  },
})

export default MapLeaflet
