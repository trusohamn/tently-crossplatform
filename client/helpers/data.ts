import { service } from '../constants'
import { mapIcons } from '../helpers/icons'

export const fetchAllLocalisations = async () => {
  const data = await fetch(service, {
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
  return data.data.getAllLocations.map(
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
}

export const saveNewLocalisation = async ({
  category,
  name,
  selectedPosition,
}: {
  category: string
  name: string
  selectedPosition: { lat: number; lng: number }
}) => {
  const mutation = `mutation {
      createLocation(location: {
        category: "${category}"
        name: "${name}"
        position: {
          lat: ${selectedPosition.lat}
          lng: ${selectedPosition.lng}
        }
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
}
