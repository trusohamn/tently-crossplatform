import { service } from '../constants'
import { mapIcons } from '../helpers/icons'
import { Location, LocationInput, IconSize } from '../types'

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
            id, category, name, description, lat, lng
          }}`,
      }),
    }).then((data) => data.json())
    const locations: Location[] = json.data.getAllLocations
    const size: IconSize = [32, 32]
    const data = locations.map((location) => ({
      ...location,
      size,
      icon: mapIcons(location.category),
      position: { lat: location.lat, lng: location.lng },
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
