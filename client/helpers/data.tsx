import React from 'react'
import { service } from '../constants'
import { mapIcons } from './icons'
import { LocationOutput, LocationInput, IconSize } from '../types'
import Popup from '../components/Popup'

export const fetchAllLocalisations = async () => {
  try {
    const json = await fetch(service, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `{getAllLocations {
            id, category, name, description, lat, lng, imageUrl
          }}`,
      }),
    }).then((data) => data.json())
    const locations: LocationOutput[] = json.data.getAllLocations
    const size: IconSize = [32, 32]
    const data = locations.map((location) => ({
      ...location,
      size,
      icon: mapIcons(location.category),
      position: { lat: location.lat, lng: location.lng },
      Popup: () => {
        return (
          <Popup
            title={location.name}
            description={location.description}
            imageUrl={location.imageUrl}
          />
        )
      },
    }))
    return {
      data,
    }
  } catch (error) {
    return { error, data: [] }
  }
}

export const saveNewLocalisation = async ({
  category,
  name,
  position,
  description,
  image,
}: LocationInput) => {
  try {
    const mutation = `mutation {
      createLocation(location: {
        category: "${category}"
        name: "${name}"
        lat: "${position.lat}"
        lng: "${position.lng}"
        description: "${description}"
        image: "${image}"
      }) {
        id
      }
    }`
    await fetch(service, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    })
    return { data: null }
  } catch (error) {
    return { error, data: null }
  }
}
