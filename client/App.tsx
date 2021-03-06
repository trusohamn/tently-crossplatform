import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Picker,
  Platform,
  Image,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import MapLeaflet from 'mapleaflet-react-web-native'

import {
  fetchAllLocalisations,
  saveNewLocalisation,
} from './helpers/data'
import { selectorIcon, mapIcons } from './helpers/icons'
import { LocationWithParams, CheckedCategories } from './types'

const getAvailableCategories = (markers: LocationWithParams[]) => [
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
  const [
    checkedCategories,
    setCheckedCategories,
  ] = useState<CheckedCategories>({})
  const [image, setImage] = useState<string | undefined>()

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const fetchData = async () => {
    const mappedData = (await fetchAllLocalisations()).data
    setMarkers(mappedData)
    const checkedCategories = getAvailableCategories(
      mappedData,
    ).reduce<CheckedCategories>((checked, category) => {
      checked[category] = true
      return checked
    }, {})
    setCheckedCategories(checkedCategories)
  }

  const saveData = async () => {
    await saveNewLocalisation({
      category,
      name,
      position: selectedPosition,
      description,
      image,
    })
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const response = await ImagePicker.getCameraPermissionsAsync()
        if (response.status !== 'granted') {
          alert(
            'Sorry, we need camera roll permissions to make this work!',
          )
        }
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Tently!</Text>
      </View>
      <View>
        {getAvailableCategories(markers).map((category: string) => {
          return (
            <View style={styles.legendEntry}>
              <CheckBox
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                title={category}
                checked={checkedCategories[category]}
                onPress={() =>
                  setCheckedCategories({
                    ...checkedCategories,
                    [category]: !checkedCategories[category],
                  })
                }
              />
              <Image
                style={styles.imageLegend}
                source={mapIcons(category)}
              />
            </View>
          )
        })}
      </View>
      <View style={styles.map}>
        <MapLeaflet
          markers={markers.filter(
            (marker) => checkedCategories[marker.category],
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
            <TouchableOpacity onPress={pickImage}>
              <Text>Upload photo</Text>
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
  legendEntry: { flex: 1, flexDirection: 'row' },
  imageLegend: {
    width: 30,
    height: 30,
  },
})
