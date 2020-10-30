import React, { useState } from 'react'
import {
  WebViewLeaflet,
  WebViewLeafletEvents,
  WebviewLeafletMessage,
} from 'react-native-webview-leaflet'
import { View, StyleSheet, Alert, Image } from 'react-native'
import { useMapLeaflet } from './hooks'
import { LatLngObject, MapLeafletProps } from './types'

const MapLeaflet = ({
  markers = [],
  zoom: zoomSetting,
  position: positionSetting,
  selectedPosition,
  setSelectedPosition,
  markerIcon,
}: MapLeafletProps) => {
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
        setSelectedPosition(position)
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

  const setMarkersOnMap = () => {
    const locationMarkers = markers.map((marker) => {
      return {
        ...marker,
        icon: Image.resolveAssetSource(marker.icon || '  ').uri,
      }
    })
    !!selectedPosition &&
      locationMarkers.push({
        id: 'selectedMarker',
        icon: Image.resolveAssetSource(markerIcon || '  ').uri,
        position: selectedPosition,
        size: [32, 42],
        name: 'selectedMarker',
      })
    return locationMarkers
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
        mapMarkers={setMarkersOnMap()}
        mapCenterPosition={mapCenterPosition}
        zoom={zoom}
      ></WebViewLeaflet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 300,
    minHeight: 300,
  },
})

export default MapLeaflet
