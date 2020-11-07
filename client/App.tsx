import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'

import { markerIcon } from './helpers/icons'
import {
  fetchAllLocalisations,
  saveNewLocalisation,
} from './helpers/data'

// import MapLeaflet from 'mapleaflet-react-web-native'
import MapLeaflet from './packages/MapLeaflet/src'

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
        <Text style={styles.formTilte}> Add Location </Text>
        <View>
          <TextInput
            style={styles.formElements}
            placeholder="Add location's name"
            defaultValue={name}
            onChangeText={(newName) => setName(newName)}
            placeholderTextColor={'blue'}
          />
          <Text style={styles.formElements}>
            Position Lat: {selectedPosition.lat.toFixed(2)} Lng:
            {selectedPosition.lng.toFixed(2)}
          </Text>
          <Picker
            style={styles.formElements}
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
        <TouchableOpacity style={styles.formButton}>
          <Button title="Submit" onPress={saveData} />
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#062542',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  form: {
    padding: 10,
    margin: 5,
    backgroundColor: '#c5ddba',
  },
  formElements: {
    paddingVertical: 5,
  },
  formButton: {
    height: 40,
    width: 160,
    borderRadius: 10,
    backgroundColor: '#aad3df',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
  },
  formTilte: { fontSize: 20, fontWeight: 'bold', color: '#062542' },
})
