import { service } from '../constants'
import { mapIcons } from '../helpers/icons'
import {
  Location,
  LocationInput,
  LocationWithParams,
  IconSize,
} from '../types'

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
            id, category, name, description, position {
              lat
              lng
            }
          }}`,
      }),
    }).then((data) => data.json())
    const locations: Location[] = json.data.getAllLocations
    const size: IconSize = [32, 32]
    const data = locations.map((location) => ({
      ...location,
      size,
      icon: mapIcons(location.category),
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
}: LocationInput) => {
  try {
    const mutation = `mutation {
      createLocation(location: {
        category: "${category}"
        name: "${name}"
        position: {
          lat: ${position.lat}
          lng: ${position.lng}
        }
        description: "${description}"
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
