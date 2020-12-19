import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Picker,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { launchImageLibrary } from 'react-native-image-picker'

import { selectorIcon } from './helpers/icons'
import {
  fetchAllLocalisations,
  saveNewLocalisation,
} from './helpers/data'

import MapLeaflet from 'mapleaflet-react-web-native'
import { LocationWithParams } from './types'

const getAvailableCategories = (markers) => [
  ...new Set(markers.map((marker) => marker.category)),
]

export default function App() {
  const [markers, setMarkers] = useState<LocationWithParams[]>([])
  const [category, setCategory] = useState('camping')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 59.5,
    lng: 18.0,
  })
  const [checked, setChecked] = useState({})

  const fetchData = async () => {
    const mappedData = (await fetchAllLocalisations()).data
    setMarkers(mappedData)
    const checked = getAvailableCategories(mappedData).reduce(
      (checked, category) => {
        checked[category] = true
        return checked
      },
      {},
    )
    setChecked(checked)
  }

  const saveData = async () => {
    await saveNewLocalisation({
      category,
      name,
      position: selectedPosition,
      description,
    })
    fetchData()
  }

  const selectPhotoTapped = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        const uri = response.uri
        const type = response.type
        const name = response.fileName
        const source = {
          uri,
          type,
          name,
        }
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Tently!</Text>
      </View>
      <View>
        {getAvailableCategories(markers).map((category: string) => {
          return (
            <CheckBox
              title={category}
              checked={checked[category]}
              onPress={() =>
                setChecked({
                  ...checked,
                  [category]: !checked[category],
                })
              }
            />
          )
        })}
      </View>
      <View style={styles.map}>
        <MapLeaflet
          markers={markers.filter(
            (marker) => checked[marker.category],
          )}
          zoom={9}
          locationSelector={{
            selectedPosition,
            setSelectedPosition,
            selectorIcon,
          }}
        ></MapLeaflet>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTilte}>
          {' '}
          Add Location at Lat: {selectedPosition.lat.toFixed(
            2,
          )} Lng: {selectedPosition.lng.toFixed(2)}
        </Text>
        <View>
          <TextInput
            style={styles.formElements}
            placeholder="Add location's name"
            defaultValue={name}
            onChangeText={(newName) => setName(newName)}
            placeholderTextColor={'blue'}
          />
          <TextInput
            style={styles.formElements}
            placeholder="Add description"
            defaultValue={description}
            onChangeText={(newDescription) =>
              setDescription(newDescription)
            }
            placeholderTextColor={'blue'}
          />
          <View style={styles.formElements}>
            <Text>select category:</Text>
            <Picker
              selectedValue={category}
              onValueChange={(currentcategory) =>
                setCategory(currentcategory.toString())
              }
            >
              <Picker.Item label="camping" value="camping" />
              <Picker.Item label="kayak" value="kayak" />
              <Picker.Item label="hut" value="hut" />
            </Picker>
          </View>
          <View>
            <Text>ImagePicker to Cloudinary</Text>
            <TouchableOpacity onPress={selectPhotoTapped}>
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
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
