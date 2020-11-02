export const iconMapping: { [key: string]: String } = {
  camping: require('../assets/icons/012-camp.png'),
  kayak: require('../assets/icons/033-kayak.png'),
  hut: require('../assets/icons/032-hut.png'),
  default: require('../assets/icons/012-camp.png'),
}

export const mapIcons = (category: string) => {
  return iconMapping[category] || iconMapping.default
}

export { default as markerIcon } from '../assets/icons/marker.png'
