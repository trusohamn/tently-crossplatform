import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Picker,
  TextInput,
} from 'react-native'

import MapLeaflet from './components/MapLeaflet'
import markerIcon from './assets/icons/marker.png'

const iconsPath = './assets/icons'
const iconMapping: { [key: string]: String } = {
  camping: require(iconsPath + '/012-camp.png'),
  kayak: require(iconsPath + '/033-kayak.png'),
  hut: require(iconsPath + '/032-hut.png'),
  default: require(iconsPath + '/012-camp.png'),
}

const devService =
  Platform.OS === 'web'
    ? 'http://localhost:4000/graphql'
    : 'http://10.0.2.2:4000/graphql'

const mapIcons = (category: string) => {
  return iconMapping[category] || iconMapping.default
}

const saveData = async () => {
  const mutation = `mutation {
    createLocation(location: {
      category: "camping"
      name: "the new one"
      position: {
        lat: 59.55
        lng: 18.03
      }
    }) {
      id
    }
  }`

  const data = await fetch(devService, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query: mutation }),
  }).then((data) => data.json())
}

export default function App() {
  const [markers, setMarkers] = useState([])
  const [category, setCategory] = useState('camping')
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    // saveData()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Tently!</Text>
      <View style={styles.map}>
        <MapLeaflet
          markers={markers}
          zoom={9}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          markerIcon={markerIcon}
        ></MapLeaflet>
      </View>
      <View>
        <Text> Add Location </Text>
        <View>
          <TextInput placeholder="Name" />
          <Text>
            Lat: {selectedPosition.lat} Lng:{selectedPosition.lng}
          </Text>
          <Picker
            selectedValue={category}
            onValueChange={(currentcategory) =>
              setCategory(currentcategory)
            }
          >
            <Picker.Item label="camping" value="camping" />
            <Picker.Item label="kayak" value="kayak" />
            <Picker.Item label="hut" value="hut" />
          </Picker>
        </View>
      </View>
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
    padding: 70,
  },
  map: {
    height: 500,
    width: 500,
  },
})
