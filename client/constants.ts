import { Platform } from 'react-native'

export const service =
  Platform.OS === 'web'
    ? 'http://localhost:4000/graphql'
    : 'http://10.0.2.2:4000/graphql'
