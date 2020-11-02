import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
} from 'react-native'

import { markerIcon } from './helpers/icons'
import {
  fetchAllLocalisations,
  saveNewLocalisation,
} from './helpers/data'

import MapLeaflet from './components/MapLeaflet'

export default function App() {
  const [markers, setMarkers] = useState([])
  const [category, setCategory] = useState('camping')
  const [name, setName] = useState('')
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  })

  const fetchData = async () => {
    const mappedData = await fetchAllLocalisations()
    setMarkers(mappedData)
  }

  const saveData = async () => {
    await saveNewLocalisation({ category, name, selectedPosition })
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Tently!</Text>
      </View>
      <View style={styles.map}>
        <MapLeaflet
          markers={markers}
          zoom={9}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          markerIcon={markerIcon}
        ></MapLeaflet>
      </View>
      <View style={styles.form}>
        <Text> Add Location </Text>
        <View>
          <TextInput
            placeholder="Name"
            defaultValue={name}
            onChangeText={(newName) => setName(newName)}
          />
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
        <Button title="Submit" onPress={saveData} />
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
    padding: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#062542',
  },
  map: {
    flex: 6,
    width: '100%',
    height: '100%',
  },
  form: { flex: 3 },
})
