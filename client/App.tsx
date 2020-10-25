import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'

import MapLeaflet from './components/MapLeaflet'

const iconsPath = './assets/icons'
const iconMapping: { [key: string]: String } = {
  camping: require(iconsPath + '/012-camp.png'),
  kayak: require(iconsPath + '/033-kayak.png'),
  hut: require(iconsPath + '/032-hut.png'),
  default: require(iconsPath + '/012-camp.png'),
}

const mapIcons = (category: string) => {
  return iconMapping[category] || iconMapping.default
}

export default function App() {
  const [markers, setMarkers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const devService =
          Platform.OS === 'web'
            ? 'http://localhost:4000/graphql'
            : 'http://10.0.2.2:4000/graphql'

        const data = await fetch(devService, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: `{getAllLocations {
            id, category, name, position {
              lat
              lng
            }
          }}`,
          }),
        }).then((data) => data.json())
        const mappedData = data.data.getAllLocations.map(
          (location: {
            id: string
            category: string
            position: { lat: number; lng: number }
          }) => ({
            ...location,
            size: [32, 32],
            icon: mapIcons(location.category),
          }),
        )
        setMarkers(mappedData)
      } catch (e) {
        console.log('ERRRRROR', e)
      }
    }
    fetchData()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Tently!</Text>
      <MapLeaflet markers={markers} zoom={9}></MapLeaflet>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52aca2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#062542',
    padding: 20,
  },
})
